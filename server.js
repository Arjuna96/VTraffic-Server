// var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var assert = require('assert')

var TrafficLight = require('./traffic_light_schema.js');
var Users = require('./user_schema.js');
var Traffic_Data = require('./traffic_data_schema.js');

var messages = [{ text: 'some text', owner: 'shanil' }, { text: 'other message', owner: 'arjuna' }];
var data = '';

var db_url = 'mongodb://localhost:27017/test';
// var db_url = 'mongodb://localhost:27017/vtraffic';

mongoose.connect(db_url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.on('open', function () {
    console.log('connected');
});

// adding a new traffic light
var addNewTrafficLight = function (req, res) {

    if (req.body.locationID != undefined &&
        req.body.gpsLocation != undefined &&
        req.body.routeID != undefined
    ) {
        var locationId = req.body.locationID;
        var gpsLocation = req.body.gpsLocation;
        var routeID = req.body.routeID;
        var ref = '-'

        var newTrafficLight = TrafficLight({
            gpsLocation: gpsLocation,
            currentState: routeID,
            locationID: locationId,
            stateRef: ref
        })


        newTrafficLight.save(function (err) {
            if (err) throw err;

            Locations.find({}, function (err, data) {
                if (err) throw err;
                console.log(data);
            })
        })

        res.status(200);
        data = { Status: 'Success' };
        res.json(data);
    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }


}

// show traffic light data
var showTrafficLightLocation = function (req, res) {

    var locationId = req.body.locationID;

    if (locationId != undefined) {
        var findStr = { locationID: locationId };
    } else {
        var findStr = {};
    }


    TrafficLight.find(findStr, function (err, data) {
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

    if (req.body.firstName != undefined &&
        req.body.lastName != undefined &&
        req.body.password != undefined &&
        req.body.email != undefined &&
        req.body.userRole != undefined &&
        req.body.mobile != undefined
    ) {
        var newUser = Users({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            userRole: req.body.userRole,
            mobile: req.body.mobile
        })

        newUser.save(function (err) {
            if (err) throw err;

            Users.find({}, function (err, dataUser) {
                if (err) throw err;
                console.log('user' + dataUser);
                res.status(200);
                data = { Status: 'Success' };
                res.json(data);
            })
        })
    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }

}

// update user
var updateUser = function (req, res) {

    if (req.body.editName != undefined &&
        req.body.name != undefined &&
        req.body.password != undefined &&
        req.body.email != undefined &&
        req.body.vehical != undefined) {
        var editName = req.body.editName;
        var name = req.body.name;
        var password = req.body.password;
        var email = req.body.email;
        var vehical = req.body.vehical;

        var query = { 'name': editName }

        Users.update(query, { $set: { name: name } }, function (err, dataUser) {
            if (err) throw err;
            console.log('user' + data);
            res.status(200);
            data = dataUser;
            res.json({ Status: 'Success' });
        })
    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }
}

// show current users
var showUsers = function (req, res) {

    if (req.body.username != undefined) {
        var user = req.body.username;
        // var email = req.body.email ;
        console.log('user' + user);
        if (user != undefined) {
            var findStr = { name: user };
            console.log('user if' + user);

            Users.find(findStr, function (err, dataShUser) {
                if (err) throw err;

                var user = {};
                var users = [];

                console.log('data' + dataShUser);
                res.status(200);
                for (var i = 0; i < dataShUser.length; i++) {
                    console.log('user : ' + dataShUser[i].name);
                    user.name = dataShUser[i].name;
                    users.push(users);
                }

                // if no user data is returned from db
                if (dataShUser != '') {
                    data = { Status: dataShUser[0].name };
                    res.json(data);
                } else {
                    data = { Status: 'User Does not exist' };
                    res.json(data);
                }

            })
        }
        // else if(email != undefined){
        //     var findStr = {email : email} ;
        // }else if(user != undefined && email != undefined ){
        //     var findStr = {name : user , email : email} ;
        // }
        else {
            var findStr = {};
            console.log('else');

            res.status(200);
            data = { Status: 'User Does not exist' };
            res.json(data);
        }
    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }

}

// user login
var authentication = function (req, res) {
    if (req.body.username != undefined && req.body.password != undefined) {
        var name = req.body.username;
        var ps = req.body.password;
        Users.find({ name: name, password: ps }, function (err, dataShUser) {
            if (err) console.log(err);
            // throw err ;

            if (dataShUser.length != 0) {
                console.log('user : ' + dataShUser[0].name);
                data = dataShUser[0].name;
                // msg = "Logged In";
                msg = { Status: 'Success' };
            } else {
                // msg = "Credentials Invalid";
                msg = { Status: 'Failed' };
                console.log("Credentials Invalid");
            }

            res.status(200);
            res.json(msg);
        })
    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }

}

// user location

//not using location data function now
var locationData = function (req, res) {

    if (req.body.trafficLightId != undefined &&
        req.body.userlongitude != undefined &&
        req.body.userlatitude != undefined &&
        req.body.routeId != undefined
    ) {
        locationId = req.body.trafficLightId;
        // locationId = 1 ;
        // gpsLocation = req.body.gpsLocation;
        gpsLocation = req.body.userlongitude + "," + req.body.userlatitude;
        routeID = req.body.routeId; // button ID

        var newReq = TrafficLight({
            gpsLocation: gpsLocation,
            routeID: routeID,
            locationID: locationId
        })


        newReq.save(function (err) {
            if (err) throw err;

            TrafficLight.find({}, function (err, data) {
                if (err) throw err;
                console.log(data);
            })
        })

        console.log('go green ' + JSON.stringify(req.body));
        res.status(200);
        // datas = {'Location':  locationId ,'gpsLocation (longitude + latitude )' : "( "+ req.body.userlongitude + " & " +req.body.userlatitude+ " )" , 'routeID'  : routeID};
        datas = { Status: "success" };
        res.json(datas);
    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }
}

// api for arduino
var sendMsgToArduino = function (req, res) {

    if (req.body.TL) {
        var TL = req.body.TL;

        res.status(200);
        // datas = 'Change State of -'+TL; 
        datas = { Status: 'Change State of -' + TL };
        res.json(datas);
    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }

}

// add traffic data 

var addTrafficData = function (req, res) {
    if (req.body.trafficLightId != undefined &&
        req.body.userlongitude != undefined &&
        req.body.userlatitude != undefined &&
        req.body.routeId != undefined
    ) {
        locationId = req.body.trafficLightId;
        // locationId = 1 ;
        // gpsLocation = req.body.gpsLocation;
        gpsLocation = req.body.userlongitude + "," + req.body.userlatitude;
        routeID = req.body.routeId; // button ID

        var newTrafficData = Traffic_Data({
            gpsLocation: gpsLocation,
            stateData: 1,
            LocationID: req.body.LocationId,
            Time: 1,
            trafficID: [{
                id: 2,
                lights: ['l1', 'l2'],
                requests: 10
            }]
            // ObjectId.getTimestamp() 
        })

        newTrafficData.save(function (err) {
            if (err) throw err;

            Traffic_Data.find({}, function (err, traffData) {
                if (err) throw err;
                // console.log('user' + traffData);
                console.log('go green ' + JSON.stringify(req.body));
                res.status(200);
                // datas = {'Location':  locationId ,'gpsLocation (longitude + latitude )' : "( "+ req.body.userlongitude + " & " +req.body.userlatitude+ " )" , 'routeID'  : routeID};
                datas = { Status: "success" };
                res.json(datas);
            })
        })

    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }
}

// req time api 
var requestTime = function (req, res) {
    if (req.body.trafficLightId != undefined && req.body.stateId != undefined) {
        var locationId = req.body.trafficLightId;
        var stateId = req.body.stateId;

        Traffic_Data.find({ locationID: locationId }, function (err, requests) {
            if (err) throw err;
            var reqCount = requests.length;
            console.log('reqCount' + reqCount);
        })

        var resObj = { Id: locationId, state: stateId, time: 100 }
        console.log(JSON.stringify(resObj));
        res.status(200).json(resObj);
    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }

}

// update current state api
var updateState = function (req, res) {
    if (req.body.trafficLightId != undefined && req.body.stateId != undefined) {
        var locationId = req.body.trafficLightId;
        var stateId = req.body.stateId;
        var resObj = "Success"
        console.log(JSON.stringify(resObj));
        res.status(200).json(resObj);
    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }

}

var resetTrafficData = function (req, res) {
    Traffic_Data.remove({}, function (err, resp) {
        if (err) throw err;
        // console.log('res'+resp);
        var resObj = "Success"
        res.status(200).json(resObj);
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
module.exports.AddTrafficData = addTrafficData;
module.exports.RequestTime = requestTime;
module.exports.UpdateState = updateState;
module.exports.ResetTrafficData = resetTrafficData;