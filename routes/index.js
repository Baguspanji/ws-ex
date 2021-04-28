var express = require('express');
var router = express.Router();

const db = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express Ws' });
});

router.post('/auth', function(req, res, next) {
    var data = req.body;

    db.connect()

    var sql = "SELECT * FROM tb_user WHERE username = '" + data.username + "' AND password = '" + data.password + "'";
    db.query(sql, function(err, result) {
        if (err) console.error(err);

        session = {
            result: {
                role: result[0].role,
                username: result[0].username,
                nama: result[0].nama,
            },
            status: true
        }

        res.render('index', {
            session: session
        });
    });

    db.end()
});

module.exports = router;