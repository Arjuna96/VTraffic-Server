var mongoose = require('mongoose');
var assert = require('assert')
var Schema = mongoose.Schema ; 
var UserSchema = new Schema ({  
    firstName: {
        type:String,
        require: true
    },
    lastName: {
        type:String,
        require: true
    },
    password: {
        type:String,
        require: true
    },
    email: {
        type:String,
        require: true
    },
    userRole: {
        type:String,
        require: true
    },
    mobile: {
        type:Number
    },
});

var Users = mongoose.model('user',UserSchema);
module.exports = Users ;