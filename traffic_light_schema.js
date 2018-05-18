var mongoose = require('mongoose');
var assert = require('assert')
var Schema = mongoose.Schema ; 
var Traffic_Light_Schema = new Schema ({  
    gpsLocation: {
        type:String,
        require: true, 
    },
    junctionType: {
        type:String,
        require: true, 
    },
    locationID: {
        type:Number,
        require: true,
    },
    state : {
        type:String,
        require: true, 
    }, 
    locationName: {
        type:String,
        require: true,
    },
    trafficID : [
        {id : Number,
        lights:[],
        requests:Number},
        {id : Number,
        lights:[],
        requests:Number}
        ,
        {id : Number,
        lights:[],
        requests:Number},
        {id : Number,
         lights:[],
         requests:Number}]
});

var TrafficLight = mongoose.model('traffic_Light',Traffic_Light_Schema);
module.exports = TrafficLight ;