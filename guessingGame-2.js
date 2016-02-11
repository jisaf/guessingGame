/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber, 
    guessArray = [],
    guessCount = 0;
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

//called in last if/else of checkGuess()
//dist replaces lowerOrHigher()
var dist = function(){
	// var distance;
	// var lastDistance;
	// var drift;
	return function (guess, actual){
		distance = guess - actual;
		drift = ((Math.abs(lastDistance) - Math.abs(distance)));
		lastDistance = distance;
		console.log("dist ran");
	}
}
var distance = dist();//call distance(playerGuess, winningNumber) in checkGuess...should be a closure so should store variables....
// distance(playersGuess, winningNumber);
// // replaced by dist
// function lowerOrHigher(){
// 	// add code here
// 	var dist = function(){
// 		var distance = 0;
// 		return function (guess, actual){
// 			distance = guess - actual
// 		}
// 	}
// 	var distance = dist;
// 	distance(playersGuess, winningNumber);
// 	// var distance = playersGuess - winningNumber; // how far were they?
// 	console.log("distance ", distance);
// 	var diff = function(last, current){
// 		return function(){

// 		}
// 	}
// 	console.log("difference ", lastDistance-distance);

// 	firstGuess()
// 	guessMessage(distance);


// }

//what message are we giving the player

function guessMessage(){
	console.log("guessMessage ran");
	console.log("playersGuess is, ", playersGuess);
	distance(playersGuess, winningNumber);
	var nearfar = "you can always guess again"; // if no lastDistance, don't know if closer or farther so be generic
	var alertStatus = ""; // what alert are we using?
	// if it's a first guess, return something special
	if (guessArray.length === 0) {
		if (distance > 0){
			return "Good first guess, try coming down a bit though";
		} else if (distance < 0) {
			return "Good first guess, try going up a bit though";
		}
	}

	//if it's not a first guess, set a new nearfar message 
	console.log("lastDistance is ", lastDistance);
	console.log("drift is ", drift);
	if (lastDistance) {// if last distance exists, use it to set a new nearfar response
		if (drift > 0) {
			nearfar = "and you're getting closer!";
			$("#guess"+guessArray.length).addClass("alert alert-sucess");
			//alertStatus = "success";
		} else if (drift < 0) {
			nearfar = "and you're getting farther away...";
			// alertStatus = "danger";
			$("#guess"+guessArray.length).addClass("alert alert-danger");
		}
	}

	//deprecated - moved into distance() and first if statement
	// 	var firstGuess = function (){
	// 	if (!lastDistance && distance > 0) { // distance === 0 already handled in checkGuess
	// 		lastDistance = distance;
	// 		return "Good first guess, try coming down a bit though"
	// 	} else if (!lastDistance && distance < 0) {
	// 		lastDistance = distance;
	// 		return "Good first guess, try going up a bit though"
	// 	}
	// }

	if (Math.abs(distance) < 5){
		// $("#guess"+guessArray.length).addClass("alert alert-"+alertStatus);
		return "You're REALLY close!"
	} else if (Math.abs(distance) > 100){
		// $("#guess"+guessArray.length).addClass("alert alert-"+alertStatus);
		return "Yeah...you don't really know what things cost do you?"
	} else if (Math.abs(distance) > 50){
		// $("#guess"+guessArray.length).addClass("alert alert-"+alertStatus);
		return "You're pretty far off, "+ nearfar;
	} else if (Math.abs(distance) > 10){
		// $("#guess"+guessArray.length).addClass("alert alert-"+alertStatus);
		return "You're more than $10 off " + nearfar;
	} else if (Math.abs(distance) > 5){
		// $("#guess"+guessArray.length).addClass("alert alert-"+alertStatus);
		return "So so close...more than $5 off " + nearfar;
	}
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
	guessCount++; // increment guessCount so they can't go over 5
	$("#guess"+guessArray.length).text(guess);//insert guess into results box
	if (guessCount >= 5 && guess != actual) {
		$("#result").text("Sorry, you lost! The actual price is " + winningNumber).addClass("alert-danger").show();
		$("#guess"+guessArray.length).addClass("alert alert-danger");
	} else if (guess === actual) {
		$("#result").text("Winner!").addClass("alert-success").show();
		$("#guess"+guessArray.length).addClass("alert alert-success");
		$("#guess_btn").hide();
		$("#new_btn").show();
	} else {
		console.log(guessMessage());
		$("#result").text(guessMessage()).addClass("alert-info").show();
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

