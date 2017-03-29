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

//Store Client Data Temporarily
var clients = {};

//Process Post from Extension
app.post('/post', function(req, res) {
	var uId = shortid.generate();
	console.log("request body :" + req.body.name);
	clients[uId] = req.body.name;
	res.send(uId);
  });

//Display one time use page then delete temp data
app.get("/post/:id",function(req,res){
	var id = req.params.id;
	if (id in clients){
		res.send(clients[id]);
		delete clients[id]; 
	}
	else{
	res.send("Key Not Found!");
	}
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);