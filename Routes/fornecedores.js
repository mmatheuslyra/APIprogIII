const express = require('express');// Biblioteca para tratamento de requisições
const router = express.Router(); // Tratando a rota para este arquivo
const mysql = require('mysql');

//Definindo a conexão com o MySQL
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : 'Cde34rfc',
    database : 'nodemysql'
});

//Estabelecendo a conexão
db.connect((err)=>{
    if(err) throw (err);
    console.log('MySQL Connected!')
});

// fornecedores
router.get('/', (req, res, next)=>{
    let sql = 'SELECT * FROM fornecedor';
    db.query(sql,(err, result)=>{
        if(err) throw (err);
        res.status(200).json(result);
    });
});

// Inserir Fornecedor
router.post('/', (req, res, next)=>{
    let sql = 'INSERT INTO `fornecedor` VALUES (null,?,?)';
    db.query(sql, [req.body.nome, req.body.telefone], (err, result)=>{
        if(err) throw err;
        res.status(200).json(result);
    });
});


//Histórico de vendas
router.get('/history', (req, res, next)=>{
    let sql = 'SELECT * FROM historico_venda';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        res.status(200).json({message: result});
    });
})

// Fornecedor específico
router.get('/:companyID', (req, res, next)=>{
    let sql = 'SELECT * FROM fornecedor WHERE cod = ?';
    let companyID = req.params.companyID;
    db.query(sql, companyID, (err, result)=>{
        if(err) throw err;
        res.status(200).json(result);
    });
});

// Atualizar Fornecedor específico
router.patch('/:companyID', (req, res, next)=>{ 
    let sql = 'UPDATE fornecedor SET nome = ?, telefone = ? WHERE cod = ?';
    db.query(sql, [req.body.nome, req.body.telefone, req.params.companyID], (err, result)=>{
        if(err) throw err;
        res.status(200).json(result);
    });
});

// Excluir Fornecedor específico
router.delete('/:companyID', (req, res, next)=>{  
    let sql = 'DELETE FROM fornecedor WHERE cod = ?';
    let companyID = req.params.companyID;
    db.query(sql, companyID, (err, result)=>{
        if(err) throw err;
        res.status(200).json(result);
    });
});

// Histórico de vendas específico
router.get('/history/:companyID', (req, res, next)=>{
    let sql = 'SELECT fornecedor.nome, historico.dataEntrega FROM fornecedor, historico_venda AS historico WHERE fornecedor.cod = historico.cod AND fornecedor.cod = ?';
    let companyID = req.params.companyID;
    db.query(sql, companyID, (err, result)=>{
        if(err) throw err;
        res.status(200).json(result);
    });
});



module.exports = router;