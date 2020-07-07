var express = require('express')
var app = express();
var port = process.env.PORT || 3000;

var hostRoute = require('./routes/host.route.js');
var usersRoute = require('./routes/users.route.js');

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public'));


app.get('/', function(req,res){
	res.render('index');
});

app.use('/host', hostRoute);

app.use('/users', usersRoute);

app.listen(port,function(){
	console.log('Listening ' + port +' ....');
});