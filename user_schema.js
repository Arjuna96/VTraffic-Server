var mongoose = require('mongoose');
var assert = require('assert')
var Schema = mongoose.Schema ; 
var UserSchema = new Schema ({  
    name: {
        type:String,
        require: true, 
        unique:true
    },
    password: {
        type:String,
        require: true, 
    },
    email: {
        type:String,
        require: true, 
    },
    mobile_number: {
        type:Number,
        require: true, 
    }
});

var Users = mongoose.model('user',UserSchema);
module.exports = Users ;