import express from "express";

var app = express();
var port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Welcome to my home page</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>I am studying, please don't contact me right now!</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>I am all about it!</h1>");
});

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});