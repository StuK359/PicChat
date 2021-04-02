const Photo = require('../models/photo');

module.exports = {
  create,
  update,
  delete: deleteReview
};

// Include the next parameter - used for error handling in the catch
function deleteReview(req, res, next) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Photo.findOne({'reviews._id': req.params.id}).then(function(photo) {
    // Find the review subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const review = photo.reviews.id(req.params.id);
    // Ensure that the review was created by the logged in user
    if (!review.user.equals(req.user._id)) return res.redirect(`/photos/${photos._id}`);
    // Remove the review using the remove method of the subdoc
    review.remove();
    // Save the updated photo
    photo.save().then(function() {
      // Redirect back to the photo's show view
      res.redirect(`/photos/${photo._id}`);
    }).catch(function(err) {
      // Let Express display an error
      return next(err);
    });
  });
}

function create(req, res) {
  // Find the photo to embed the review within
  Photo.findById(req.params.id, function(err, photo) {
    // Add the user-centric info to req.body
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Push the subdoc for the review
    photo.reviews.push(req.body);
    // Always save the top-level document (not subdocs)
    photo.save(function(err) {
      res.redirect(`/photos/${photo._id}`);
    });
  });
}

function update(req, res) {
     // Find the photo to embed the review within
  Photo.review.findById(req.params.id, function(err, photo) {
    // Always save the top-level document (not subdocs)
    photo.save(function(err) {
      res.redirect(`/photos/${photo._id}`);
    });
  });
}