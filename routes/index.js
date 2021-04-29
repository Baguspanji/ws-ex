var express = require('express');
var router = express.Router();

const db = [{
        username: 'admin',
        password: 'admin',
        nama: 'Admin'
    },
    {
        username: 'client',
        password: 'client',
        nama: 'Client'
    },
    {
        username: 'riziq',
        password: 'riziq',
        nama: 'Riziq'
    },
];

var { setCookies, getCookies } = require('../controller/cookies');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express Ws' });
});

router.post('/chat', function(req, res, next) {

    var data = req.body;

    var user = db.find(e => e.username === data.username && e.password === data.password);

    setCookies(req, res, 'nama', user.nama)

    res.render('index', { nama: user.nama });
});

module.exports = router;