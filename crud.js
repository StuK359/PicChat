require('./config/database')
const Photo = require('./models/photo');
const photographer = require('./models/photographer');

let p;

Photo.findOne({}, function(err, photo) {
  p = photo;
});