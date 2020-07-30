// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup server port
const port = 3002;

// Spin server
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
}

// GET route
app.get("/", sendData);

function sendData(req, res) {
  res.send(projectData);
}

// POST route
app.post("/search", callBack);

function callBack(req, res) {
  res.send("search request received");
}
