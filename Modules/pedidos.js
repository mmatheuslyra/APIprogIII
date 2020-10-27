const mongoose = require('mongoose');

const pedidosSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quantidade: Number,
    produto: String
});

module.exports = mongoose.model('Pedidos', pedidosSchema);