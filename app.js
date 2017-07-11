const express = require('express');
const app = express();
var os = require('os');
var bodyParser = require('body-parser');

var osVer = os.platform();
var instances = ['server1', 'server2', 'server3']
var AWS = require("aws-sdk");
AWS.config.update({
    region: 'eu-west-1'
});

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

    var docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: "message-table",
        KeyConditionExpression: "chatID = :chatID",
        ExpressionAttributeValues: {
            ":chatID": "1"
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.log(err)
        } else {
            var messageList = {
                chatID: data.Items[0].chatID,
                message: data.Items[0].message
            };
            res.header("Content-Type", "application/json");
            res.send(messageList);
        }
    });
});


//Post requests will amend the chat to DynamoDB.
//TODO: Sanitize inputs, create OPTIONS, require auth?
app.post('/', function(req, res) {
    var message = req.body.message;
    if (message) {
        console.log(message);
        var docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: "message-table",
            Key: {
                "chatID": "1"
            },
            UpdateExpression: "SET #attrName = list_append(#attrName, :attrValue)",
            ExpressionAttributeNames: {
                "#attrName": "message"
            },
            ExpressionAttributeValues: {
                ":attrValue": [message]
            }
        };
        docClient.update(params, function(err, data) {
            if (err) {
                console.error(err);
            } else {
                res.redirect("/");
            }
        });
    }
});

//Starts the application on port 8080
app.listen(8080, function() {
    console.log('The application is listening on port 8080')
});

//404 page
app.use(function(req, res) {
    res.status(404).send('ERROR MATE! WRONG PAGE!:');
});
