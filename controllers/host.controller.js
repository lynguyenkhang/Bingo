
var js = require('../js/bingo.js');

	

module.exports.index = function(req, res, next){
	var table = js.randomTable();

	res.render('host/index', {
		table: table
	});
}

module.exports.reset = function(req,res, next){
	var table = js.randomTable();

	res.render('host/index', {
		table: table
	})
}

