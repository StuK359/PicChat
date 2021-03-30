const Photo = require('../models/photo');
const Photographer = require('../models/photographer');

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
//    .populate('photographer')
    .exec(function(err, photo) {
    // Native MongoDB syntax
     Photographer
       .find({_id: {$nin: photo.photographers}})
       .sort('name').exec(function(err, photographers) {
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
//    res.redirect(`/photos/${photo._id}`);
    res.redirect(`/photos/`);
  });
}
