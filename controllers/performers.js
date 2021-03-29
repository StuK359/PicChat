const Performer = require('../models/performer');
const Movie = require('../models/movie');

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

function addToCast(req, res) {
  // Obtain the movie
  Movie.findById(req.params.movieId, function(err, movie) {
    // Push the _id of the performer into the movie's cast array
    movie.cast.push(req.body.performerId);
    // Save the movie
    movie.save(function(err) {
      // Redirect back to the movie show route
      res.redirect(`/movies/${movie._id}`);
    });
  });
}

function create(req, res) {
  // Need to "fix" date formatting to prevent day off by 1
  // This is due to the <input type="date"> returning the date
  // string in this format:  "YYYY-MM-DD"
  // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
  const s = req.body.born;
  req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  Performer.create(req.body, function (err, performer) {
    res.redirect('/performers/new');
  });
}

function newPerformer(req, res) {
  Performer
    .find({})
    .sort('name')
    .exec(function (err, performers) {
      res.render('performers/new', {
        title: 'Add Performer',
        performers
      });
  });
}