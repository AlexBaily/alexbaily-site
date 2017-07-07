const express = require('express');
const app = express();
var os = require('os');
var bodyParser = require('body-parser');

var osVer = os.platform();
var instances = ['server1', 'server2', 'server3']

var AWS = require("aws-sdk");
AWS.config.update({region:'eu-west-1'});


var getMessages = function () {
 var docClient = new AWS.DynamoDB.DocumentClient();
 var params = { TableName: "message-table", KeyConditionExpression: "chatID = :chatID", ExpressionAttributeValues: { ":chatID":"1" }};

  var messages = ""
  docClient.query(params, function(err, data) {
    if (err) { console.log(err); }
    else { console.log(data.Items[0].message); var messages = data; }
  });
};
var test = getMessages();

//Set the view engine to jade
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));

//Returning responses for GET requires
app.get('/', function (req, res) {
  var test = getMessages();
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = { TableName: "message-table", KeyConditionExpression: "chatID = :chatID", ExpressionAttributeValues: { ":chatID":"1" }};

  var messages = ""
  docClient.query(params, function(err, data) {
    if (err) { console.log(err); }
    else { 
      console.log(data.Items[0].message); 
      var messages = data; 
   res.render('index',
              { title: 'Hello world!',
                message: 'Welcome to the world of tomorrow!',
                platform: osVer,
                servers: instances,
                        messageList: data.Items[0].message});
  }})});


app.get('/monitor.htm', function (req, res) {
  res.sendFile(__dirname + '/monitor.htm');
});

app.post('/', function(req, res) {
    var message = req.body.message;
    if (message) {
       console.log(message);
       res.redirect("/");
    }
});

app.listen(8080, function () {
  console.log('The application is listening on port 8080')
});

app.use(function (req, res) {
	res.status(404).send('ERROR MATE! WRONG PAGE!:');
});
