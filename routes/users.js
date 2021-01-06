const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

router.get('/',(req,res)=> {
    res.send("Users");
});

router.post('/', async (req,res)=> {

    try {
        const hashed_password = await bcrypt.hash(req.body.password,10);
        const user = new User({
            username: req.body.username,
            password: hashed_password,
            name: req.body.name,
            phone_number: req.body.phone_number
        })

        user.save()
        .then(data =>{
            res.json(data);
        })
        .catch(err => {
            res.json({message: err});
        });

    } catch (error) {
        res.status(500).send();
    }

    
});

router.post('/login', async(req,res) => {
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send('User not found');

    const valid_password = await bcrypt.compare(req.body.password, user.password);
    if(!valid_password) return res.status(400).send('Invalid Password');
    
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
   
});

module.exports = router;
