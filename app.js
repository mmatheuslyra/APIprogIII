var cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoute = require('./Routes/products');
const pedidosRoute = require('./Routes/pedidos');
const fornecedoresRoute = require('./Routes/fornecedores');

//conexão com o banco mongoDB
mongoose.connect('mongodb://localhost:27017/restapi').then(() => console.log('MongoDB Connected!')).catch(err =>{
    console.log(err);
});

app.use(morgan('dev')); // Log de operações que chegam no servidor
app.use(bodyParser.urlencoded({extended: false}));  //  Recebe requisições no body, o falso significa simple bodies
app.use(bodyParser.json());  // Indica que podemos recer o body na requisição
app.use(cors()); // Evitar erros de requisições locais

app.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Endereço não valido'
    });
});

app.post('/', (req, res, next)=>{
    res.status(200).json({
        message: 'Endereço não valido'
    });
});

app.use('/products', productRoute);
app.use('/pedidos/', pedidosRoute);
app.use('/fornecedores/', fornecedoresRoute);

module.exports = app;