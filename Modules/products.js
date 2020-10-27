const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: String,
    preco: Number
});

module.exports = mongoose.model('Product', productSchema);