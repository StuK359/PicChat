const Performer = require('../models/performer');
const Photo = require('../models/photo');

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

function addToCast(req, res) {
  // Obtain the photo
  Photo.findById(req.params.photoId, function(err, photo) {
    // Push the _id of the performer into the photo's photographer array
    photo.cast.push(req.body.performerId);
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
        title: 'Add Photographer',
        performers
      });
  });
}