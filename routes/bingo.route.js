var express = require('express');
var router = express.Router();
var controller = require('../controllers/bingo.controller.js');

router.get('/', controller.index);
router.get('/reset', controller.reset);








module.exports = router;