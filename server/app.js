const express = require('express');
const PORT = process.env.PORT || 4000;
const app = express();
const cors = require('cors');;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

//MiddleWare
const indexRouter = require('./routes/index');
app.use(cors());
app.use(bodyParser.json());

app.use('/',indexRouter);
    
//Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false } ,
    () => console.log("Connected to DB")
    );
//Listening server
app.listen(PORT);
