var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var assert = require('assert')

var Locations = require('./traffic_light_schema.js');
var Users = require('./user_schema.js');
var Traffic_Data = require('./traffic_data.schema.js');

var messages = [{ text: 'some text', owner: 'shanil' }, { text: 'other message', owner: 'arjuna' }];
var data = '';

var url = 'mongodb://localhost:27017/test';
// var url = 'mongodb://localhost:27017/vtraffic';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.on('open', function () {
    console.log('connected');
});

// adding a new traffic light
var addNewTrafficLight = function (req, res) {

    var locationId = req.body.locationID;
    var gpsLocation = req.body.gpsLocation;
    var routeID = req.body.routeID;

    var newLocation = Locations({
        gpsLocation: gpsLocation,
        routeID: routeID,
        locationID: locationId
    })


    newLocation.save(function (err) {
        if (err) throw err;

        Locations.find({}, function (err, data) {
            if (err) throw err;
            console.log(data);
        })
    })

    res.status(200);
    data = messages;
    res.json(datas);
}

// show traffic light data
var showTrafficLightLocation = function (req, res) {

    var locationId = req.body.locationID ;

    if(locationId != undefined){
        var findStr = {locationID: locationId} ; 
    }else{
        var findStr = {} ; 
    }
  

        Locations.find(findStr, function (err, data) {
            if (err) throw err;
            console.log(data);
            res.status(200);
            res.json(data);
        })
}


// test function
var setMessage = function (req, res) {
    res.status(200);
    data = messages;
    res.json(data);
}

// add  new user
var addUser = function (req, res) {
    var newUser = Users({
        name: req.body.name,
        password: req.body.password,
        email: req.body.password,
        mobile_number: req.body.mobile
    })

    newUser.save(function (err) {
        if (err) throw err;

        Users.find({}, function (err, dataUser) {
            if (err) throw err;
            console.log('user' + data);
            res.status(200);
            data = dataUser;
            res.json(data);
        })
    })
}

// update user
var updateUser = function (req, res) {
    
        var editName = req.body.editName ;
        var name =  req.body.name ;
        var password =  req.body.password ;
        var email = req.body.password ;
        var mobile_number = req.body.mobile ; 

        var query = {'name': editName}

        Users.update(query, { $set: { name: name }}, function (err, dataUser){
            if (err) throw err;
            console.log('user' + data);
            res.status(200);
            data = dataUser;
            res.json(data);
        })

}

// show current users
var showUsers = function (req, res) {
    var user = req.body.name ;
    var email = req.body.email ;

    if(user != undefined){
        var findStr = {name : user} ;
    }else if(email != undefined){
        var findStr = {email : email} ;
    }else if(user != undefined && email != undefined ){
        var findStr = {name : user , email : email} ;
    }else{
        var findStr = {} ;
    }
    
    Users.find(findStr, function (err, dataShUser) {
        if (err) throw err;

        var user = {};
        var users = [];

        res.status(200);
        for (var i = 0; i < data.length; i++) {
            console.log('user : ' + dataShUser[i].name);
            user.name = dataShUser[i].name;
            users.push(users);
        }

        data = dataShUser[1].name;
        res.json(users);
    })
}

// user login
var authentication = function (req, res) {
    var name = req.body.name;
    var ps = req.body.password;
    Users.find({ name: name, password: ps }, function (err, dataShUser) {
        if (err) console.log(err);
        // throw err ;

        if (dataShUser.length != 0) {
            console.log('user : ' + dataShUser[0].name);
            data = dataShUser[0].name;
            msg = "Logged In";
        } else {
            msg = "Credentials Invalid";
            console.log("Credentials Invalid");
        }

        res.status(200);
        res.json(data + " : " + msg);
    })
}

// user location
var locationData = function (req, res) {

    locationId = req.body.locationID;
    // gpsLocation = req.body.gpsLocation;
    gpsLocation = req.body.longitude + ","+ req.body.latitude ;
    routeID = req.body.routeID;

    res.status(200);
    datas = 'Location - ' + locationId + "  gpsLocation -" + gpsLocation + "  routeID - " + routeID;
    res.json(datas);
}


// api for arduino
var sendMsgToArduino = function(req,res){
    var TL = req.body.TL ;
    
    res.status(200);
    datas = 'Change State of -'+TL;
    res.json(datas);
}

// add traffic data 
var addTrafficData = function (req, res) {
    var newTrafficData = Traffic_Data({
        TL1: req.body.TL1,
        TL2: req.body.TL2,
        TL3: req.body.TL3,
        TL4: req.body.TL4,
        TL5: req.body.TL5,
        TL6: req.body.TL6,
        TL7: req.body.TL7,
        TL8: req.body.TL8,
        LocationID : req.body.LocationID,
        Time: ObjectId.getTimestamp() 
    })

    newTrafficData.save(function (err) {
        if (err) throw err;

        Traffic_Data.find({}, function (err, traffData) {
            if (err) throw err;
            console.log('user' + data);
            res.status(200);
            data = traffData;
            res.json(data);
        })
    })
}

module.exports.SetMessage = setMessage;
module.exports.LocationData = locationData;
module.exports.AddUser = addUser;
module.exports.ShowUsers = showUsers;
module.exports.Authentication = authentication; 
module.exports.ShowTrafficLightLocation = showTrafficLightLocation;  
module.exports.AddNewTrafficLight = addNewTrafficLight;  
module.exports.UpdateUser = updateUser; 
module.exports.SendMsgToArduino = sendMsgToArduino;