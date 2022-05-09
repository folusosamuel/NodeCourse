const Blog = require('../models/blog');
//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
  Blog.find() //get all post
    .sort({ createdAt: -1 }) //made the post arranged by last post
    .then((result) =>
      res.render('index', { title: 'All Blogs', blogs: result })
    )
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
};

const blog_create_post = (req, res) => {
  console.log(req.body);
  const blog = new Blog(req.body);
  blog
    .save()
    .then(() => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
