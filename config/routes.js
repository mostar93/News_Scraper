var Articlescontroller = require("../controllers/Articles");
var notesController = require("../controllers/notes"); 

module.exports = function(router){
    router.get("/", function(req,res){
        // console.log("still working");
        res.render("home", res);
    });

    router.get("/saved", function(req,res){
        res.render("saved");
    });

    router.get("/api/fetch", function(req,res){
        // console.log("routes.js is working");
        Articlescontroller.fetch(function(err, docs){
            console.log("fetch is working");
            if (!docs || docs.insertedCount === 0){
                res.json({message: "NOPE!"})
            } else {
                res.json({message: "added " + docs.insertedCount + " new articles"})
            }
        })
    });
    router.get("/api/all", function(req, res){
        console.log("routes.js is working");
        var query = {};
        if (req.query.saved) {
            query = req.query;
        } 
        Articlescontroller.get(query, function(data){
            res.json(data);
        })
    });
    router.delete("/api/all/:id", function(req, res){
        var query = {};
        query._id = req.params.id;
        Articlescontroller.delete(query, function(err, data){
            res.json(data);
        })
    }); 
    router.patch("/api/all", function(req, res){
        Articlescontroller.update(req.body, function(err, data){
            res.json(data);
        })
    }); 
    router.get("/api/notes/:article_id", function(req, res){
        var query = {};
        if (req.params.article_id){
            query._id = req.params.article_id;
        }
        notesController.get(query, function(err, data){
            res.json(data);
        })
    });
    router.delete("/api/notes/:id", function(req, res){
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data){
            res.json(data);
        })
    });
    router.post("/api/notes", function(req, res){
        notesController.save(req.body, function(data){
            res.json(data);
        })
    })
}