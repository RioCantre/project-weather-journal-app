
// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


projectData = {};


// Create a GET route
app.get('/get', (req, res) => {
    res.send(projectData);
})

app.get('/all', getData);
function getData(req, res) {
    res.send(projectData);
    console.log(projectData);
}


// Create a POST route
app.post('/addEntry', (req, res) => {
    const entry = {
        data: req.body.data,
        mood: req.body.emotion,
        entry: req.body.feelings
    }
    projectData = entry
    res.send(projectData)
})



// Setup Server
const port = 8000;
app.listen(port, () => {
    console.log(`server is running on localhost: ${port}`)
})