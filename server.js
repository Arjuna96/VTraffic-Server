// var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var assert = require('assert')

var TrafficLight = require('./traffic_light_schema.js');
var Users = require('./user_schema.js');
var UserDetails = require('./userDetails_schema.js');
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
        req.body.Latitude != undefined && 
        req.body.Longitude != undefined && 
        req.body.junctionType != undefined && 
        req.body.locationName != undefined
    ) {
        var locationId = req.body.locationID;
        var gpsLocation = req.body.Latitude  + "," +  req.body.Longitude;
        var junctionType = req.body.junctionType;
        var locationName =  req.body.locationName;
        // var ref = '-'

        if(junctionType == "4"){
            var newTrafficLight = TrafficLight({
                gpsLocation: gpsLocation,
                junctionType: junctionType,
                locationID: locationId,
                state: 0,
                locationName : locationName,
                trafficID: [{
                        id: 0,
                        lights: ['L1', 'L5','L7'],
                        requests: 0
                    },
                    {
                        id: 1,
                        lights: ['L2', 'L6','L8'],
                        requests: 0
                    },
                    {
                        id: 2,
                        lights: ['L3', 'L7','L9'],
                        requests: 0
                    },
                    {
                        id: 3,
                        lights: ['L4', 'L11','L10'],
                        requests: 0
                    }
                    ]
            })

        }else if(junctionType == "3"){

            var newTrafficLight = TrafficLight({
                gpsLocation: gpsLocation,
                junctionType: junctionType,
                locationID: locationId,
                state: 0,
                locationName : locationName,
                trafficID: [{
                    id: 0,
                    lights: ['L1', 'L5','L7'],
                    requests: 0
                },
                {
                    id: 1,
                    lights: ['L2', 'L6','L8'],
                    requests: 0
                },
                {
                    id: 2,
                    lights: ['L3', 'L7','L9'],
                    requests: 0
                }]
            })
        }



        newTrafficLight.save(function (err) {
            if (err) throw err;

            TrafficLight.find({}, function (err, data) {
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

    var locationId = req.body.trafficLightId;

    if (locationId != undefined && locationId != '*') {
        var findStr = { locationID: locationId };
        TrafficLight.find(findStr, function (err, data) {
            if (err) throw err;
            console.log(data);
            res.status(200);
            res.json(data);
        })
    } else if(locationId == '*') {
        var findStr = {};
        TrafficLight.find(findStr, function (err, data) {
            if (err) throw err;
            console.log(data);
            res.status(200);
            res.json(data);
        })
    }



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
        var newUser = UserDetails({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            userRole: req.body.userRole,
            mobile: req.body.mobile
        })

        newUser.save(function (err) {
            if (err) throw err;

            UserDetails.find({}, function (err, dataUser) {
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
            console.log('user' + dataUser);
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
        if (user != undefined && user != '*') {
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
                    data =  dataShUser[0].name ;
                    res.json(data);
                } else {
                    data = 'User Does not exist!' ;
                    res.json(data);
                }

            })
        }
        // else if(email != undefined){
        //     var findStr = {email : email} ;
        // }else if(user != undefined && email != undefined ){
        //     var findStr = {name : user , email : email} ;
        // }
        else if (user == '*') {
            var findStr = {};
            console.log('else');


            Users.find(findStr, function (err, dataShUser) {
                if (err) throw err;

                var user = {};
                var users = [];

                console.log('data' + dataShUser);
                res.status(200);
                data = dataShUser ;
                res.json(data);
                // res.status(200);
                // for (var i = 0; i < dataShUser.length; i++) {
                //     console.log('user : ' + dataShUser[i].name);
                //     user.name = dataShUser[i].name;
                //     users.push(users);
                // }

            })
           
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

// add traffic data  *** goGreen API ****

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
            LocationID: locationId,
            Time: 1
            // ,
            // trafficID: [{
            //     id: locationId,
            //     lights: ['L1', 'L2'],
            //     requests: 10
            // }]
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
        var stateId = (req.body.stateId).toString();

        Traffic_Data.find({ LocationID: locationId , stateData: stateId}, function (err, requests) {
            if (err) throw err;
            var reqCount = requests.length;
            console.log('req'+requests[0]);
            // console.log(requests[0].trafficID[stateId].requests);
            console.log('reqCount' + reqCount);

            var resObj = { Id: locationId, state: stateId, time: 10 }

            if(reqCount <= 25){
                resObj = { Id: locationId, state: stateId, time: 20 }
            }else if(reqCount <= 75){
                resObj = { Id: locationId, state: stateId, time: 30 }
            }else if(reqCount <= 125){
                resObj = { Id: locationId, state: stateId, time: 40 }
            }else if(reqCount <= 200){
                resObj = { Id: locationId, state: stateId, time: 60 }
            }else{
                resObj = { Id: locationId, state: stateId, time: 75 }
            }

            // switch (true) {
            //     case (reqCount < 5 )  :
            //          resObj = { Id: locationId, state: stateId, time: 30 }
            //         break;
            //     case (reqCount < 5 && reqCount > 10) :
            //           resObj = { Id: locationId, state: stateId, time: 60}
            //         break;
            //     case (reqCount < 10 && reqCount > 15):
            //          resObj = { Id: locationId, state: stateId, time: 30 }
            //         break;
            //     case (reqCount < 15 && reqCount > 20):
            //          resObj = { Id: locationId, state: stateId, time: 40 }
            //         break;
            //     case (reqCount < 20 && reqCount > 25):
            //          resObj = { Id: locationId, state: stateId, time: 50 }
            //         break;
            //     case (reqCount < 25 && reqCount > 30):
            //          resObj = { Id: locationId, state: stateId, time: 60 }
            //         break;
            //     case (reqCount < 30 && reqCount > 1000):
            //          resObj = { Id: locationId, state: stateId, time: 70 }
            // }
            
            console.log(JSON.stringify(resObj));
            res.status(200).json(resObj.time);
        })


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

        var query = { 'locationID': locationId}

        TrafficLight.update(query, { $set: { state:stateId } }, function (err, dataUser) {
            if (err) throw err;
            console.log("state updated to "+stateId);
            res.status(200);
            data = dataUser;
            res.json({ Status: 'Success' });
        })

        var queryRemove = { 'LocationID': locationId }
        Traffic_Data.remove(queryRemove, function (err, dataUser) {
            if (err) throw err;
            console.log("state removed ");
            res.status(200);
            data = dataUser;
            // res.json({ Status: 'Success' });
        })



        // var resObj = "Success"
        // console.log(JSON.stringify(resObj));
        // res.status(200).json(resObj);
    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }

}


// get current state api
var getCurrentState = function (req, res) {
    if (req.body.trafficLightId != undefined ) {
        var locationId = req.body.trafficLightId;

        TrafficLight.find({ locationID: locationId }, function (err, requests) {
            if (err) throw err;
            // var stateID = requests[0].trafficID;
            var stateID = requests[0].state;
            console.log({Current_state : stateID });
            res.status(200).json({Current_state : stateID });
        })

        // var resObj = "Success"
        // console.log(JSON.stringify(resObj));

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


// add traffic data  *** bulk goGreen API ****

var addBulkTrafficData = function (req, res) {
    if (req.body.trafficLightId != undefined &&
        req.body.userlongitude != undefined &&
        req.body.userlatitude != undefined &&
        req.body.routeId != undefined &&
        req.body.count != undefined
    ) {
        locationId = req.body.trafficLightId;
        gpsLocation = req.body.userlongitude + "," + req.body.userlatitude;
        routeID = req.body.routeId; // button ID
        count = req.body.count; 

        // updateStateNo = "trafficID"+routeID;

        // TrafficLight.update({ locationId: locationId },{$set: {updateStateNo: {requests: count }}}, function (err, bulk) {
        //     if (err) throw err;
        //     console.log("state updated to "+count);
        //     res.status(200);
        //     data = bulk;
        //     res.json({ Status: 'Success'+JSON.stringify(bulk) });
        // })
        for(var i =0 ; i<count;i++){
            var newTrafficData = Traffic_Data({
                gpsLocation: gpsLocation,
                stateData: routeID,
                LocationID: locationId,
                Time: 1
            })
    
            newTrafficData.save(function (err) {
                if (err) throw err;
    
                Traffic_Data.find({}, function (err, traffData) {
                    if (err) throw err;
                })
            })
        }

        console.log("state updated to "+count);
        res.status(200);
        res.json({ Status: 'Success'});



    } else {
        res.status(400);
        datas = { Status: 'Invalid Parameters' };
        res.json(datas);
    }
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
module.exports.GetCurrentState = getCurrentState;
module.exports.AddBulkTrafficData = addBulkTrafficData;
