var mongoose = require('mongoose');
const Schema =mongoose.Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
});
var Employee=mongoose.model('employDB',Schema);
module.exports={Employee};