console.log('Starting node server..');
// use current working directory for production
// (used to serve static files)
process.env.PWD = process.cwd();

var express = require('express'),
		app = express(),
		
		//set environment
		prod = process.env.PWD,
		dev = __dirname + '/app',
		env_dir = app.get('env') === 'production' ? prod : dev;

app.set('port', process.env.PORT || 3000);

app.configure(function() {
	app.use(express.static(env_dir));
});

app.get('/', function(req, res) {
	// do yo' thang
});

app.listen(app.get('port'));
console.log('Listening on port ', app.get('port'), 'in ' + app.get('env') + ' mode');

