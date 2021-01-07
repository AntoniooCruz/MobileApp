const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Product = require('../models/Product');

//Get a company products
router.get('/company/:company_id',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Get a certain product
router.get('/:product_id', async(req,res)=> {
    const product =  await Product.findOne({_id: req.params.product_id});
    res.send(product);
});

//Add a product
router.post('/',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Update a product
router.put('/',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Delete a Product
router.delete('/:product_id',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

module.exports = router;