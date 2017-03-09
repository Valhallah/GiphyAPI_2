
$(document).ready(function(){

//variables
//======================
var topics = ["Wolverine", "Deadpoole", "Jean"];


function addButton() {
  $("#buttonDump").empty();
  for (var i = 0; i < topics.length; i++) {

    var button = $("<button>");

      button.append(topics[i]);
      button.attr("data-mutant", topics[i]);

    $("#buttonDump").append(button);
  }
}


addButton();



//main processes
//======================

//need to render buttons through array - not html
$("#newMutantButton").on("click", function(){
   var userInput = $("#mutantInput").val();
    topics.push(userInput);
    console.log(topics);
    addButton();

    $("#mutantInput").val("");
});

$("#buttonDump").on("click", "button", function() {
   
    addButton();
      // getting the data-mutant attribute
      var xmen = $(this).attr("data-mutant");
      // storing query in the queryURL variablw
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        xmen + "&api_key=dc6zaTOxFJmzC&limit=10";
       
       //ajax call
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        //after data comes back from the request
        .done(function(response) {
          //we store the data from the ajax response here
          var results = response.data;

          //loop through through the results 
          for (var i = 0; i < results.length; i++) {
            //here we create and store a div in the mutantDiv variable
            var mutantDiv = $("<div>");
            //here we create a p tag wich will display the rating 
            var p = $("<p>").text("Rating: " + results[i].rating);
            //creating an image tag and storing it in the variable mutantImg
            var mutantImg = $("<img>");
            //setting the img attribute
            mutantImg.attr("src", results[i].images.fixed_height.url);

            //appending p and div to mutantDiv
            mutantDiv.append(p);
            mutantDiv.append(mutantImg);
            //prepending mutantDiv 
            $("#gifDump").prepend(mutantDiv);
          }
        });
    });
});





