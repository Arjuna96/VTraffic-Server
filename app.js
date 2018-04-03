var express = require('express');
var app = express();
var server = require("./server");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 2000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post("/api/Location", function (req, res) {
  server.LocationData(req, res);
});

app.get('/api/msg', (req, res) => {
    server.SetMessage(req, res);
});

app.post('/api/addUser', (req, res) => {
    server.AddUser(req, res);
});

app.get('/api/showUsers', (req, res) => {
    server.ShowUsers(req, res);
});

app.post('/api/updateUsers', (req, res) => {
    server.UpdateUser(req, res);
});

app.post('/api/addTrafficLight', (req, res) => {
    server.AddNewTrafficLight(req, res);
});

app.post('/api/showTrafficLights', (req, res) => {
    server.ShowTrafficLightLocation(req, res);
});

app.get('/api/sendMsgToArduino', (req, res) => {
    server.SendMsgToArduino(req, res);
});

app.get('/api/addTrafficData', (req, res) => {
    server.AddTrafficData(req, res);
});

app.post('/api/login', (req, res) => {
    server.Authentication(req, res);
});

app.listen(PORT, function () {
    console.log('Working on port ' + PORT);
});