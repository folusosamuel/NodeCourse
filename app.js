const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const ejs = require('ejs');
const config = require('./config.js');
const Blog = require('./models/blog');

//express app
const app = express();

//connnect to mongodb
//connnect to mongodb
const dbURI =
  'mongodb+srv://folusosamuel:analYsis@cluster0.xisnb.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs'); //automatically express and ejs will look for views folder for ejs files

//middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));

//mongoose and mongo  sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'New Blog 2',
    snippet: 'About my new blog',
    body: 'more about my new blog',
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('627102e7bc56ab1f36d09f70')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  //res.send(`<p>Home Page</p>`);
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'Mario finds stars',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'How to defeat bowser',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
  ];
  //res.render('index', { title: 'Home' });
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  //res.send(`<p>About Page</p>`);
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

//404 error!
app.use((req, res) => {
  res.status(404).render('404');
});

//listen for requests
app.listen(3000, () => {
  console.log('listening on port 3000');
});
