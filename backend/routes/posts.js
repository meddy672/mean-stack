const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/posts');
const bodyParser = require('body-parser');
const router = express.Router();



router.post('', (req, res, next) => {

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

router.get('', (req, res, next) => {

  Post.find().then(document => {

    res.status(200).json({
      message: 'Post feteched successfully',
      posts: document
    });
  });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post Not Found'
      });
    }
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({
    _id: req.params.id
  }, post).then(result => {
    console.log(result);
  });
  res.status(200).json({
    message: 'Post updated successfully'
  });
});

router.delete('/:id', (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({
    _id: req.params.id
  }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted",
      postId: result._id
    });
  });

});

module.exports = router;
