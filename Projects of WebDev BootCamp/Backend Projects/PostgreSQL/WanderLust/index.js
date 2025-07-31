import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
let db = new pg.Client({
  user: process.env.MY_USERNAME,
  host: process.env.HOSTNAME,
  port: process.env.PORT_NUMBER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD
});
db.connect();

async function checkVisited(){
  let countries = [];
  const result = await db.query("SELECT country_code FROM visited_countries");
  countries = result.rows;
  const country_codes = [];
  countries.forEach((country) => country_codes.push(country.country_code));
  return country_codes;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const country_codes = await checkVisited();
  res.render("index.ejs", {total: country_codes.length, countries: country_codes});
});

app.post("/add", async (req, res) => {
  try {

    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) $1;", [req.body.country.toLowerCase()]);
    const data = result.rows[0];
    const cc = data.country_code;
    try{

      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)",[cc]);
      res.redirect("/");
    } catch(error) {
      const country_codes = await checkVisited();
      res.render("index.ejs", {
        total: country_codes.length,
        countries: country_codes,
        error: "Country has already been added, try again."
      });
    }
  } catch (error) {
    const country_codes = await checkVisited();
    res.render("index.ejs", {
      total: country_codes.length,
      countries: country_codes,
      error: "No country matched, try again."
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
