require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
// console.log(spotify);

var axios = require('axios');

var command = process.argv[2];
if (command==="concert-this") {
    concertThis(process.argv[3]);
};

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


