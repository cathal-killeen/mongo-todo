var express = require('express');
var _ = require('underscore');
var db = require('../db');
var router = express.Router();

// all routes begin with /todos

router.post('/', function(req,res){
    var body = _.pick(req.body, 'description', 'completed');

    db.todo.create(body)
        .then(function(todo){
            return res.status(200).json(todo.toJSON()).send();
        }).catch(function(e){
            return res.status(400).json(e).send();
        })
})

router.get('/', function(req, res){
    var query = req.query;

    db.todo.find()
        .then(function(todos){
            return res.status(200).json(todos).send();
        }).catch(function(e) {
            return res.status(500).json(e).send();
        })
})

module.exports = router;
