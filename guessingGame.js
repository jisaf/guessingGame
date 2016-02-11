/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber, 
    guessArray = [],
    lastDistance; // refactor to use guessArray, we already have this info.
var item = generateWinningNumber(0,820);
console.log(item);

/* **** Guessing Game Functions **** */

// Generate the Winning Number
//refactor to close winningNumber to remove it as a global variable
function generateWinningNumber(){
	var rand = function getRandomInt(min, max) { // function to generate a random whole number between the two attributes
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var index = rand(0,820); // set index to the result of the function. REFACTOR FOR CLOSURE
    var item = items[index]; // find item at that index in the items array
	winningNumber = +item.rounded_price // set the winning number to the rounded price of the item object, +make it a number
	console.log(item.image_src);
	return item;

}
//item = generateWinningNumber(0,820);

// Fetch the Players Guess

function playersGuessSubmission(e){
	// add code here
	e.preventDefault();
	playersGuess = +$("#guess").val();
	$("#guess").val("");
	$("#result").attr("class", "alert").hide();
	checkGuess(playersGuess, winningNumber);

}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	var distance = playersGuess - winningNumber; // how far were they?
	// console.log("distance ", distance);
	// console.log("difference ", lastDistance-distance);
	return guessMessage(distance);

}

function guessMessage(dis){
	function direcMessage (dis){
		var drift = (Math.abs(guessArray[guessArray.length-2] - winningNumber)) - (Math.abs(dis)); // (previous guess distance) - (current distance) = drift could use .slice() but that would return an array I would then have to loop over to add.
		if (drift > 0) {
			$("#guess"+guessArray.length).addClass("alert alert-success");
			return "but you're getting closer!";
		} else if (drift < 0) {
			$("#guess"+guessArray.length).addClass("alert alert-danger");
			return "and you're getting farther away...";
		}
		//refactored from this code
	//	var nearfar = "you can always guess again" // if no lastDistance, don't know if closer or farther so be generic

	// 		if (lastDistance) {// if last distance exists, use it to set a new nearfar response
	// 	if ((Math.abs(lastDistance) - Math.abs(distance)) > 0) {
	// 		nearfar = "but you're getting closer!";
	// 		$("#guess"+guessArray.length).addClass("alert alert-success");
	// 	} else if ((Math.abs(lastDistance) - Math.abs(distance)) < 0) {
	// 		nearfar = "and you're getting farther away...";
	// 		$("#guess"+guessArray.length).addClass("alert alert-danger");
	// 	}
	// }
	}

	function distMessage(dis){
		if (guessArray.length < 2 && dis > 0) { // distance === 0 already handled with a win condition in checkGuess
			return "Good first guess, try coming down a bit though" //direcMessage should return nothing here because drift !> 0 so include direction message
		} else if (guessArray.length < 2 && dis < 0) {
			return "Good first guess, try going up a bit though"
		} else if (Math.abs(dis) < 5){
			return "You're REALLY close!"
		} else if (Math.abs(dis) > 100){
			return "Yeah...you don't really know what things cost do you..."
		} else if (Math.abs(dis) > 50){
			return "You're pretty far off, "
		} else if (Math.abs(dis) > 10){
			return "You're more than $10 off "
		} else if (Math.abs(dis) > 5){
			return "So so close...more than $5 off ";
		}
	}
	var distance = dis;
	var distMessage = distMessage(distance);
	var direcMessage = direcMessage(distance);
	


	return distMessage + " " + direcMessage;
}

// Check if the Player's Guess is the winning number 

function checkGuess(guess, actual){
	// add code here
	for (var i = -1 ; i < guessArray.length ; i++){ // check if already guessed that number
		if (guessArray[i] === guess) {
			$("#result").text("Try again, you've already guessed "+guess).addClass("alert-warning").show();
			return;
		};
	}
	guessArray.push(guess); //add guess to the array to store it
	$("#guess"+guessArray.length).text(guess);//insert guess into results box
	if (guessArray.length >= 5 && guess != actual) {
		$("#result").text("Sorry, you lost! The actual price is " + winningNumber).addClass("alert-danger").show();
		$("#guess"+guessArray.length).addClass("alert alert-danger");
	} else if (guess === actual) {
		$("#result").text("Winner!").addClass("alert-success").show();
		$("#guess"+guessArray.length).addClass("alert alert-success");
		$("#guess_btn").hide();
		$("#new_btn").show();
	} else {
		$("#result").text(lowerOrHigher()).addClass("alert-info").show();
	}



	//fun with closures below - clearly no idea what I'm doing here.
	// function addGuess(guess){
	// 	var guessArr = [];
	// 	var guessPush = function (guess) {
	// 		guessArr.push(guess);
	// 		return console.log(guessArr);
	// 	};
	// 	return guessPush;
	// };
	// var guess = addGuess;
	// guess(guess);
	
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
	$("#guess_btn").on("click", playersGuessSubmission);
	$("#item-image").attr("src", item.image_src); //update the item image
	$("#item-name").text(item.title);
	$("#new_btn").on("click", playAgain);
	// $("#item-image").on("click", function(){
	// 		$(this).find("img").attr("src", item.image_src); //update the item image

	// });
});

