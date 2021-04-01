const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {type: String, required: true},
  rating: {type: Number, min: 1, max: 5, default: 5},
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const photoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  photoLink: {
    type: String,
    required: true
  },
  photographer: {
    type: String,
    default: "unknown"
  },
  yearTaken: {
    type: Number,
    default: function () {
      return new Date().getFullYear();
    }
  },
  location: {
    type: String,
  },  
  reviews: [reviewSchema],
  public: { 
    type: Boolean, 
    default: false 
  },
  photoOwner: {
    type: String
    // user: {
    //   type: Schema.Types.ObjectId, 
    //   ref: 'User'
    // },
    // userName: String,
    // userAvatar: String  
  }
 }, {
    timestamps: true
});

module.exports = mongoose.model('Photo', photoSchema);