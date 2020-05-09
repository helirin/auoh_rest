const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// tietomalli
const schema = new Schema({
    name: {
        type: String, 
        required: true, 
        index: {
            unique: false  
        }
  },
     material1: {
      type: String,
      required: true
    },
     cutting_speed: {
        type: Number,
        required: true
      },

      feed_rate: {
        type: Number,
        required: true
      }

  
});

module.exports = mongoose.model("material", schema);