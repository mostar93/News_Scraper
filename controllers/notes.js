
var date = require("../scripts/date");

var Note = require("../models/Note");

module.exports = {
    get: function (data, app) {
        Note.find({
            _headlineid: data._id
        }, app)
    },
    save: function (data, app){
        var newNote = {
            _headlineid: data._id,
            title: data.title,
            date: date(),
            body: data.body        
        }
        Note.create(newNote, function(err, doc){
            if (err){
                console.log(err)
            } else {
                console.log(doc);
                app(doc);
            }
        })
    },
    delete: function (data, app){
        Note.remove({
            _id: data._id,

        }, app);
    }
}