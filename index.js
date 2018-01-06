//Importing node module
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.promise = global.promise;
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const config = require('./config/database');// node module for configration of databse

//connection for mongodb
mongoose.connect(config.uri, (err)=>{
    if(err){
        console.log('Connection Error..!'+err);
    }
    else{
        console.log('Successfully connect with mongodb...'+config.db);
    }
});

//init app
const app = express();

//middleware
app.use(cors({ origin: 'http://localhost:4200'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+ '/client/dist'));
// app.use('/authentication', require('./routes/authentication'));
// app.use('/blogs', require('./routes/blogs'));

//routes
app.get('/', (req, res)=>{
    res.send('this is testing route.....');
});

//Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
  });
  
// Start Server: Listen on port 8080
app.listen(8080, () => {
    console.log('Listening on port 8080');
  });