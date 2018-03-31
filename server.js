var MongoClient = require('mongodb').MongoClient ;
var assert = require('assert')

var messages = [{text: 'some text', owner: 'sdsd'}, {text: 'other message', owner: 'ssd'}];
var data = '' ;

var url = 'mongodb://localhost:27017/test';

var setMessage = function (req, res) {
    res.status(200);
    datas = messages;
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
    datas = 'connected';
    res.json(datas);
}



var locationData = function (req, res) {

    // data from test.html

    // name = req.body.name ; 
    // email = req.body.email ;

    locationId = req.body.LocationID ;
    gpsLocation = req.body.gpsLocation ;
    routeID = req.body.routeID ;

    res.status(200);
    datas = 'Location'+locationId+"gpsLocation"+gpsLocation+"routeID"+routeID;
    // datas = "name : "+name+"  email : "+email ; 
    res.json(datas);
}


module.exports.SetMessage = setMessage;
module.exports.Data = data;
module.exports.LocationData = locationData;