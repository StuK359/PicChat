const Movie = require('../models/movie');
const Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newMovie,
  create
};

function index(req, res) {
  Movie.find({}, function(err, movies) {
    res.render('movies/index', { title: 'All Movies', movies });
  });
}

function show(req, res) {
  Movie.findById(req.params.id)
    .populate('cast')
    .exec(function(err, movie) {
      // Native MongoDB syntax
      Performer
        .find({_id: {$nin: movie.cast}})
        .sort('name').exec(function(err, performers) {
          res.render('movies/show', { title: 'Movie Detail', movie, performers });
        });
    });
}

function newMovie(req, res) {
  res.render('movies/new', { title: 'Add Movie' });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // ensure empty inputs are removed so that model's default values will work
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const movie = new Movie(req.body);
  movie.save(function(err) {
    if (err) return res.redirect('/movies/new');
    res.redirect(`/movies/${movie._id}`);
  });
}
