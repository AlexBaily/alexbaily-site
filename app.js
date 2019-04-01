const express = require('express');
const app = express();
var os = require('os');
var bodyParser = require('body-parser');
var dns = require('dns');
var osVer = os.platform();
var instances = ['server1', 'server2', 'server3']

//Set the view engine to jade
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

//Returning responses for GET requires
app.get('/', function(req, res) {

    //Render the base page using Jade, other information will be gathered via API
    res.render('index', {
        title: 'Hello world!',
        message: 'Welcome to the world of tomorrow!',
        platform: osVer,
        servers: instances
    });
});

//Monitor URL for the load balancer
app.get('/monitor.htm', function(req, res) {
    res.sendFile(__dirname + '/monitor.htm');
});


//pseudo "API" for gathering DynamoDB information, still required is client authentication
app.get('/api/messages', function(req, res) {

});


//Post requests will amend the chat to DynamoDB.
//TODO: Sanitize inputs, create OPTIONS, require auth?
app.post('/', function(req, res) {
    var message = req.body.message;
    if (message) {
        console.log(message);
    }
});

//Starts the application on port 8080
app.listen(80, function() {
    console.log('The application is listening on port 8080')
});

//404 page
app.use(function(req, res) {
    res.status(404).send('ERROR MATE! WRONG PAGE!:');
});
