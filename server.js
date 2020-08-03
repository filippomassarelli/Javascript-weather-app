require("dotenv").config();

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

// ROUTES

//POST route
app.post("/projectData", addData);

function addData(req, res) {
  console.log(req.body);
  const newEntry = {
    city: req.body.name,
    temp: req.body.main.temp,
    icon: req.body.weather[0].icon,
    description: req.body.weather[0].description,
    feeling: req.body.feeling,
    date: req.body.date,
  };
  projectData = { ...newEntry };
  console.log(
    "search data posted to /searchData route. projectData = ",
    projectData
  );
  res.send(projectData);
}

// GET route
app.get("/projectData", getData);

function getData(req, res) {
  res.status(200).send(projectData);
}
