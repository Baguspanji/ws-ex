var express = require('express');
var router = express.Router();

const db = require('../config/db');

var { setCookies, getCookies } = require('../controller/cookies');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express Ws' });
});

router.post('/chat', function(req, res, next) {

    var data = req.body;

    db.connect()

    var sql = "SELECT * FROM tb_user WHERE username = '" + data.username + "' AND password = '" + data.password + "'";
    db.query(sql, function(err, result) {
        if (err) throw err;

        setCookies(req, res, 'nama', result[0].nama)

        res.render('index', { nama: result[0].nama });
    });

    db.end()
});

module.exports = router;