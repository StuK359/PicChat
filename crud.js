require('./config/database')
const Photo = require('./models/photo');


let p;

Photo.findOne({}, function(err, photo) {
  p = photo;
});