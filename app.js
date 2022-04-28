const express = require("express");

//express app
const app = express();

app.get("/", (req, res) => {
  //res.send(`<p>Home Page</p>`);
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  //res.send(`<p>About Page</p>`);
  res.sendFile("./views/about.html", { root: __dirname });
});

//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 error!
app.use((req, res) => {
  res.status(404).sendFile("./views/404.html", { root: __dirname });
});

//listen for requests
app.listen(3000, () => {
  console.log("listening on port 3000");
});
