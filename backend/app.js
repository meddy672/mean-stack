/* Creating an exoress application */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Post = require('./models/posts');
const mongoose = require('mongoose');

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
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts', (req, res, next) => {

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/post', (req, res, next) => {

  Post.find().then(document => {

    res.status(200).json({
      message: 'Post feteched successfully',
      posts: document
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({
    _id: req.params.id
  }).post.save().then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted",
      postId: result._id
    });
  });

});

// export the express app and all of its middleware
module.exports = app;
