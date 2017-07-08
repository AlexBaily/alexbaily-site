const express = require('express');
const app = express();
var os = require('os');
var bodyParser = require('body-parser');

var osVer = os.platform();
var instances = ['server1', 'server2', 'server3']
var AWS = require("aws-sdk");
AWS.config.update({region:'eu-west-1'});

//Set the view engine to jade
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));

//Returning responses for GET requires
app.get('/', function (req, res) {

  //Query the dynamoDB table to get the information on the messages
  //Todo: seperate getting the DynamoDB info into an API query and offload fetching of the data to the client side
     res.render('index',
              { title: 'Hello world!',
                message: 'Welcome to the world of tomorrow!',
                platform: osVer,
                servers: instances});
});

//Monitor URL for the load balancer
app.get('/monitor.htm', function (req, res) {
  res.sendFile(__dirname + '/monitor.htm');
});

app.get('/api/messages', function (req, res) {
	
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = { TableName: "message-table", 
                             KeyConditionExpression: "chatID = :chatID", 
                             ExpressionAttributeValues: { ":chatID":"1" }};	
  
  docClient.query(params, function(err, data) {
	if (err) { console.log(err) }  
	else {
                var messageList = {
                     chatID: data.Items[0].chatID,
                     message: data.Items[0].message
                };
		res.send (messageList);
	}
  });
	
});


//Currently does nothing
app.post('/', function(req, res) {
    var message = req.body.message;
    if (message) {
       console.log(message);
       var docClient = new AWS.DynamoDB.DocumentClient();
       var params = {
            TableName: "message-table",
            Item:{
                "chatID": "1",
                "message": message
            }
       };
       docClient.put(params, function(err, data) {
          if (err) {
             console.error(err);
          }
          else { 
             res.redirect("/");
          }
       });
    }
});

app.listen(8080, function () {
  console.log('The application is listening on port 8080')
});

app.use(function (req, res) {
        res.status(404).send('ERROR MATE! WRONG PAGE!:');
});

