const mongoose = require('mongoose');
const review = new mongoose.Schema({
  
    content: String,
    username: String
});

module.exports = mongoose.model('Review', review)