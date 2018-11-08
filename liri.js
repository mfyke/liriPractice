var keys = require("./keys.js");
var Twitter = require("twitter");
var client = new Twitter (keys.twitterkeys);
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify (keys.spotifyKeys);
var fs = require("fs");
var func = process.argv[2];
var search="";
for(var i=3; i<process.argv.length;i++) {
	search+=process.argv[i] + " ";
}
var liri = function() {
	switch(func) {
		// if myTweets is typed in use twitter npm package to make a twitter api call and get the tweets, then display them in the console
		case "myTweets":
			console.log("tweets showing");
			var params = {screen_name: 'ShreksDawg', count: "20"};
			client.get('statuses/user_timeline', params, function(error, tweets, response) {
				console.log(error);
	  			if (!error) {
	  				for(var i=0;i<tweets.length;i++){
	    			console.log(tweets[i].text);
	    			}
	  			}
			});
			break;
		// if spotifyThisSong is typed then use spotify npm package to make a spotify api call with the name of the song
		case "spotifyThisSong":
			console.log("spotifying this song");
			if (search == "") {
				spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
		    		if ( err ) {
		        		console.log('Error occurred: ' + err);
		        		return;
		    		}
		 		
			    	// Do something with 'data'

			    	console.log(data.tracks.items[8].artists[0].name);
			    	console.log(data.tracks.items[8].name);
			    	console.log(data.tracks.items[8].preview_url);
			    	console.log(data.tracks.items[8].album.name);
				});
			}
			else{
				spotify.search({ type: 'track', query: search }, function(err, data) {
		    		if ( err ) {
		        		console.log('Error occurred: ' + err);
		        		return;
		    		}
		 		
		    	// Do something with 'data'
		    	console.log(data.tracks.items[0].artists[0].name);
		    	console.log(data.tracks.items[0].name);
		    	console.log(data.tracks.items[0].preview_url);
		    	console.log(data.tracks.items[0].album.name);

				});
			}
			break;
		case "movieThis":
			console.log("movie this initiated!");
			if(process.argv.length<4) {
				search="Mr Nobody"
			}
			request("http://www.omdbapi.com?t=" + search + "&y=&plot=short&r=json&apikey=c524887e", function(error, response, body) {
				console.log(JSON.parse(body).Title);
				console.log(JSON.parse(body).Year);
				console.log(JSON.parse(body).imdbRating);
				console.log(JSON.parse(body).Ratings[1].Value);
				console.log(JSON.parse(body).Country);
				console.log(JSON.parse(body).Language);
				console.log(JSON.parse(body).Plot);
	    		console.log(JSON.parse(body).Actors);

			});	
			break;
		case "doWhatItSays":
			console.log("doing what it says");
			fs.readFile('random.txt', "utf8", function(err,data){
				console.log(data);
				var contents = data.split(",");
				func=contents[0];
				search=contents[1];
				liri();
			});
			break;
		default:
			console.log("what is this command? Try one of these: myTweets, spotifyThisSong + the song name, movieThis + the movie name, or doWhatItSays for a random command!");
			break;	
	}
}
liri();