const express = require('express');
const app = express();
var os = require('os');

var osVer = os.platform();

//Set the view engine to jade
app.set('view engine', 'jade');

//Returning responses for GET requires
app.get('/', function (req, res) {
  res.render('index', { title: 'Hello world!', message: 'Welcome to the world of tomorrow!', platform: osVer });
});

app.get('/monitor.htm', function (req, res) {
  res.sendFile(__dirname + '/monitor.htm');
});

app.listen(8080, function () {
  console.log('The application is listening on port 8080')
});

app.use(function (req, res) {
	res.status(404).send('ERROR MATE! WRONG PAGE!:');
});
