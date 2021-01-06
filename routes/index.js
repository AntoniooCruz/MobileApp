const express = require('express');
const router = express.Router();


router.use('/api/user', require('./users'));
router.use('/api/order', require('./order'));
router.use('/api/products', require('./products'));


router.get('/', (req,res)=>{
    res.send("home");
    });




module.exports = router;

