const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.get('/',(req,res)=> {
    res.send("Users");
});

router.post('/',(req,res)=> {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    })

    user.save()
        .then(data =>{
            res.json(data);
        })
        .catch(err => {
            res.json({message: err});
        });

});

module.exports = router;
