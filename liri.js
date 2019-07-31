require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require('file-system');

var spotify = new Spotify(keys.spotify);
// console.log(spotify);

var axios = require('axios');

var command = process.argv[2];
var term = process.argv.slice(3).join(" ");

//COMMAND LOGIC

if (command === "concert-this") {
concertThis(term);
}   else if (command === "spotify-this-song") {
    spotifyThis(term);
}   else if (command === "movie-this") {
    movieThis(term);
}   else if (command === "do-what-it-says") {
    doWhatItSays(term);
}

function concertThis(artist) {

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=6e448e5f65047313d906d08b6ec4c016")
    .then(function (response) {
        // handle success
        var data = response.data;
        data.forEach(function(e){
            console.log("Venue: " + e.venue.name);
            console.log("City: " + e.venue.city + " Country: " + e.venue.country);
            console.log(moment(e.datetime).format('L') + "\n");
        })
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
};

function spotifyThis(song = "The Sign") {
    spotify.search({ type: 'track', query: song, limit: 10}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        };
        var songResults = data.tracks.items;
        //SET UP ARRAYS TO STORE MY RESPONSES FROM THE VARIOUS LEVELS OF THE REPONSE OBJECT
        var albums = [];
        var artists = [];
        var links = [];
        var songNames = [];
        //LOOP THROUGH EACH ITEM TO FIND EMBEDDED INFO ABOUT EACH RESULTING TRACK
        songResults.forEach(function(e){         
            if(e.name === song) {
                songNames.push(e.name);
                albums.push(e.album.name);
                links.push(e.preview_url);
                e.artists.forEach(function(e){
                    artists.push(e.name);
                });
            };
        });
        for (var i = 0; i<albums.length; i++) {
            console.log("Song Name: " + songNames[i] + "\n" + "Artist: " + artists[i] + "\n" + "Album: " + albums[i] + "\n" + "Preview Link: " + links[i]  + "\n\n");
        };
    });
};

function movieThis(movie = 'Mr. Nobody') {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
    .then(function (response) {
        // handle success
        var data = response.data;
        console.log("Title: " + data.Title);
        console.log("Year: " + data.Year);
        console.log("Rating: " + data.Rated);
        data.Ratings.forEach(function(e){
            if (e.Source === "Rotten Tomatoes") {
                console.log("Rotten Tomatoes: " + e.Value);
            }
        });
        console.log("Country: " + data.Country);
        console.log("Language: " + data.Language);
        console.log("Plot: " + data.Plot);
        console.log("Actors: " + data.Actors);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
    

    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.
};

function doWhatItSays (command) {
    fs.read;
}