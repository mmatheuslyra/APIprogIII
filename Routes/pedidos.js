const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const mysql = require('mysql');

//Definindo a conexão com o MySQL
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : 'Cde34rfc',
    database : 'nodemysql'
});
const Pedidos = require('../Modules/pedidos');

router.get('/', (req, res, next)=>{
    Pedidos.find().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(404).json(err);
    })
});

router.post('/', (req, res, next)=>{
    const pedido = new Pedidos({
        _id: new mongoose.Types.ObjectId(),
        fornecedor: req.body.fornecedor,
        dataEntrega: req.body.dataEntrega,
        quantidade: req.body.quantidade,
        produto: req.body.produto
    });

    // console.log(Fornecedor, DataEntrega, Quantidade, Produto);

    pedido.save().then(result=>{ // Salvando os pedidos no mongoose como antes
        let sql = 'INSERT INTO `historico_venda` VALUES (null,?,?,?)';
        let fornecedor = req.body.fornecedor;
        let dataEntrega = req.body.dataEntrega;
        let quantidade = req.body.quantidade;
        db.query(sql, [fornecedor, dataEntrega, quantidade], (err, result)=>{ // salvando o histórico de pedidos dentro do MySQL
            console.log(sql);
            if(err) throw (err);
            res.status(200).json(result);
        });
    }).catch(err=>{
        res.status(404).json(err);      
    })
});

router.get('/:pedidoID', (req, res, next)=>{
    Pedidos.findById(req.params.pedidoID).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(404).json(err);
    });
});

router.delete('/:pedidoID', (req, res, next)=>{
    Pedidos.remove({_id: req.params.pedidoID}).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(404).json(err);
    })
});

module.exports = router;