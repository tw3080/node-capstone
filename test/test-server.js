global.DATABASE_URL = 'mongodb://localhost/node-capstone-test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var User = require('../models/user.js');
var Collection = require('../models/collection.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Poke Mongo', function() {
    before(function(done) {
        server.runServer(function() {
            done();
        });
    });

    after(function(done) {
        Collection.remove(function() {
            User.remove(function() {
                done();
            });
        });
    });

    it('should add a card to the collection on ADD', function(done) {
        chai.request(app)
            .post('/collection')
            .send({ 'card': { 'id': 'xy7-1', 'name': 'Oddish', 'imageUrl': 'https://s3.amazonaws.com/pokemontcg/xy7/1.png' } })
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('userId');
                res.body.should.have.property('username');
                res.body.should.have.property('cardList');
                res.body.cardList[0].card.id.should.be.a('string');
                res.body.cardList[0].card.name.should.be.a('string');
                res.body.cardList[0].card.imageUrl.should.be.a('string');
                res.body.cardList[0].card.id.should.equal('xy7-1');
                res.body.cardList[0].card.name.should.equal('Oddish');
                res.body.cardList[0].card.imageUrl.should.equal('https://s3.amazonaws.com/pokemontcg/xy7/1.png');
                done();
            });
    });

    it('should list cards in the collection on GET', function(done) {
        chai.request(app)
            .get('/collection')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('userId');
                res.body.should.have.property('username');
                res.body.should.have.property('cardList');
                res.body.cardList[0].card.id.should.be.a('string');
                res.body.cardList[0].card.name.should.be.a('string');
                res.body.cardList[0].card.imageUrl.should.be.a('string');
                res.body.cardList[0].card.id.should.equal('xy7-1');
                res.body.cardList[0].card.name.should.equal('Oddish');
                res.body.cardList[0].card.imageUrl.should.equal('https://s3.amazonaws.com/pokemontcg/xy7/1.png');
                done();
            });
    });

    it('should remove a card from the collection on DELETE', function(done) {
        chai.request(app)
            .get('/collection')
            .end(function(err, res) {
                should.equal(err, null);
                chai.request(app)
                    .delete('/collection/' + res.body.cardList[0]._id)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        chai.request(app)
                            .get('/collection')
                            .end(function(err, res) {
                                res.body.cardList.should.be.empty;
                                done();
                            });
                    });
            });
    });

    it('should create a user on POST', function(done) {
        chai.request(app)
            .post('/users')
            .send({ 'username': 'test', 'password': 'test' })
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('username');
                res.body.should.have.property('password');
                res.body._id.should.be.a('string');
                res.body.username.should.be.a('string');
                res.body.username.should.equal('test');
                done();
            });
    });

    it('should log the user in on POST', function(done) {
        chai.request(app)
            .post('/login')
            .send({ 'username': 'test', 'password': 'test' })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.an('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('username');
                res.body.should.have.property('password');
                res.body._id.should.be.a('string');
                res.body.username.should.be.a('string');
                res.body.username.should.equal('test');
                done();
            });
    });
});
