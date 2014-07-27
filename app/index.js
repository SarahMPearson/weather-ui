/* jshint camelcase:false */
'use strict';


var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  res.render('form');
});

app.post('/', function(req, res){
  var zip = req.body.zip *1;
  var url = 'http://api.wunderground.com/api/2690d269e6a80bec/conditions/q/' + zip '.json';
  request(url, function(error, response, body){
     body = JSON.parse(body);
     var temp = body.current_observation.temp_f;
     
     console.log(high);
 });
  };res.render('weather');
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is listening on PORT', port);
});
