// grab the packages we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var shortid = require('shortid');

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

var clients = {};

// routes will go here
app.post('/post', function(req, res) {
	var uId = shortid.generate();
	console.log("request body :" + req.body.name);
	clients[uId] = req.body.name;
	res.send(uId);
  });

app.get("/post/:id",function(req,res){
	var id = req.params.id;
	res.send(clients[id]);
	//further operations to perform
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);