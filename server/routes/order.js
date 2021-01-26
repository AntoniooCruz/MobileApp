const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');
const Company = require('../models/Company');
const Order = require('../models/Order');
const { orderSchema } = require('../schemas/order');

//Get a company orders
router.get('/company/:company_id' , async(req,res) => {
    const orders =  await Order.find({company_id: req.params.company_id});
    res.send(orders);
});

//Get a user orders
router.get('/user/:user_id', async (req,res) => {
    const orders =  await Order.find({client_id: req.params.user_id});
    res.send(orders);
});

//Get a certain Order
router.get('/:order_id', async(req,res)=> {
    const order =  await Order.findOne({_id: req.params.order_id});
    res.send(order);
});


//Make an order
router.post('/' ,(req,res) => {
    const result = orderSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    return;
    }
    const order = new Order({
        company_id: req.body.company_id,
        client_id: req.body.client_id,
        product_id: req.body.product_id,
        location: req.body.location,
        message: req.body.message,
        is_fulfilled: req.body.is_fulfilled
    })

    order.save()
    .then(data =>{
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    });

});

//Update an order
router.put('/:order_id',verify,(req,res) => {
    const result = orderSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    return;
    }
    Order.findOne({_id: req.params.order_id}, function (err, user) {
        if(err) {
            res.status(500).send(err.message);
        } else if(!user){
            res.status(404).send("Order not found");
        }
    });

    Order.findByIdAndUpdate({_id: req.params.order_id},req.body).then(function(){
        Order.findOne({_id: req.params.order_id}).then(function(order){
            res.send(order);
        });
    });
});

//Delete an order
router.delete('/:order_id' ,verify,(req,res) => {
    Order.findByIdAndRemove({_id: req.params.order_id},req.body).then(function(order){
        res.send(order);
    });
});


module.exports = router;