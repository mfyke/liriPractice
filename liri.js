var keys = require("./keys.js");
var Twitter = require("twitter");
var client = new Twitter (keys.twitterkeys);
var request = require("request");
var spotify = require("spotify");
var fs = require("fs");
var func = process.argv[2];
var search="";
for(var i=3; i<process.argv.length;i++) {
	search+=process.argv[i] + " ";
}
console.log(search);
