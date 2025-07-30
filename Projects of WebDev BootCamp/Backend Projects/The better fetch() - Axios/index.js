import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request(from get):", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
  const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`);
  const result = response.data;
  const randomNumber = Math.floor(Math.random()*(result.length));
  const randomSelectActivity = result[randomNumber];
  res.render("index.ejs", { data: randomSelectActivity });
  } catch (error) {
    console.error("Failed to make request(from post):", error.message);
    res.render("index.ejs", { error: "No activities that match your criteria" });
  }
});

 app.listen(port, () => {
   console.log(`Server running on port: ${port}`);
});
