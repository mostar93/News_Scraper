$(document).ready(function(){
  console.log("HANDLEBARS SUCKS")
  var articlesContainer = $(".articles-container");

  // $(document).on("click", "btn.save", handleArticlesSave);
  // $(document).on("click", ".scrape-new", handleArticlesScrape);

  initPage();

  function initPage(){
    articlesContainer.empty();
    $.get("/api/all")
    .then(function(data){
      if (data && data.length){
        renderArticles(data);
      } else {
        renderEmpty();;
      }
    })
  }
  function renderArticles(articles){
  
    var articlePanels = [];
    for (var i = 0; i < articles.length; i++){
      articlePanels.push(createPanel(articles[i]))
    }
    articlesContainer.append(articlePanels);
  };
  
  function createPanel(article){
    
    var card = $("<div class='card'>");
    var cardHeader = $("<div class='card-header'>").append(
      $("<h3>").append(
        $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
          .attr("href", article.link)
          .text(article.title),
        $("<a class='btn btn-success save'>Save Article</a>")
      )
    );
  
    var cardBody = $("<div class='card-body'>").text(article.summary);
  
    card.append(cardHeader, cardBody);
    // We attach the article's id to the jQuery element
    // We will use this when trying to figure out which article the user wants to save
    card.data("_id", article._id);
    // We return the constructed card jQuery element
    return card;
  }
  
  function handleArticleSave() {
    // This function is triggered when the user wants to save an article
    // When we rendered the article initially, we attached a javascript object containing the headline id
    // to the element using the .data method. Here we retrieve that.
    var articleToSave = $(this)
      .parents(".card")
      .data();
  
    // Remove card from page
    $(this)
      .parents(".card")
      .remove();
  
    articleToSave.saved = true;
    // Using a patch method to be semantic since this is an update to an existing record in our collection
    $.ajax({
      method: "PUT",
      url: "/api/all",
      data: articleToSave
    }).then(function(data) {
      // If the data was saved successfully
      if (data.saved) {
        // Run the initPage function again. This will reload the entire list of articles
        initPage();
      }
    });
  }
  
  function handleArticleScrape() {
    // This function handles the user clicking any "scrape new article" buttons
    $.get("/api/fetch").then(function(data) {
      // If we are able to successfully scrape the NYTIMES and compare the articles to those
      // already in our collection, re render the articles on the page
      // and let the user know how many unique articles we were able to save
      initPage();
      bootbox.alert($("<h3 class='text-center m-top-80'>").text(data.message));
    });
  }

});



  
