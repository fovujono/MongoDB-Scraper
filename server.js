//Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
//These dependencies make scraping possible
const cheerio = require("cheerio");
const axios = require("axios");

//Port for heroku deployment
const PORT = process.env.PORT || 3002;

//Initialize Express 
const app = express();


// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);

app.set("view engine", "handlebars");

//Connecting to MongoDB... If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);


// Set the app up with morgan.
// morgan is used to log our HTTP Requests. By setting morgan to 'dev'
// the :status token will be colored red for server error codes,
// yellow for client error codes, cyan for redirection codes,
// and uncolored for all other codes.
app.use(logger("dev"));


//Requiring Routes Page
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);
//Listen on port 3000
app.listen(PORT, function () {
  console.log("App running on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});