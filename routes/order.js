const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

//Get a company orders
router.get('/company/:company_id',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Get a user orders
router.get('/user/:user_id',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Make an order
router.post('/',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Update an order
router.put('/',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Delete an order
router.delete('/:order_id',verify ,(req,res) => {
    res.send('Only logged users can do this');
});


module.exports = router;