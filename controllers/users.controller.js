
var js = require('../js/bingo.js');

module.exports.index = function(req, res, next){
	var table = js.randomTable();

	res.render('users/index', {
		tableTop: table.slice(0,3),
		tableMid: table.slice(3,6),
		tableBot: table.slice(6)
	});
}



module.exports.reset = function(req,res, next){
	var table = js.randomTable();

	res.render('users/index', {
		tableTop: table.slice(0,3),
		tableMid: table.slice(3,6),
		tableBot: table.slice(6)
	});
}
