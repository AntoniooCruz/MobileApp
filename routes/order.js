const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

router.get('/',verify ,(req,res) => {
    res.send('Only logged users can do this');
});


module.exports = router;