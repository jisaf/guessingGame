# guessingGame
Guessing Game for FullStack 1602

Because guessing a number between 1-100 is boring and gives very little guidance for the guesser, this version uses the prices of random products from amazon as the number to guess.

The items are stored in an array of objects, it randomly selects one of the products by pushing a random number into the array position (i.e. array[random_number]).
Every refresh of the page brings up a different item. There are ~1000 items in the array, so people probably wont get the same item twice.

It would be better to store the items in a DB for efficiency, and it would be even better to pull directly from amazon, but hey, keeping it all client side and simple.
