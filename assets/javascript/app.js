
// The array that holds the names of the shows that will start on the page. 
var movies = ["Rick and Morty", "Louie", "Seinfeld", "RuPaul's Drag Race", "The Apprentice", "Arrested Development", "Peep Show", "Absolutely Fabulous", "The Addams Family", "Star Trek", "Twin Peaks"];
// The array that will hold all of the static image urls.
var staticURL = [];
// The array that will hold all of the animated urls. 
var animatedURL = [];

// This function pretty much does everything. 
function render() {

	// Emptys the button area then makes a new button for each item in the array.
	$("#buttonArea").empty();
	for (var i = 0; i < movies.length; i++) {
		var newButton = $("<button>");
		newButton.text(movies[i]);
		newButton.attr("data-name", movies[i]);
		newButton.addClass("show");
		$("#buttonArea").append(newButton);
	};

	// When you click a tvshow button...
	$(".show").click(function() {

		// Emptys the arrays
		animatedURL = [];
		staticURL = [];

		// Emptys the area the gifs go in. 
		$("#gifArea").empty();

		// Plugs the name of the show into the url that will be used with the API
		var replace = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + replace + "&api_key=dc6zaTOxFJmzC&limit=10";

		// AJAX call
		$.ajax({url: queryURL, method: "GET"}).done(function(gif) {

			// Logging stuff to the console for debugging
			console.log(gif);
			console.log(queryURL);

			// Creates the divs and images and appends them to the page..
			for (var i = 0; i < 10; i++) {

				animatedURL.push(gif.data[i].images.fixed_height.url);
				staticURL.push(gif.data[i].images.fixed_height_still.url);

				var newDiv = $("<div>");
				newDiv.addClass("gifDiv")

				var p = $("<p>");
				p.text(gif.data[i].rating);

				if (gif.data[i].rating == "") {
					p.text("n/a")
				};

				var newGif = $("<img>");

				newGif.attr("data-number", i)
				newGif.attr("src", gif.data[i].images.fixed_height_still.url);

				newDiv.append(p);
				newDiv.append(newGif);

				$("#gifArea").append(newDiv);

				// This function creates the play/pause action
				newGif.click(function() {
					if ( $(this).attr("src") == staticURL[$(this).attr("data-number")] ) {
						$(this).attr("src", animatedURL[$(this).attr("data-number")])
					} else {
						$(this).attr("src", staticURL[$(this).attr("data-number")]);
					};
				});

			};

		});

	});

};

// Putting the initial buttons on the page.
render();

// The function that adds a tvshow button to the button area on click.
$("#addShow").click(function() {
	var addedButton = $("#inputBox").val();
	$("#inputBox").val(null);
	movies.push(addedButton);
	render();
});
