var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var _ = require('underscore');
var validate = require('mongoose-validator');
var validator = require('validator');
var bcrypt = require('bcrypt');

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
    password_hash: {type: String},
    created: {type: Date, default: Date.now },
    updated: {type: Date, default: Date.now }
})

UserSchema.pre('save', function(next){
    if(typeof this.email === 'string'){
        this.email = validator.normalizeEmail(this.email);
    }
    return next();
})

UserSchema.virtual('password').set(function(password){
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    this.set('password_hash', hashedPassword);
    this.set('password', password);
})

UserSchema.methods.authenticate = function(){

}

mongoose.model('user', UserSchema);
