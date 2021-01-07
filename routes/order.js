const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Company = require('../models/Company');
const Order = require('../models/Order');

//Get a company orders
router.get('/company/:company_id',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Get a user orders
router.get('/user/:user_id',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Get a certain Order
router.get('/:order_id', async(req,res)=> {
    const order =  await Order.findOne({_id: req.params.order_id});
    res.send(order);
});


//Make an order
router.post('/',verify ,(req,res) => {
    res.send('Only logged users can do this');
});

//Update an order
router.put('/:order_id',(req,res) => {
    Order.findByIdAndUpdate({_id: req.params.order_id},req.body).then(function(){
        Order.findOne({_id: req.params.order_id}).then(function(company){
            res.send(order);
        });
    });
});

//Delete an order
router.delete('/:order_id',verify ,(req,res) => {
    res.send('Only logged users can do this');
});


module.exports = router;