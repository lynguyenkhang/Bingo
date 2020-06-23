var express = require('express')
var app = express();
var port = 3000;

var bingoRoute = require('./routes/bingo.route.js');

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public'));


app.get('/', function(req,res){
	res.render('index');
});

app.use('/bingo', bingoRoute);


app.listen(port,function(){
	console.log('Listening ' + port +' ....');
});