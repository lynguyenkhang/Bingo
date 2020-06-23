var js = require('../js/bingo.js');

	



module.exports.index = function(req, res, next){
	var table = js.randomTable();

	res.render('bingo/index', {
		table: table
	});
}



