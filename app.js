
/**
 * Module dependencies.
 */

//imports the express package and stores in var called express.
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

//Creates an express app and sets it port to 3000 by default.
//Can overwrite this default by creating an environment variable PORT.
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//creates a route handler
//chain of request handlers for a given URL
//Express matches the specified paths in the request and executes the callback appropriately
app.get('/', routes.index);
app.get('/users', user.list);

//Implements the function(req,res) callback separately instead of including inline in the create server call.
//App waits for the port to be ready before logging the listening message to the console.
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
