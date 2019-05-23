/* Creating an exoress application */
const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts.js');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb+srv://meddy672:CastleBlack46!@cluster0-nr6ed.mongodb.net/test?retryWrites=true')
  .then(() => {

    console.log('Connected to database');
  }).catch(() => {

    console.log('Error connection down');
  });

// express middleware

app.use(bodyParser.json());

// Because front-end runs on a different server we add
// headers to accept request from different servers
// then call the next() function to proceed to the next middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.use('/api/posts', postRoutes);



// export the express app and all of its middleware
module.exports = app;
