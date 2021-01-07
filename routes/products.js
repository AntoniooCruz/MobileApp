const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');
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
router.post('/' ,(req,res) => {
    const product = new Product({
        company_id: req.body.company_id,
        name: req.body.name,
        price: req.body.price,
        is_available: req.body.is_available
    })

    product.save()
    .then(data =>{
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    });
});

//Update a product
router.put('/:product_id' ,(req,res) => {
    Product.findByIdAndUpdate({_id: req.params.product_id},req.body).then(function(){
        Product.findOne({_id: req.params.product_id}).then(function(product){
            res.send(product);
        });
    });
});

//Delete a Product
router.delete('/:product_id' ,(req,res) => {
    Product.findByIdAndRemove({_id: req.params.product_id},req.body).then(function(product){
        res.send(product);
    });
});

module.exports = router;