var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var _ = require('underscore');

var VersionSchema = new Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

var Version = mongoose.model('Version', VersionSchema);

var TodoSchema = new Schema({
    history: [VersionSchema],
    removed: {
        type: Boolean,
        default: false
    }
})

TodoSchema.statics = {
    getNewestVersion: function() {
        var newest = {};
        newest.createdAt = 0;
        this.history.forEach(function(version){
            if(version.createdAt > newest.createdAt){
                newest = version;
            }
        })
        return newest;
    },
    getOldestVersion: function(){
        var oldest = {};
        oldest.createdAt = getNewestVersion();
        this.history.forEach(function(version){
            if(version.createdAt < oldest.createdAt){
                oldest = version;
            }
        })
        return oldest;
    }
}

TodoSchema.methods = {
    toPublicJSON: function() {
        var json = this.toJSON();
        return _.pick(json, '_id', 'description', 'completed', 'createdAt', 'updatedAt');
    }
}

TodoSchema.virtual('description').get(function(){
    return this.getNewestVersion().description;
}).set(function(description){
    this.set('description', description);
})

TodoSchema.virtual('completed').get(function() {
    return this.getNewestVersion().completed;
}).set(function(completed){
    this.set('completed', completed);
})

TodoSchema.virtual('createdAt').get(function() {
    return this.getOldestVersion().createdAt;
})

TodoSchema.virtual('updatedAt').get(function() {
    return this.getNewestVersion().createdAt;
})

TodoSchema.post('create', function(next) {
    var version = new Version();
    version.set('description', this.description);
    version.set('completed', this.completed);

    this.history.push(version);

    next();
})


mongoose.model('todo', TodoSchema);
