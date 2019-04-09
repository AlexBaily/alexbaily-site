const express = require('express');
const app = express();


//Packages imported for Cognito Access
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

var os = require('os');
var bodyParser = require('body-parser');
var osVer = os.platform();

const poolData = {    
UserPoolId : process.env.USERPOOLID, // Your user pool id here    
ClientId : process.env.CLIENTID // Your client id here
}; 
const pool_region = process.env.AWS_REGION;


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
    });
});

//Monitor URL for the load balancer
app.get('/monitor.htm', function(req, res) {
    res.sendFile(__dirname + '/monitor.htm');
});


//API for gathering Exercise information, still required is client authentication
app.get('/api/exercises', function(req, res) {

});


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
    res.status(404).send('Uh oh');
});
