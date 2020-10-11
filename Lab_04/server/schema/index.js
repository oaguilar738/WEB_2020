const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    Item: { type: String, required: true },
    ID: { type: String, required: true },
    Power: { type: String, required: true },
    Rarenes: { type: String, required: true }
});

module.exports = {
    CardModel: mongoose.model(
        'Card', CardSchema, 'Cards')
}