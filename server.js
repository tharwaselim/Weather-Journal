// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();

// Start up an instance of app
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
//configure listner port
const port = 8000;
const server = app.listen(port, () => {
console.log(`server is listening on port: ${port}`); 
});
//post data function
app.post('/add',(req, res)=> {
    projectData={
    temp:req.body.temp,
    date:req.body.date,
    content: req.body.content,
    }
    res.send(projectData);
    })

// get data  function
app.get('/all', (req, res)=>{
    res.send(projectData);
    console.log(projectData);
})