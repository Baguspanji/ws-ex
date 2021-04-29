var express = require('express');
var router = express.Router();

var { setCookies, getCookies } = require('../controller/cookies');

/* GET home page. */
router.get('/', function(req, res, next) {

    var lastVisit = getCookies(req, res, 'nama');

    res.render('index', { nama: lastVisit });
});

module.exports = router;