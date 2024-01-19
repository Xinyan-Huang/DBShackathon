require('dotenv').config();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "dday",
    port: 3306
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

module.exports = db;