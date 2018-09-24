var axios = require("axios");
var cheerio = require("cheerio");


var scrape = function(cb){
  console.log("scrape func is working");
      axios.get("https://www.theringer.com/").then(function(res){
          console.log("Axios is working");
          var $ = cheerio.load(res.data);

          var articles = [];
          $("div.c-entry-box--compact--article").each(function(i, element){
            var title = $(this).find("h2").children("a").text();
            var link = $(this).find("h2").children("a").attr("href");
      
              if (title && link) {
                  var dataAdd = {
                      title: title,
                      link: link
                  }
                  articles.push(dataAdd);
              }
            //   function(error, saved){
            //     if (error) {
            //       console.log(error)
            //     } else {
            //       console.log(saved);
            //     }
            //   }
              
            });
            console.log(articles);
            cb(articles)
        });
        
      };


module.exports = scrape;