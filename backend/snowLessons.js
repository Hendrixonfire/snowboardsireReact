

const mongoose = require('mongoose');
const snowlesson = new mongoose.Schema({
  
    lessonType:String,
    lessonDate: String,
    lessonDescription:String,
    lessonUsers:Array
       
    

});

module.exports = mongoose.model('Snowlesson', snowlesson)