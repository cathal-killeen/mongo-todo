var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var _ = require('underscore');
var mongooseHidden = require('mongoose-hidden')({defaultHidden: { '__v': true }});

var TodoSchema = new Schema({
    description: {
        type: String,
        required: true,
        max: 250
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    removed: {
        type: Boolean,
        default: false,
        hide: true
    },
    created: {type: Date, default: Date.now },
    updated: {type: Date, default: Date.now }
});

TodoSchema.pre('update', function(next){
    this.updated = Date.now;
    next();
})

TodoSchema.plugin(mongooseHidden);
mongoose.model('todo', TodoSchema);
