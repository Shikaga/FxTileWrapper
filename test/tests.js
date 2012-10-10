
test( "Get Tweets in top bar", function() {
	var lh = new LocationHandler(null, 10, 100, 25);
	equal(0, lh.getTweetsInTopBar(), "No tweets in top bar to start with" );
	lh.setPosition(24);
	equal(0, lh.getTweetsInTopBar(), "The tweet is still visible in tweet bar and shouldn't be shown" );
	lh.setPosition(25);
	equal(1, lh.getTweetsInTopBar(), "There should now be 1 tweet in top bar" );
	lh.setPosition(49);
	equal(1, lh.getTweetsInTopBar(), "There should now be 1 tweet in top bar" );
	lh.setPosition(100);
	equal(4, lh.getTweetsInTopBar(), "There should now be 1 tweet in top bar" );
});

test( "Get Tweets in tweet bar", function() {
	var lh = new LocationHandler(null, 10, 100, 25);
	equal(4, lh.getTweetsInTweetBar(), "Starts with 4 in tweet bar so should be size below");
	lh.setPosition(1);
	equal(5, lh.getTweetsInTweetBar(), "A tweet has snuck in the bottom");
	lh.setPosition(24);
	equal(5, lh.getTweetsInTweetBar(), "Tweet hasn't left the top yet");
	lh.setPosition(25);
	equal(4, lh.getTweetsInTweetBar(), "Perfect Tweet again");
});

test( "Get Number of Tweets in bottom bar", function() {
	var lh = new LocationHandler(null, 10, 100, 25);
	equal(6, lh.getTweetsInBottomBar(), "Starts with 4 in tweet bar so should be size below");
	lh.setPosition(1);
	equal(5, lh.getTweetsInBottomBar(), "One of the tweets in the bottom bar is now sneaking into main bar");
	lh.setPosition(25);
	equal(5, lh.getTweetsInBottomBar(), "Perfect Fit");
});

test( "Get pixel position of tweet in TweetBar", function() {
	var lh = new LocationHandler(null, 10,100,25);
	equal(0, lh.getTweetPosition(0));
	equal(25, lh.getTweetPosition(1));
});

test("Get full length of all tweets", function() {
    var bh = new BottomBarHandler(null, 0, null);
    equal(0, bh.getTotalLengthOfTweets(0));

    var tweets = new Array();
    tweets.push(new Tweet(0,"",null));
    bh.setTweets(tweets);
    equal(30, bh.getTotalLengthOfTweets(1));

    var tweets = new Array();
    tweets.push(new Tweet(0,"",null));
    tweets.push(new Tweet(1,"",null));
    bh.setTweets(tweets);
    equal(60, bh.getTotalLengthOfTweets(2));

});

test( "Get number of tweets that fit in Bottom Bar", function() {
    var rh = new RolloverIndicator();
    var bh = new BottomBarHandler(null, 0, rh);
    equal(0, bh.getNumberOfImagesToDisplay(0));

    var bh = new BottomBarHandler(null, 59, rh);
    var tweets = new Array();
    tweets.push(new Tweet(0,"",null));
    tweets.push(new Tweet(1,"",null));
    tweets.push(new Tweet(2,"",null));
    bh.setTweets(tweets);
    equal(0, bh.getNumberOfImagesToDisplay(3));

    var bh = new BottomBarHandler(null, 60, rh);
    bh.setTweets(tweets);
    equal(1, bh.getNumberOfImagesToDisplay(3));
    equal(0, bh.getNumberOfImagesToDisplay(0));

    var bh = new BottomBarHandler(null, 90, rh);
    bh.setTweets(tweets);
    equal(3, bh.getNumberOfImagesToDisplay(3));
    equal(2, bh.getNumberOfImagesToDisplay(2));
    equal(1, bh.getNumberOfImagesToDisplay(1));
    equal(0, bh.getNumberOfImagesToDisplay(0));

});