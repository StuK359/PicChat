require('./config/database')
const Movie = require('./models/movie');
const Performer = require('./models/performer');

let m;
let p;

Movie.findOne({}, function(err, movie) {
  m = movie;
});