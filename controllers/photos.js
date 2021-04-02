const Photo = require('../models/photo');

module.exports = {
  index,
  show,
  new: newPhoto,
  create,
  update,
  delete: deletePhoto
};

function index(req, res) {
  Photo.find({}, function(err, photos) {
    res.render('photos/index', { title: 'All Photos', photos });
  });
}

function show(req, res) {
  Photo.findById(req.params.id)
     .exec(function(err, photo) {
    // Native MongoDB syntax
       res.render('photos/show', { title: 'Photo Details', photo });
    });     
};

function newPhoto(req, res) {
  res.render('photos/new', { title: 'Add Photo' });
}

function create(req, res) {
  // ensure empty inputs are removed so that model's default values will work
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const photo = new Photo(req.body);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  photo.save(function(err) {
    if (err) return res.redirect('/photos/');
    res.redirect(`/`);
  });
}

function index(req, res) {
  Photo.find({}, function(err, photos) {
    if(req.query.edit) {
      res.render('photos/index', { title: 'All Photos', photos, editId: req.query._id, edit: true });
    } else {
      res.render('photos/index', { title: 'All Photos', photos, edit: false });
    }
  });
}

function deletePhoto(req, res) {
  Photo.findOneAndDelete(
    {_id: req.params.id}, function(err) {
      if (err) return next (err);
      res.redirect('/photos/');
    });
}
 
function update(req,res) {
    Photo.findById(req.params.id, req.body.photo);
    photo.save(function(err) {
      if (err) return res.redirect('/photos/');
      res.redirect(`/`);
    });
    res.redirect('/photos/');
}
