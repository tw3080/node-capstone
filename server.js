var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jsonParser = bodyParser.json();
var session = require('express-session');
var passport = require('passport') , LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var config = require('./config.js');
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'pax' }));
app.use(passport.initialize());
app.use(passport.session());

// Models
var User = require('./models/user');
var Collection = require('./models/collection');

function isLoggedIn(req, res, next) {
    // For production
    if (req.isAuthenticated()) {
        return next();
    }
    // For testing, inject a user manually
    if (process.env.NODE_ENV !== 'production' ) {
        req.user = { '_id': '1', 'username': 'test', 'password': 'test' };
        return next();
    }
    res.sendStatus(403);
}

// Passport authentication
passport.use('local', new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
          return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
        }
        passvalidatePassword(password, user.password, function(error, isValid){
            if(error || !isValid) {
                return done(null, false, { message: 'Incorrect password' });
            } else {
                return done(null, user);
            }
        });
    });
  }
));

function passvalidatePassword(password, userpassword, callback) {
    bcrypt.compare(password, userpassword, function(err, isValid) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
}
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Creating new users
app.post('/users', jsonParser, function(req, res) {
    if (!req.body) {
        return res.status(400).json({
            message: 'No request body'
        });
    }
    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }
    var username = req.body.username;
    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }
    username = username.trim();
    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }
    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }
    var password = req.body.password;
    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }
    // Hashing passwords
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error 1'
            });
        }
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error 2'
                });
            }
            var user = new User({
                username: username,
                password: hash
            });
            user.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error 3'
                    });
                }
                return res.status(201).json(user);
            });
        });
    });
});

// Logging in
app.post('/login', passport.authenticate('local'), function(req, res) {
    return res.status(200).json(req.user);
});

// Logging out
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// Gets the user's collection based on user id
app.get('/collection', isLoggedIn, function(req, res) {
    var query = { userId: req.user._id };
    Collection.findOne(query, function(err, data) {
        res.status(200).json(data);
    });
});

// Adds a card (and information about that card) to the user's collection
app.post('/collection', isLoggedIn, function(req, res) {
    var card = req.body.card;
    var query = { userId: req.user._id, username: req.user.username };
    card = { id: card.id, name: card.name, imageUrl: card.imageUrl };
    var update = { $push: { cardList: { card: card, id: card.id } }, $inc: { collectionSize: 1 } };
    Collection.findOneAndUpdate(query, update, { upsert: true, new: true }, function(err, data) {
        res.status(201).json(data);
    });
});

// Deletes a specific card from the collection by its ID
app.delete('/collection/:id', isLoggedIn, function(req, res) {
    var query = { userId: req.user._id, username: req.user.username };
    var update = { $pull: { cardList: { _id: req.params.id } }, $inc: { collectionSize: -1 } };
    Collection.findOneAndUpdate(query, update, function(err, data) {
        res.status(200).json(data);
    });
});

// Connect to the mongoose database and run the HTTP server
var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

// Makes this file an executable script as well as a module
if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
}

exports.app = app;
exports.runServer = runServer;
