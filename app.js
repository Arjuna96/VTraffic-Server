var express = require('express');
var app = express();
var server = require("./server");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 2000;

app.get('/msg', (req, res) => {
  get.SetMessage(req, res);

});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post("/Location", function (req, res) {
  server.LocationData(req, res);
});

app.get('/data', (req, res) => {
    get.DataDB(req, res);
  
});

app.listen(PORT, function () {
    console.log('Working on port ' + PORT);
});