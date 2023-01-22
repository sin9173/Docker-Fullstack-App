const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'mysql',
    user : 'root',
    password: '1111',
    database: 'myapp'
});


exports.pool = pool;