var express = require('express');

var PORT = process.env.PORT || 3000;

var app = express();
var db = require('./db');




app.get('/', function(req,res){
    res.send('Welcome to Hashtask');
})


db.connect().then(function(){
    app.listen(PORT, function(){
        console.log("Listening on port " + PORT + "...");
    })
})
