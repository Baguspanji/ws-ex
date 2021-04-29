var Cookies = require('cookies');
var keys = ['keyboard cat'];

function setCookies(req, res, nama = '', value) {
    var cookies = new Cookies(req, res, { keys: keys });

    cookies.set(nama, value, { signed: true })
}

function getCookies(req, res, nama = '') {
    var cookies = new Cookies(req, res, { keys: keys });

    return cookies.get(nama, { signed: true })
}

module.exports = { setCookies, getCookies };