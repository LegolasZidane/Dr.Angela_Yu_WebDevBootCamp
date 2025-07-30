import express from "express";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//Before running locally, please generate this from the above api url given. Visit the url for more info.
//The code will not run otherwise.
const yourUsername = process.env.MY_USERNAME;
const yourPassword = process.env.MY_PASSWORD;
const yourAPIKey = process.env.API_KEY;
const yourBearerToken = process.env.BEARER_TOKEN;

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {

  const request = await axios.get(API_URL+"random");
  const data = JSON.stringify(request.data);

  res.render("index.ejs", { content: data});

});

app.get("/basicAuth", async(req, res) => {

  const request = await axios.get(API_URL + "all?page=2", {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });
  const data = JSON.stringify(request.data);

  res.render('index.ejs', { content: data });

});

app.get("/apiKey", async(req, res) => {

  const request = await axios.get(API_URL + `filter?apiKey=${yourAPIKey}&score=5`);
  const data = JSON.stringify(request.data);

  res.render('index.ejs', { content: data });

});

app.get("/bearerToken", async(req, res) => {

  const request = await axios.get(API_URL + 'secrets/42', {
    headers: {
      Authorization: "Bearer "+ yourBearerToken,
    },
  });
  const data = JSON.stringify(request.data);

  res.render('index.ejs', { content: data });

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
