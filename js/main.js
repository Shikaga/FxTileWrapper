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

TopBarHandler.prototype.addTweets = function(tweets)
{
	this.tweets = tweets;
}

TopBarHandler.prototype.renderImages = function(number)
{
	this.topBar.innerHTML = "";
	for(var i=0; i < number; i++)
	{
		this.topBar.appendChild(this.tweets[i].smallImage);
	}
}

/**
* This class handles all the tweets in the scroll menu
*/
var TweetHandler = function(element)
{
	this.tweetBar = element;
}

TweetHandler.prototype.addTweets = function(tweets)
{
	for (tweetId in tweets)
	{
		this.tweetBar.appendChild(tweets[tweetId].largeImage);
	}
}

/**
* This class handles what images are shown in the bottom bar.
*/
var BottomBarHandler = function(element)
{
	this.bottomBar = element;
}

BottomBarHandler.prototype.addTweets = function(tweets)
{
	this.tweets = tweets;
}

BottomBarHandler.prototype.renderImages = function(number)
{
	this.bottomBar.innerHTML = "";
	var startIndex = this.tweets.length - number;
	for(var i=startIndex; i < startIndex+number; i++)
	{
		this.bottomBar.appendChild(this.tweets[i].smallImage);
	}
}

var Tweet = function(fx)
{
	this.smallImage = getSmallImage(fx);
	this.largeImage = getLargeImage(fx);
}

function getSmallImage(fx)
{
	var image = document.createElement("span");
	image.innerHTML=fx.substr(0,3) + "<br />" + fx.substr(3)
	image.style["height"] = "20px";
	image.style["width"] = "20px";
	image.style["display"] = "inline-block";
	image.style["color"] = "white";
	image.style["font-size"] = "8px";
	image.style["background-color"] = "black";
	image.style["margin"] = "5px";
	return image;
}


function getLargeImage(fx)
{
	var image = document.createElement("div");
	image.style["height"] = "60px";
	image.style["border"] = "1px solid black";
	
	var buyButton = document.createElement("button");
	buyButton.innerHTML = "BUY!";
	buyButton.style["height"] = "50px";
	buyButton.style["width"] = "50px";
	image.appendChild(buyButton);
	
	var currencyPair = document.createElement("span");
	currencyPair.innerHTML = fx;
	currencyPair.style["height"] = "50px";
	currencyPair.style["width"] = "50px";
	image.appendChild(currencyPair);
	
	var sellButton = document.createElement("button");
	sellButton.innerHTML = "SELL!";
	sellButton.style["height"] = "50px";
	sellButton.style["width"] = "50px";
	image.appendChild(sellButton);
	
	return image;
}

//Array of images
//Array of text
//Div Box -> Ordered List -> List of tweets