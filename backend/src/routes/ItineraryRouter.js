const express = require('express');
const mysql = require('mysql');

const router = express.Router();

router.get('/', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'techtrek24'
    });
    
    con.connect(function(err) {
        if (err) throw err;

        console.log("Connected to DB")

        con.query(`SELECT * FROM itinerary WHERE id=${req.body['id']}`, function (err, db_itineraries) {
            if (err) console.log(err);
            console.log(db_itineraries)
            res.send(db_itineraries)

            con.end();
        })
    });
})

router.post('/', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'techtrek24'
    });

    console.log(req.body['user'])

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to DB")
        con.query(`INSERT INTO itinerary (country_id, user_id, budget, title) VALUES (${req.body['country_id']}, ${req.body['user_id']}, ${req.body['budget']}, '${req.body['title']}')`, function (err, db_itineraries) {
            if (err) console.log(err);
            console.log(db_itineraries);
            res.send(`Itinerary added to DB`);
            
            con.end();
        })
    });
})

router.put('/', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'techtrek24'
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to DB")
        con.query(`UPDATE itinerary SET country_id = ${req.body['country_id']}, user_id = ${req.body['user_id']}, budget = ${req.body['budget']}, title = '${req.body['title']}' WHERE id=${req.body['id']}`, function (err, db_itineraries) {
            if (err) console.log(err);
            console.log(db_itineraries);
            res.send(`Itinerary updated in DB`);
            
            con.end();
        })
    });
})

router.delete('/', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: 'techtrek24'
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to DB")
        con.query(`DELETE FROM itinerary_destination WHERE itinerary_id=${req.body['id']}`, function (err, db_itineraries) {
            if (err) console.log(err);
            console.log(db_itineraries);
        })

        con.query(`DELETE FROM itinerary WHERE id=${req.body['id']}`, function (err, db_itineraries) {
            if (err) console.log(err);
            console.log(db_itineraries);
            res.send(`Itinerary deleted in DB`);
            
            con.end();
        })
    });
})

module.exports = router;