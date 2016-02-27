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
},
{
    validate: {
        descriptionIsString: function(){
            if(!_.isString(this.description)){
                throw new Error('Description must be string.');
            }
        }
    }
});

mongoose.model('todo', TodoSchema);
