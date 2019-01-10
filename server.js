//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars")
const path = require("path");

//These dependencies make scraping possible
const cheerio = require("cheerio");
const axios = require("axios");

//Initialize Express 
const app = express();


// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);  

app.set("view engine", "handlebars");

//Initialize Express
const app = express();

//Variables for our database
const databaseUrl = "scraper";
const collections = ["scrapedData"];


//Connecting to MongoDB... If deployed, use the deployed database. Otherwise use the local mongoHeadlines database

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);



//Routes
//INDEX 
app.get("/", function(req,res){
    res.render(path.join(__dirname + "./views/index.handlebars"));
});




//Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port %s. Visit http://localhost:%s/ in your browser.",
    3000,
    3000
 );
});