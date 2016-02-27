var express = require('express');
var _ = require('underscore');
var db = require('../db');
var router = express.Router();

// all routes begin with /todos

router.post('/', function(req,res){
    var body = _.pick(req.body, 'description', 'completed');

    db.todo.create(body)
        .then(function(todo){
            return res.status(200).json(todo.toPublicJSON()).send();
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

router.get('/:id', function(req,res){
    var where = {
        _id: req.params.id
    }

    db.todo.findOne(where)
        .then(function(todo){
            if(!!todo){
                return res.status(200).json(todo.toJSON()).send();
            }else{
                return res.status(404).send();
            }
        }).catch(function(e){
            return res.status(500).json(e).send();
        })
})

router.delete('/:id', function(req,res){
    var where = {
        _id: req.params.id
    }

    db.todo.remove(where)
        .then(function(WriteResult){
            console.log(WriteResult);
            if(WriteResult.result.n === 0){
                return res.status(404).json({
                    error: "No todo with id " + req.params.id
                }).send();
            }else{
                return res.status(204).send();
            }
        }).catch(function(e){
            return res.status(500).json(e).send();
        })
})

router.put('/:id', function(req,res){
    var body = _.pick(req.body, 'description', 'completed');
    var attributes = {};

    if(body.hasOwnProperty('completed')){
        attributes.completed = body.completed;
    }
    if(body.hasOwnProperty('description')){
        attributes.description = body.description;
    }

    var where = {
        _id: req.params.id
    }

    db.todo.findOne(where).then(function(todo){
        if(todo){
            todo.update(attributes).then(function(todo){
                res.json(todo.toJSON());
            }, function(e){
                res.status(400).json(e).send();
            })
        }else{
            res.status(404).send();
        }
    }, function(){
        res.status(500).send();
    })
})

module.exports = router;
