const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

//MiddleWare
const indexRouter = require('./routes/index');

app.use(bodyParser.json());

app.use('/',indexRouter);
    
//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true } ,
    () => console.log("Connected to DB")
    );
//Listening server
app.listen(3000);
