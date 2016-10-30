var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collectionSchema = new Schema({
    userId: String,
    username: String,
    collectionSize: Number,
    cardList: [{
        card: { unique: true, type: Object }
    }]
});

var cardCollection = mongoose.model('Collection', collectionSchema);
module.exports = cardCollection;
