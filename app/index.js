/* jshint camelcase:false */
'use strict';

var request = require('request');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

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
  debugger;
  var url = 'http://api.wunderground.com/api/2690d269e6a80bec/conditions/q/' + req.body.zip + '.json';
  request(url, function(error, response, body){
     body = JSON.parse(body);
    var temp = body.current_observation.temp_f;
    var color;
    if(temp >= 95){
      color = 'red';
    }else if(temp >= 81){
      color='orange';
    }else if(temp >= 71){
      color = 'yellow';
    }else if(temp >=33) {
      color = 'green';
    }else{
      color = 'blue';
    }


    console.log(temp);
    res.render('weather', {temp:temp, color:color});
 });
});

var port = process.env.PORT;

app.listen(port, function(){
  console.log('Express is listening on PORT', port);
});
