var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var _ = require('underscore');
var validate = require('mongoose-validator');

var UserSchema = new Schema({
    name: {
        first: {type: String, required: true, max: 35},
        last: {type: String, required: true, max: 35}
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: validate({validator: 'isEmail'})
    },
    created: {type: Date, default: Date.now },
    updated: {type: Date, default: Date.now }
})

mongoose.model('user', UserSchema);
