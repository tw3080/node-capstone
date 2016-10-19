var express = require('express');
const pokemon = require('pokemontcgsdk');
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.static('build'));

app.get('/cards', function(req, res) {
    pokemon.card.all({ supertype: 'pokemon', name: 'charizard' })
    .on('data', function (card) {
        console.log('-----------');
        console.log('');
        console.log('-----------');
        console.log(card);
        res.json(card);
    });
});

app.listen(process.env.PORT || 8080);

exports.app = app;
