const Photographer = require('../models/photographer');
const Photo = require('../models/photo');

module.exports = {
  new: newPhotographer,
  create,
  addToPhotographer
};

function addToPhotographer(req, res) {
  // Obtain the photo
  Photo.findById(req.params.photoId, function(err, photo) {
    // Push the _id of the photographer into the photo's photographer field
    photo.photographer = req.body.photographerId;
    // Save the photo
    photo.save(function(err) {
      // Redirect back to the photo show route
      res.redirect(`/photos/${photo._id}`);
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
  photographer.create(req.body, function (err, photographer) {
    res.redirect('/photographer/new');
  });
}

function newPhotographer(req, res) {
  photographer
    .find({})
    .sort('name')
    .exec(function (err, photographers) {
      res.render('photographers/new', {
        title: 'Add Photographer',
        photographers
      });
  });
}