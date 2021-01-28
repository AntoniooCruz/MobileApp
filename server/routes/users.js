const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Company = require('../models/Company');
const Joi = require('joi');
const verify = require('../middleware/verifyToken');
const { userSchema } = require('../schemas/users');
const verifyToken = require('../middleware/verifyToken');
const fs = require('fs');



router.get('/:user_id', async(req,res)=> {
    const user =  await User.findOne({_id: req.params.user_id});
    res.send(user);
});

router.post('/', async (req,res)=> {
    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    return;
    }
    const userFind = await User.findOne({username: req.body.username});
    const companyFind = await Company.findOne({username: req.body.username});
    if(userFind || companyFind){
        res.status(401).send("Username already exists");
        return;
    }  
    try {
        const hashed_password = await bcrypt.hash(req.body.password,10);
        

        const user = new User({
            username: req.body.username,
            password: hashed_password,
            name: req.body.name,
            phone_number: req.body.phone_number,
            is_admin: false
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

//Update a user
router.put('/:user_id',(req,res) => {

    const result = userSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    return;
    }

    User.findOne({_id: req.params.user_id}, function (err, user) {
        if(err) {
            res.status(500).send(err.message);
        } else if(!user){
            res.status(404).send("User not found");
        }
    });

    User.findByIdAndUpdate({_id: req.params.user_id},req.body).then(function(){
        User.findOne({_id: req.params.user_id}).then(function(user){
            res.send(user);
        });
    });


});

//Delete a user
router.delete('/:user_id',verifyToken,(req,res) => {
    User.findByIdAndRemove({_id: req.params.user_id},req.body).then(function(user){
            res.send(user);
        });
    });


router.post('/login', async(req,res) => {
    const user = await User.findOne({username: req.body.username});
    const company = await Company.findOne({username: req.body.username});

    if(!user && !company) return res.status(400).send('User not found');
    if(user){
        const valid_password = await bcrypt.compare(req.body.password, user.password);
        if(!valid_password) return res.status(401).send('Invalid Password');
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        let acess_level  = (user.is_admin) ? (3) : (1); 
        let acessToken  = (user.is_admin) ? (token) : (null); 
        res.header('auth-token', token).json({
        id: user._id,
        username: user.username,
        token: acessToken,
        access_level: acess_level
    });
    }
    if(company){
        const valid_password = await bcrypt.compare(req.body.password, company.password);
        if(!valid_password) return res.status(401).send('Invalid Password');
        const token = jwt.sign({_id: company._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json({
        id: company._id,
        username: company.username,
        token: token,
        access_level: 2
    });
    }
    
   
});

module.exports = router;
