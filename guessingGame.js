/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    guessArray = [];
var item = generateWinningNumber(0,820);
var winningNumber = +item.rounded_price;	
var hints = 0;

/* **** Guessing Game Functions **** */

// Generate the Winning Number
//refactor to close winningNumber to remove it as a global variable
function generateWinningNumber(){
	var rand = function getRandomInt(min, max) { // function to generate a random whole number between the two attributes
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    var index = rand(0,820); // set index to the result of the function. REFACTOR FOR CLOSURE
    var item = items[index]; // find item at that index in the items array
	return item;
}

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
		} else {
			return "";
		}
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
		} else if (Math.abs(dis) >= 5){
			return "So so close...a bit more than $5 off ";
		}
	}
	var distMessage = distMessage(dis);
	var direcMessage = direcMessage(dis);
	return distMessage + " " + direcMessage;
}

// Check if the Player's Guess is the winning number 

function checkGuess(guess, actual){
	// add code here
		if (guessArray.length > 4) {return};
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
		$("#guess_btn").removeClass("btn-primary");
		$("#new_btn").addClass("btn-primary");
	} else if (guess === actual) {
		$("#result").text("Winner!").addClass("alert-success").fadeIn(0).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
		$("#guess"+guessArray.length).addClass("alert alert-success");
		$("#guess_btn").removeClass("btn-primary");
		$("#new_btn").addClass("btn-primary");
		$(".jumbotron").hide();
		celebrate();

	} else {
		$("#result").text(lowerOrHigher()).addClass("alert-info").show();
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(e){
	// add code here
	// generate 2 additional random items. on first guess, show 3 prices. on second guess, show names of items
	e.preventDefault();
	if (hints === 0){
	var itemsArr = [];
		itemsArr.push(item.rounded_price);
		itemsArr.push(generateWinningNumber(0,820).rounded_price);
		itemsArr.push(generateWinningNumber(0,820).rounded_price);
		// console.log(itemsArr);
		itemsArr.shuffle();
		// console.log(itemsArr);
		var hint = "This item probably costs $" + itemsArr.join(" or $");
		// console.log(hint)
		hints ++;
		$("#result").text(hint).addClass("alert-warning").show();
	} else {
		$("#result").text("You've already had your guess! \n Remember what it was?").addClass("alert-warning").show();
	}
}

// Allow the "Player" to Play Again

function playAgain(e){
	e.preventDefault();
	playersGuess = 0,
    guessArray = [];
	item = generateWinningNumber(0,820);
	winningNumber = +item.rounded_price;	
	hints = 0;
	$("#item-image").attr("src", item.image_src); //update the item image
	$("#item-name").text(item.title);
	$(".guess_box").text(" .. ").removeClass("alert alert-danger").removeClass("alert alert-success")
	$("#guess_btn").addClass("btn-primary");
	$("#new_btn").removeClass("btn-primary");
	$("#result").hide()
	$("body").css("background-image", "url('')");
}

function rules(e){
	e.preventDefault();
	$("#item-image").toggle();
	$("#rules").toggle();
}

Array.prototype.shuffle = function() {
    var input = this;
     
    for (var i = input.length-1; i >=0; i--) {
     
        var randomIndex = Math.floor(Math.random()*(i+1)); 
        var itemAtIndex = input[randomIndex]; 
         
        input[randomIndex] = input[i]; 
        input[i] = itemAtIndex;
    }
    return input;
}

/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
	$("#guess_btn").on("click", playersGuessSubmission);
	$("#hint_btn").on("click", provideHint);
	$("#item-image").attr("src", item.image_src); //update the item image
	$("#item-name").text(item.title);
	$("#new_btn").on("click", playAgain);
	$("#huh").on("click", rules);
});

