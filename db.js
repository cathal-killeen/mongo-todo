var mongoose = require('mongoose');

var uri = 'mongodb://admin:cheetos@ds033744.mlab.com:33744/hash-todo-db';
var db = {};

require('./models/todo');
require('./models/user');

db.connect = function(){
    return new Promise(function(resolve, reject) {
        mongoose.connect(uri);
        mongoose.connection.on('error', function(err){
            console.log('Db connection error');
            reject();
        })
        mongoose.connection.once('open', function(){
            console.log('Connected to db');
            resolve();
        })
    })
}

db.todo = mongoose.model('todo');
db.user = mongoose.model('user');
db.mongoose = mongoose;

module.exports = db;
