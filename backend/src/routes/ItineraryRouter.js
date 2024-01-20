const express = require('express');
const db = require('../../db');
const { authenticate } = require('../../generateAccessToken')

const router = express.Router();

router.get('/', authenticate, (req, res) => {
    db.query(`SELECT * FROM itinerary WHERE id=${req.body['id']}`, function (err, db_itineraries) {
        if (err) console.log(err);
        console.log(db_itineraries)
        res.send(db_itineraries)
    });
})

router.post('/', (req, res) => {
    console.log(req.body['user'])

    db.query(`INSERT INTO itinerary (country_id, user_id, budget, title) VALUES (${req.body['country_id']}, ${req.body['user_id']}, ${req.body['budget']}, '${req.body['title']}')`, function (err, db_itineraries) {
        if (err) console.log(err);
        console.log(db_itineraries);
        res.send(`Itinerary added to DB`);
    });
})

router.put('/', (req, res) => {
    db.query(`UPDATE itinerary SET country_id = ${req.body['country_id']}, user_id = ${req.body['user_id']}, budget = ${req.body['budget']}, title = '${req.body['title']}' WHERE id=${req.body['id']}`, function (err, db_itineraries) {
        if (err) console.log(err);
        console.log(db_itineraries);
        res.send(`Itinerary updated in DB`);
    });
})

router.delete('/', (req, res) => {
    db.query(`DELETE FROM itinerary_destination WHERE itinerary_id=${req.body['id']}`, function (err, db_itineraries) {
        if (err) console.log(err);
        console.log(db_itineraries);
    });

    db.query(`DELETE FROM itinerary WHERE id=${req.body['id']}`, function (err, db_itineraries) {
        if (err) console.log(err);
        console.log(db_itineraries);
        res.send(`Itinerary deleted in DB`);
    });
})

module.exports = router;