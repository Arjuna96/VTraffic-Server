var mongoose = require('mongoose');
var assert = require('assert')
var Schema = mongoose.Schema ; 
var Traffic_Light_Schema = new Schema ({  
    gpsLocation: {
        type:String,
        require: true, 
    },
    currentState: {
        type:Number,
        require: true, 
    },
    locationID: {
        type:Number,
        require: true,
    },
    stateRef: {
        type:String,
        require: true, 
    }
});

var TrafficLight = mongoose.model('traffic_Light',Traffic_Light_Schema);
module.exports = TrafficLight ;