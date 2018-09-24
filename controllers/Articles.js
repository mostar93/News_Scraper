var scrape = require("../scripts/scrape");
var date = require("../scripts/date");

var Article = require("../models/Article");

module.exports = {
    fetch: function (app) {
        console.log("Article controller is working");
        scrape(function (data) {
            console.log("scrape is working");
            var articles = data;
            for (var i = 0; i < articles.length; i++) {
                articles[i].date = date();
                articles[i].saved = false;
                console.log(articles);
            }
            Article.collection.insertMany(articles, { ordered: false }, function (err, docs) {
                console.log("TEST");
                app(err, docs);
            })
        })
    },
    delete: function (query, app) {
        Article.remove(query, app);
    },
    get: function (query, app) {
        Article.find(query)
            .sort({
                _id: -1
            })
            .exec(function (err, doc) {
                app(doc);
            })
    },
    update: function (query, app) {
        Article.update({ _id: query._id }, {
            $set: query
        }, {}, app);
    }

}

