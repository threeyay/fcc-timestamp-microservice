// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var moment = require('moment');
moment().format();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//the time API
app.get("/api/timestamp",function(req,res){
  var time = new Date();
  var timeObj = 
    {
      unix: time.getTime(),
      utc: time.toUTCString()
    };
  res.json(timeObj);
});
app.get("/api/timestamp/:date",function(req,res){
  var time = new Date(req.params['date']);
  console.log(time);
  var errorObj = {"error" : "Invalid Date" };
  var timeObj = 
    {
      unix: time.getTime(),
      utc: time.toUTCString()
    };
  if((time == "Invalid Date" || isNaN(time))){
    console.log(time, isNaN(time));
    res.json(errorObj);
  }else{
      res.json(timeObj);
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});