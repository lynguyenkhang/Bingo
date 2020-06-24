var express = require('express');
var router = express.Router();
var hostController = require('../controllers/host.controller.js');
var controller = require('../controllers/users.controller.js');


router.get('/', controller.index);

router.get('/reset', controller.reset);






module.exports = router;