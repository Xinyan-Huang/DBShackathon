const express = require('express');
const mysql = require('mysql');

const router = express.Router();

router.get('/getItinerary', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'techtrek'
    });
    
    con.connect(function(err) {
        if (err) throw err;

        console.log("Connected to DB")

        con.query('SELECT * FROM itinerary', function (err, db_itineraries) {
            if (err) console.log(err);
            console.log(db_itineraries)
            res.send(db_itineraries)

            con.end();
        })
    });
})

module.exports = router;