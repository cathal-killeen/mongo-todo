var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var _ = require('underscore');

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
    }
});

mongoose.model('todo', TodoSchema);
