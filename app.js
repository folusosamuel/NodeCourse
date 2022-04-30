const express = require('express');
const ejs = require('ejs');
const ejsLint = require('ejs-lint');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs'); //automatically express and ejs will look for views folder for ejs files

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
