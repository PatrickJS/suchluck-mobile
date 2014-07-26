// Server
var express = require('express');
var app = express();

// Store all environment variables
var port = process.env.PORT || 3001;
var env  = process.env.NODE_ENV || 'production';

// App middleware
app.use(express.static(__dirname + '/www'));

app.listen(port, function(){
  console.log('Listening on port ' + port + ' as ' + env);
});