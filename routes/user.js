var express = require('express');
var _ = require('underscore');
var db = require('../db');
var router = express.Router();

// all routes begin with /user

router.post('/signup', function(req,res){
    var body = _.pick(req.body, 'email', 'password', 'name');

    db.user.create(body)
        .then(function(user){
            return res.status(200).json(user.toJSON()).send();
        }).catch(function(e){
            return res.status(400).json(e).send();
        })
})


module.exports = router;
