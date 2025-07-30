import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const port = 3000;
const app = express();
let userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true}));

function passwordChecker(req, res, next){
    
    const password = req.body["password"];
    if( password === "ILoveProgramming" )
        userIsAuthorised = true;
    next();
}

app.use(passwordChecker);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) =>{
    
    if( userIsAuthorised )
        res.sendFile(__dirname + "/public/secret.html");
    else
        res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, ()=>{
    
    console.log(`Server started at ${port}`);
});