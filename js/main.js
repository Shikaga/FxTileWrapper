function add(number1, number2)
{
	return number1 + number2;
}

function onScroll(e)
{
	console.log(e.scrollTop);
}

/**
* This class determines where all the pics should be
* It calculates this based on TweetBar size, Tweet Size and number of tweets
*/

var LocationHandler = function(numberOfTweets,sizeOfTweetBar,sizeOfTweets)
{
	this.currentPosition = 0; //In pixels
	this.numberOfTweets = numberOfTweets; 
	this.sizeOfTweetBar = sizeOfTweetBar; //In pixels
	this.sizeOfTweets = sizeOfTweets; //In pixels
}

LocationHandler.prototype.setPosition = function(position)
{
	this.currentPosition = position;
}

LocationHandler.prototype.getTweetsInTopBar = function()
{

	return Math.floor(this.currentPosition / this.sizeOfTweets);
}

LocationHandler.prototype.getTweetsInTweetBar = function()
{
	var perfectFit = (this.currentPosition % this.sizeOfTweets) == 0;
	var numberOfTweetsInTweetBar = Math.floor(this.sizeOfTweetBar / this.sizeOfTweets);
	if (perfectFit) {
		return numberOfTweetsInTweetBar;
	} else {
		return numberOfTweetsInTweetBar + 1;
	}
}

LocationHandler.prototype.getTweetsInBottomBar = function()
{
	
	return this.numberOfTweets - this.getTweetsInTweetBar() - this.getTweetsInTopBar();
}

/**
* This class handles what images are shown in the top bar.
*/

var TopBarhandler = function()
{

}

/**
* This class handles all the tweets in the scroll menu
*/
var TweetHandler = function()
{

}

/**
* This class handles what images are shown in the bottom bar.
*/
var BottomBarHandler = function()
{

}

//Array of images
//Array of text
//Div Box -> Ordered List -> List of tweets