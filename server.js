var MongoClient = require('mongodb').MongoClient ;
var mongoose = require('mongoose');
var assert = require('assert')

var Locations = require('./schema.js');
var Users = require('./user_schema.js');

var messages = [{text: 'some text', owner: 'sdsd'}, {text: 'other message', owner: 'ssd'}];
var data = '' ;

var url = 'mongodb://localhost:27017/test';
// var url = 'mongodb://localhost:27017/vtraffic';

mongoose.connect(url);

var db = mongoose.connection ; 

db.on('error',console.error.bind(console, 'connection error'));
db.on('open',function(){
    console.log('connected');
});

// var newLocation = Locations({
//     gpsLocation : 6,
//     routeID : 4,
//     locationID :212
// })


// newLocation.save(function(err){
//     if(err) throw err;

//     Locations.find({},function(err,data){
//         if(err) throw err ;
//         console.log(data);
//     })
// })




var setMessage = function (req, res) {
    res.status(200);
    data = messages;
    res.json(datas);
}


var data = function (req, res) {
    MongoClient.connect(url, function(err,db){
        assert.equal(err,null);
        console.log("connected..")

        // var collection = db.getCollectionNames();
        db.listCollections().toArray(function(err, collInfos) {
            assert.equal(err,null);
            console.log("found : ")
            console.log(collInfos);
        })
    });

    res.status(200);
    data = 'connected';
    res.json(datas);
}

var dataMongoo = function (req, res) {
    Locations.find({},function(err,data){
        if(err) throw err ;
        console.log(data);
        res.status(200);
        datas = data;
        res.json(datas);
    })
}

var addUser = function (req, res) {
    var newUser = Users({
    name :   req.body.name ,
    password :  req.body.password,
    email : req.body.password,
    mobile_number : req.body.mobile
    })

    newUser.save(function(err){
    if(err) throw err;

    Users.find({},function(err,dataUser){
        if(err) throw err ;
        console.log('user'+data);
        res.status(200);
        data = dataUser;
        res.json(data);
        })
    })
}

var showUsers = function (req, res) {
    Users.find({},function(err,dataShUser){
        if(err) throw err ;

        var user = {} ; 
        var users = [] ; 

        res.status(200);
        for(var i = 0 ; i < data.length; i++){
             console.log('user : '+dataShUser[i].name);
            user.name = dataShUser[i].name ;
            users.push(users);
        }
     
        data = dataShUser[1].name;
        res.json(users);
        })
}


var authentication = function (req, res) {
    var name = req.body.name ;
    var ps = req.body.password ; 
    Users.find({name: name ,password: ps },function(err,dataShUser){
        if(err) console.log(err);
        // throw err ;

       if(dataShUser.length != 0 ){
        console.log('user : '+dataShUser[0].name);
        data = dataShUser[0].name;
        msg = "Logged In";
       }else{
        msg = "Credentials Invalid";
        console.log("Credentials Invalid");
       }

     
        res.status(200);
     
        res.json(data + " : "+ msg);
        })
}


var locationData = function (req, res) {

    locationId = req.body.locationID ;
    gpsLocation = req.body.gpsLocation ;
    routeID = req.body.routeID ;

    res.status(200);
    datas = 'Location - '+locationId+"  gpsLocation -"+gpsLocation+"  routeID - "+routeID;
    res.json(datas);
}


module.exports.SetMessage = setMessage;
module.exports.DataDB = data; 
module.exports.DataMongoo = dataMongoo; 
module.exports.LocationData = locationData;
module.exports.AddUser = addUser; 
module.exports.ShowUsers = showUsers;
module.exports.Authentication = authentication; 