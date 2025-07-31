import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const db = new pg.Client({
  user: process.env.MY_USERNAME,
  host: process.env.HOSTNAME,
  port: process.env.PORT_NUMBER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {

    const email = req.body.username;
    const password = req.body.password;
    try {

      const checkResult = await db.query("SELECT email FROM users WHERE email = $1", [email]);

      if( checkResult.length === 0 ){

        await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
        res.render("secrets.ejs");
      } else
          res.send("Email id already exists, try logging in.");
    } catch (err) {
      console.log(err);
    }
});

app.post("/login", async (req, res) => {

    const email = req.body.username;
    const password = req.body.password;
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      if( result.rows.length !== 0 ){
        if( result.rows[0].password == password )
          res.render("secrets.ejs");
        else
          res.send("Wrong password, please try again.");
      } else
        res.send("New email entered, please register to pass.");
    } catch (err) {
      console.log(err);
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
