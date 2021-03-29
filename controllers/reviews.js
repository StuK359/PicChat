const Movie = require('../models/movie');

module.exports = {
  create,
  delete: deleteReview
};

// Include the next parameter - used for error handling in the catch
function deleteReview(req, res, next) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Movie.findOne({'reviews._id': req.params.id}).then(function(movie) {
    // Find the review subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const review = movie.reviews.id(req.params.id);
    // Ensure that the review was created by the logged in user
    if (!review.user.equals(req.user._id)) return res.redirect(`/movies/${movies._id}`);
    // Remove the review using the remove method of the subdoc
    review.remove();
    // Save the updated movie
    movie.save().then(function() {
      // Redirect back to the movie's show view
      res.redirect(`/movies/${movie._id}`);
    }).catch(function(err) {
      // Let Express display an error
      return next(err);
    });
  });
}

function create(req, res) {
  // Find the movie to embed the review within
  Movie.findById(req.params.id, function(err, movie) {
    // Add the user-centric info to req.body
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Push the subdoc for the review
    movie.reviews.push(req.body);
    // Always save the top-level document (not subdocs)
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`);
    });
  });
}