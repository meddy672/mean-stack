/* Creating an exoress application */
const express = require('express');
const app = express();

// express middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/api/post', (req, res, next) => {

  const posts = [{
      id: '44hj24j1',
      title: 'This is a post title.',
      content: 'This is some content for the post.'
    },
    {
      id: '93403943',
      title: 'This is a second post.',
      content: 'This is some content for the second post.'
    }
  ];
  res.status(200).json({
    message: 'Post feteched successfully',
    posts: posts
  });
});

// export the express app and all of its middleware
module.exports = app;
