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

let items = [];

app.get("/", async (req, res) => {

  const result = await db.query("SELECT * FROM items ORDER BY id ASC");
  items = result.rows;
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  let newId = 0;
  if( items.length !== 0 )
    newId = items.length;
  await db.query("INSERT INTO items (id, title) VALUES ($1, $2)", [newId, item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {

  const updatedItem = {
    id: req.body.updatedItemId,
    title: req.body.updatedItemTitle
  };

  await db.query("UPDATE items SET title = $1 WHERE id = $2", [updatedItem.title, updatedItem.id]);
  
  res.redirect("/");

});

app.post("/delete", async (req, res) => {

  const toDeleteItemId = req.body.deleteItemId;

  await db.query("DELETE FROM items WHERE id = $1", [toDeleteItemId]);

  res.redirect("/");

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


//Some upgrades like sort by creation date, multiple lists, family todo lists.

