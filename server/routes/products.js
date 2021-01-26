const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const verify = require('../middleware/verifyToken');
const Product = require('../models/Product');
const { productSchema } = require('../schemas/products');

//Get a company products
router.get('/company/:company_id',(req,res) => {
    console.log(req.params.company_id);
    Product.find({company_id: req.params.company_id}, function(err, products) 
    {
       if (err)
       {
           res.status(400).send(err);
       }
       res.json(products);
    });
});

//Get a certain product
router.get('/:product_id', async(req,res)=> {
    const product =  await Product.findOne({_id: req.params.product_id}, function(err, product) 
    {
       if (err)
       {
           res.status(400).send(err);
       }
       res.send(product);
    });
    
});

//Add a product
router.post('/' ,(req,res) => {
    const result = productSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    return;
    }
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

    const result = productSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    return;
    }
    Product.findOne({_id: req.params.product_id}, function (err, user) {
        if(err) {
            res.status(500).send(err.message);
        } else if(!user){
            res.status(404).send("Product not found");
        }
    });

    Product.findByIdAndUpdate({_id: req.params.product_id},req.body).then(function(){
        Product.findOne({_id: req.params.product_id}).then(function(product){
            res.send(product);
        });
    });
});

//Delete a Product
router.delete('/:product_id' ,verify,(req,res) => {
    Product.findByIdAndRemove({_id: req.params.product_id},req.body).then(function(product){
        res.send(product);
    });
});

module.exports = router;