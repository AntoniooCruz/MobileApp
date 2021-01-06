const express = require('express');
const router = express.Router();


router.use('/user', require('./users'));
router.use('/order', require('./order'));


router.get('/', (req,res)=>{
    res.send("home");
    });




module.exports = router;

