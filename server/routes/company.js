const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Company = require('../models/Company');
const User = require('../models/User');
const { companySchema } = require('../schemas/company');
const verify = require('../middleware/verifyToken');
const multer  = require('multer');
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`});

router.get('/:company_id', async (req,res)=> {
    const company =  await Company.findOne({_id: req.params.company_id});
    res.send(company);
});

router.get('/all/companies', async (req,res)=> {
    Company.find({}, function(err, docs) {
        if (!err) { 
            res.send(docs);
        }
        else {
            res.status(400).send(err);
        }
    });
    
});

//Create a company
router.post('/', async (req,res)=> {
    const result = companySchema.validate(req.body);
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

    /*if(!req.file)
    {
        res.json({errorMessage:`No file was selected to be uploaded`})
    }
    else if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg")
    {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (error) => {res.json({errorMessage:`Only .png, .jpg and .jpeg format accepted`})})                
    }
    else // uploaded file is valid
    { */
        try {
            const hashed_password = await bcrypt.hash(req.body.password,10);
            

            const company = new Company({
                username: req.body.username,
                password: hashed_password,
                name: req.body.name,
                phone_number: req.body.phone_number,
                img: req.file.filename
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
  // }

    
});

//Update a company
router.put('/:company_id',verify,(req,res) => {
    const result = companySchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
    return;
    }
    Company.findOne({_id: req.params.company_id}, function (err, user) {
        if(err) {
            res.status(500).send(err.message);
        } else if(!user){
            res.status(404).send("Company not found");
        }
    });

    

    Company.findByIdAndUpdate({_id: req.params.company_id},req.body).then(function(){
        Company.findOne({_id: req.params.company_id}).then(function(company){
            res.send(company);
        });
    });
});

//Delete a company
router.delete('/:company_id',verify,(req,res) => {
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
