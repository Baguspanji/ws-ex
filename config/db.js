const mysql = require('mysql')

var connection = mysql.createConnection({
    host: '103.233.102.18',
    user: 'sukorej1_webSocket',
    password: 'FPfqe{[RXfHo',
    database: 'sukorej1_webSocket'
});

module.exports = connection;