const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    name: String,
    Author: String

});

module.exports = mongoose.model('Book-model',bookSchema)