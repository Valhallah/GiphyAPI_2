
$(document).ready(function(){

//variables
//======================
var topics = ["Wolverine", "Deadpoole", "Jean Grey"];
//looping through array and adding buttons to the page
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

//when we click the submit putton the topic that was entered will be pushed to the array
$("#newMutantButton").on("click", function(){
   var userInput = $("#mutantInput").val();
    topics.push(userInput);
    //and a button will be added
    addButton();
    //clear out the input feild
    $("#mutantInput").val("");
});

$("#buttonDump").on("click", "button", function() {
    //adding the button to the correct div
    addButton();
      // getting the data-mutant attribute
      var xmen = $(this).attr("data-mutant");
      // storing query in the queryURL variablw
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
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
            mutantImg.attr("src", results[i].images.fixed_height_still.url);
            mutantImg.attr("data-still", results[i].images.fixed_height_still.url);
            mutantImg.attr("data-animate", results[i].images.fixed_height.url);
            mutantImg.attr("data-state", "still");
            $(mutantImg).addClass("mutantGif");

            //appending p and div to mutantDiv
            mutantDiv.append(p);
            mutantDiv.append(mutantImg);
            //prepending mutantDiv to the correct div
            $("#gifDump").prepend(mutantDiv);

            //when we click the gif
            $(".mutantGif").on("click", function() {
              //if the gif is still
              if ($(this).attr("data-state") == "still") {
                //animate the gif when clicked
                $(this).attr("data-state","animate");
                $(this).attr("src", $(this).attr("data-animate"));
              } else {
                //otherwise - when clicked - the image will be still
                $(this).attr("data-state","still");
                $(this).attr("src", $(this).attr("data-still"));
              }
            });
          }
        });
    });
});
