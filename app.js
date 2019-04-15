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


const poolParams = {    
    UserPoolId : process.env.USERPOOLID,   
    ClientId : process.env.CLIENTID
}; 
const pool_region = process.env.AWS_REGION;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolParams);


//Set the view engine to jade
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
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


app.get('/register', function(req, res) {

    res.render('register');

});

//Register
app.post('/api/register', function(req, res) {
    var email = req.body.email;
    var username=req.body.username;
    var password=req.body.password; 

    var attributeList = [];
    
    var dataEmail = {
        Name : 'email',
        Value : email
    };

    var dataName = {
        Name : 'name',
        Value : username
    };
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);

    attributeList.push(attributeEmail);
    attributeList.push(attributeName);

    userPool.signUp(username, password, attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            //Testing sending a 401 so we get a popup alert on the frontend if
            //we see an error on creating a user.
            res.status(401).send(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        res.send(result.user);
    });


});

app.get('/confirmation', function(req, res) {
  
   res.render('confirmation');

});

//Verify the user after registration.
app.post('/api/register/confirm', function(req, res) {

    var username=req.body.username;
    var verifycode=req.body.verifycode;
    var userData = {
        Username : username,
        Pool : userPool
    };
    //CofnitoUser is the class that must be used for confirming registration.
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    //Confirm registration by calling the confirmRegistration method.
    cognitoUser.confirmRegistration(verifycode, true, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
            console.log(result);
            res.redirect('/');
    });

});


//Login
app.post('/login', function(req, res) {
    var username=req.body.username;
    var password=req.body.password;

    var authCreds = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : username,
        Password : password,
    });
 
    var userInfo = {
        Username : username,
        Pool : userPool
    };

    var cogUser = new AmazonCognitoIdentity.CognitoUser(userInfo);
    cogUser.authenticateUser(authCreds, {
        onSuccess: function (result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            console.log('id token + ' + result.getIdToken().getJwtToken());
            console.log('refresh token + ' + result.getRefreshToken().getToken());
        },
        onFailure: function(err) {
            console.log(err);
        },

    });

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
