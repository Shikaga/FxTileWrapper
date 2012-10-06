function add(number1, number2)
{
	return number1 + number2;
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

var TopBarHandler = function(element)
{
	this.topBar = element;
}

TopBarHandler.prototype.renderImages = function(number)
{
	this.topBar.innerHTML = "";
	for(var i=0; i < number; i++)
	{
		this.topBar.appendChild(getImage());
	}
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
var BottomBarHandler = function(element)
{
	this.bottomBar = element;
}

BottomBarHandler.prototype.renderImages = function(number)
{
	this.bottomBar.innerHTML = "";
	for(var i=0; i < number; i++)
	{
		this.bottomBar.appendChild(getImage());
	}
}

function getImage()
{
	var image = document.createElement("span");
	image.style["height"] = "20px";
	image.style["width"] = "20px";
	image.style["display"] = "inline-block";
	image.style["background-color"] = "black";
	image.style["margin"] = "5px";
	return image;
}

//Array of images
//Array of text
//Div Box -> Ordered List -> List of tweets