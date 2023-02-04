const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  description: String,
  likes: {
    type: Number,
    default: 0,
    min: 0
  },
  date: {
  },
  image: {
    type :String,
  
  }
});


const insta_post = mongoose.model('instafinal', userSchema);

 module.exports = insta_post