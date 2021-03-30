const Photo = require('../models/photo');
const Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newPhoto,
  create
};

function index(req, res) {
  Photo.find({}, function(err, photos) {
    res.render('photos/index', { title: 'All Photos', photos });
  });
}

function show(req, res) {
  Photo.findById(req.params.id)
//    .populate('cast')
    .exec(function(err, photo) {
    // Native MongoDB syntax
     Performer
       .find({_id: {$nin: photo.cast}})
       .sort('name').exec(function(err, performers) {
         res.render('photos/show', { title: 'Photo Details', photo });
       });
    })     
};


function newPhoto(req, res) {
  res.render('photos/new', { title: 'Add Photo' });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
//  req.body.nowShowing = !!req.body.nowShowing;
  // ensure empty inputs are removed so that model's default values will work
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const photo = new Photo(req.body);
  photo.save(function(err) {
    if (err) return res.redirect('/photos/new');
    res.redirect(`/photos/${photo._id}`);
  });
}
