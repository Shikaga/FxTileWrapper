
test( "Get Tweets in top bar", function() {
	var lh = new LocationHandler(10, 100, 25);
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
	var lh = new LocationHandler(10, 100, 25);
	equal(4, lh.getTweetsInTweetBar(), "Starts with 4 in tweet bar so should be size below");
	lh.setPosition(1);
	equal(5, lh.getTweetsInTweetBar(), "A tweet has snuck in the bottom");
	lh.setPosition(24);
	equal(5, lh.getTweetsInTweetBar(), "Tweet hasn't left the top yet");
	lh.setPosition(25);
	equal(4, lh.getTweetsInTweetBar(), "Perfect Tweet again");
});

test( "Get Tweets in bottom bar", function() {
	var lh = new LocationHandler(10, 100, 25);
	equal(6, lh.getTweetsInBottomBar(), "Starts with 4 in tweet bar so should be size below");
	lh.setPosition(1);
	equal(5, lh.getTweetsInBottomBar(), "One of the tweets in the bottom bar is now sneaking into main bar");
	lh.setPosition(25);
	equal(5, lh.getTweetsInBottomBar(), "Perfect Fit");
});

test( "Get Tweets in bottom bar", function() {
	var lh = new LocationHandler(10,100,25);
	equal(0, lh.getTweetPosition(0));
	equal(25, lh.getTweetPosition(1));
});