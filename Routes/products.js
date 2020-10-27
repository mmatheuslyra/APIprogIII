const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../Modules/products');

router.post('/', (req, res, next)=>{
    console.log(req.body);

    const produto = new Product({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        preco: req.body.preco
    });

    console.log(produto);
    produto.save().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(404).json(err);
    })
});

router.get('/', (req, res, next)=>{
    Product.find().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(404).json(err);
    });
});

router.get('/:productID', (req, res, next)=>{
    Product.findById(req.params.productID).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(404).json(err);
    })
});

router.patch('/:productID', (req, res, next)=>{
    Product.update({_id: req.params.productID}, {$set:{nome: req.body.nome, preco: req.body.preco}}).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(404).json(err);
    })
});

router.delete('/:productID', (req, res, next)=>{
    Product.remove({_id: req.params.productID}).then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(404).json(err);
    })
})


module.exports = router;