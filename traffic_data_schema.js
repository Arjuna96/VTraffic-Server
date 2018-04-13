var mongoose = require('mongoose');
var assert = require('assert')
var Schema = mongoose.Schema ; 
var Traffic_Data_Schema = new Schema ({  
    gpsLocation: {
        type:String,
        require: true, 
    },
    // stateData: [{
    //     state: Number,
    //     reqCount : Number
    // }],
    stateData: {
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