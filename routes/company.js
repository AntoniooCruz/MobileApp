const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Company = require('../models/Company');

const verify = require('./verifyToken');

router.get('/:company_id', async (req,res)=> {
    const company =  await Company.findOne({_id: req.params.company_id});
    res.send(company);
});

//Create a company
router.post('/', async (req,res)=> {
    try {
        const hashed_password = await bcrypt.hash(req.body.password,10);
        const company = new Company({
            username: req.body.username,
            password: hashed_password,
            name: req.body.name,
            phone_number: req.body.phone_number,
            img: null
        })

        company.save()
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

//Update a company
router.put('/:company_id',(req,res) => {
    Company.findByIdAndUpdate({_id: req.params.company_id},req.body).then(function(){
        Company.findOne({_id: req.params.company_id}).then(function(company){
            res.send(company);
        });
    });
});

//Delete a company
router.delete('/:company_id',(req,res) => {
    Company.findByIdAndRemove({_id: req.params.company_id},req.body).then(function(company){
            res.send(company);
        });
    });

router.post('/login', async(req,res) => {
    const company = await Company.findOne({username: req.body.username});
    if(!company) return res.status(400).send('User not found');

    const valid_password = await bcrypt.compare(req.body.password, company.password);
    if(!valid_password) return res.status(400).send('Invalid Password');
    
    const token = jwt.sign({_id: company._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
   
});

module.exports = router;
