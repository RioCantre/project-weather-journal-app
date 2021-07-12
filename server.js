// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8888;
app.listen(port, () => {
    console.log(`running on localhost: ${port}`)
})

// Create a GET route
app.get('/get', (req, res) => {
    res.send(projectData);
    console.log(projectData);
})

app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData)
})


// Create a POST route
app.post('/add', (req, res) => {
    newEntry = {
        location: req.body.location,
        dt: req.body.dt,
        temp: req.body.temp,
        icon: req.body.icon,
        description: req.body.description,
        max: req.body.max,
        min: req.body.min,
        feelings: req.body.feelings
    }

    projectData = newEntry;
    console.log(projectData);
    res.send(projectData);

})


