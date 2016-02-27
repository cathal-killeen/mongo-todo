var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;

var app = express();
var db = require('./db');

app.use(bodyParser.json());

app.get('/', function(req,res){
    res.send('Welcome to Hashtask');
})

app.post('/todos', function(req,res){
    var body = _.pick(req.body, 'description', 'completed');

    db.todo.create(body)
        .then(function(todo){
            return res.status(200).json(todo.toJSON()).send();
        }).catch(function(e){
            return res.status(400).json(e).send();
        })
})


db.connect().then(function(){
    app.listen(PORT, function(){
        console.log("Listening on port " + PORT + "...");
    })
})
