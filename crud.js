require('./config/database')
const Photo = require('./models/photo');
const Performer = require('./models/performer');

let p;

Photo.findOne({}, function(err, photo) {
  p = photo;
});