import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//Before running locally, please generate this from the above api url given. Visit the url for more info.
//The code will not run otherwise.
const yourUsername = "LegolasZidane";
const yourPassword = "webdevelopment";
const yourAPIKey = "2420a0fb-4d5b-457b-ac6a-b4f4fa7e21e5";
const yourBearerToken = "83864602-d9c9-493a-b076-69636e243415";

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
