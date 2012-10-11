function add(number1, number2)
{
	return number1 + number2;
}

/**
* This class determines where all the pics should be
* It calculates this based on TweetBar size, Tweet Size and number of tweets
*/

var LocationHandler = function(tweetHandler, numberOfTweets,sizeOfTweetBar,sizeOfTweets)
{
	this.tweetHandler = tweetHandler;
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

LocationHandler.prototype.getTweetPosition = function(index)
{	
	return index * this.sizeOfTweets;
}

LocationHandler.prototype.goToLocation = function(index) 
{
	console.log(this);
	this.tweetHandler.tweetBar.scrollTop = this.getTweetPosition(index);
}

/**
* This class handles all the tweets in the scroll menu
*/
var TweetHandler = function(element)
{
	this.tweetBar = element;
}

TweetHandler.prototype.setTweets = function(tweets)
{
	for (tweetId in tweets)
	{
		this.tweetBar.appendChild(tweets[tweetId].largeImage);
	}
}

/**
* This class handles what images are shown in the top bar.
*/

var TopBarHandler = function(element, width, rollover, callback)
{
    this.width = width;
    this.rollover = rollover;
    this.topBar = element;
    this.callback = callback;
}


TopBarHandler.prototype.setTweets = function(tweets)
{
	this.tweets = tweets;
}

TopBarHandler.prototype.renderImages = function(number)
{
    this.topBar.innerHTML = "";
    var numberOfImagesToDisplay = this.getNumberOfImagesToDisplay(number);
    var rolloverNumber = number-numberOfImagesToDisplay;
    console.log("Requested", number, "index: ", 0, "displayed", numberOfImagesToDisplay);
    for(var i=numberOfImagesToDisplay-1+rolloverNumber; i >= rolloverNumber ; i--)
    {
	this.topBar.appendChild(this.tweets[i].smallImage);
    }
    if (number > numberOfImagesToDisplay) {
	this.topBar.appendChild(this.rollover.getRollover("" + rolloverNumber, numberOfImagesToDisplay, this.callback));
    }
}

TopBarHandler.prototype.getTotalLengthOfTweets = function(number)
{
    if (this.tweets == null) return 0;
    var length = 0;
    for (var i=0; i < number; i++)
    {
	length += this.tweets[i].smallImageWidth;
    }
    return length;
}

TopBarHandler.prototype.getNumberOfImagesToDisplay = function(number)
{
    if (this.tweets == undefined) return 0;
    var tweetLength = this.getTotalLengthOfTweets(number);
    var numberOfTweets = Math.floor((this.width - this.rollover.width) / this.tweets[0].smallImageWidth);
    if (numberOfTweets > number) return number;
    if (tweetLength <= this.width) return number;
    return numberOfTweets;
}

/**
* This class handles what images are shown in the bottom bar.
*/
var BottomBarHandler = function(element, width, rollover, callback)
{
    this.bottomBar = element;
    this.bottomBarWidth = width;
    this.rollover = rollover;
    this.callback = callback;
}

BottomBarHandler.prototype.setTweets = function(tweets)
{
	this.tweets = tweets;
}

BottomBarHandler.prototype.renderImages = function(number)
{
    this.bottomBar.innerHTML = "";
    var startIndex = this.getIndex(number);
    var numberOfImagesToDisplay = this.getNumberOfImagesToDisplay(number);
    console.log("Requested", number, "index: ", startIndex, "displayed", numberOfImagesToDisplay);
    for(var i=startIndex; i < startIndex+numberOfImagesToDisplay; i++)
    {
	this.bottomBar.appendChild(this.tweets[i].smallImage);
    }
    if (number > numberOfImagesToDisplay) {
	this.bottomBar.appendChild(this.rollover.getRollover("" + (number-numberOfImagesToDisplay), numberOfImagesToDisplay+startIndex-1, this.callback));
    }
}

BottomBarHandler.prototype.getIndex = function(number)
{
	return this.tweets.length - number;
}

BottomBarHandler.prototype.getTotalLengthOfTweets = function(number)
{
    if (this.tweets == null) return 0;
    var length = 0;
    var index = this.getIndex(number);
    for (var i=index; i < this.tweets.length; i++)
    {
	length += this.tweets[i].smallImageWidth;
    }
    return length;
}

BottomBarHandler.prototype.getNumberOfImagesToDisplay = function(number)
{
    if (this.tweets == undefined) return 0;
    var tweetLength = this.getTotalLengthOfTweets(number);
    var numberOfTweets = Math.floor((this.bottomBarWidth - this.rollover.width) / this.tweets[0].smallImageWidth);
    if (numberOfTweets > number) return number;
    if (tweetLength <= this.bottomBarWidth) return number;
    return numberOfTweets;
}

var RolloverIndicator = function()
{
    this.width = 30; //pixels;
    this.height = 30; //pixels
}

RolloverIndicator.prototype.getRollover = function(number, index, callback)
{
    console.log(number);
    return getRolloverImage(number, index, callback);
}

var Tweet = function(index, fx, callback)
{
    this.index = index;
    this.smallImage = getSmallImage(index, fx,callback);
    this.largeImage = getLargeImage(fx);
    this.largeImageHeight = 60; //pixels
    this.smallImageWidth = 30; //pixels including margin

}

function getRolloverImage(number, index, callback)
{
    var image = document.createElement("span");
    image.style["height"] = "20px";
    image.style["width"] = "20px";
    image.style["display"] = "inline-block";
    image.style["color"] = "white";
    image.style["font-size"] = "13px";
    image.style["background-color"] = "black";
    image.style["margin"] = "5px";
    image.setAttribute("position", index);
    image.onclick=callback;
    
    var div = document.createElement("div");
    div.innerHTML = "&nbsp;+" + number;
    div.style["float"] = "left";
    div.style["height"] = "20px";

    image.appendChild(div);

    return image;
}

function getSmallImage(index, fx,callback)
{
    var image = document.createElement("span");
    image.style["height"] = "20px";
    image.style["width"] = "20px";
    image.style["display"] = "inline-block";
    image.style["color"] = "white";
    image.style["font-size"] = "8px";
    image.style["background-color"] = "black";
    image.style["margin"] = "5px";
    image.setAttribute("position", index);
    image.onclick=callback;
    
    var div = document.createElement("div");
    div.innerHTML = fx.substr(0,3);
    div.style["float"] = "left";

    var div2 = document.createElement("div");
    div2.innerHTML = fx.substr(3);
    div2.style["float"] = "left";

    image.appendChild(div);
    image.appendChild(div2);

    return image;
}

function getLargeImage(fx)
{
	var image = document.createElement("div");
	image.style["height"] = "58px";
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