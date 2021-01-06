const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

//Get a company products
router.get('/company/:company_id',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Add a product
router.post('/',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Update a product
router.put('/',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Delete an Product
router.delete('/:product_id',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

module.exports = router;