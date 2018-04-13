var mongoose = require('mongoose');
var assert = require('assert')
var Schema = mongoose.Schema ; 
var LocationSchema = new Schema ({  
    // _id : {
    //     type:Number,
    //     require: true
    // },

    gpsLocation: {
        type:String,
        require: true, 
    },
    routeID: {
        type:Number,
        require: true, 
    },
    locationID: {
        type:Number,
        require: true,
    },
});

var Locations = mongoose.model('locations',LocationSchema);
module.exports = Locations ;