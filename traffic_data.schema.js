var mongoose = require('mongoose');
var assert = require('assert')
var Schema = mongoose.Schema ; 
var Traffic_Data_Schema = new Schema ({  
    TL1: {
        type:Number,
        require: true, 
    },
    TL2: {
        type:Number,
        require: true, 
    },
    TL3: {
        type:Number,
        require: true, 
    },
    TL4: {
        type:Number,
        require: true, 
    },
    TL5: {
        type:Number,
        require: true, 
    },
    TL6: {
        type:Number,
        require: true, 
    },
    TL7: {
        type:Number,
        require: true, 
    },
    TL8: {
        type:Number,
        require: true, 
    },
    LocationID: {
        type:Number,
        require: true, 
    },
    Time: {
        type:Number,
        require: true,
    }
});

var Traffic_Data = mongoose.model('Traffic_Data',Traffic_Data_Schema);
module.exports = Traffic_Data ;