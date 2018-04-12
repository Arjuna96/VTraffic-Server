var express = require('express');
var app = express();
var server = require("./server");
var bodyParser = require("body-parser");


var PORT = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());



// test api
app.get('/api/test', (req, res) => {
    server.SetMessage(req, res);
});

app.post("/api/goGreen", function (req, res) {
    server.LocationData(req, res);
  });

app.post('/api/register', (req, res) => {
    server.AddUser(req, res);
});

app.post('/api/getUser', (req, res) => {
    server.ShowUsers(req, res);
});

app.post('/api/updateUsers', (req, res) => {
    server.UpdateUser(req, res);
});

app.post('/api/addTrafficLight', (req, res) => {
    server.AddNewTrafficLight(req, res);
});

app.post('/api/getTrafficLightData', (req, res) => {
    server.ShowTrafficLightLocation(req, res);
});

app.post('/api/sendMsgToArduino', (req, res) => {
    server.SendMsgToArduino(req, res);
});

app.post('/api/addTrafficData', (req, res) => {
    server.AddTrafficData(req, res);
});

app.post('/api/login', (req, res) => {
    server.Authentication(req, res);
});

app.post('/api/requestTime', (req, res) => {
    server.RequestTime(req, res);
});

app.post('/api/updateState', (req, res) => {
    server.UpdateState(req, res);
});

app.listen(PORT, function () {
    console.log('Working on port ' + PORT);
});