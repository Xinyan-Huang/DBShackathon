const express = require('express');
const router = express.Router();

const db = require('../../db');

router.get('/', async (req, res) => {
  try {
    db.query('SELECT * FROM destination', function (err, destinations) {
      if (err) console.log(err);
      console.log(destinations);
      return res.status(200).json(destinations);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/:country_id', async (req, res) => {
  try {
    db.query(
      `SELECT * FROM destination WHERE country_id=${req.params['country_id']}`,
      function (err, destinations) {
        if (err) console.log(err);
        console.log(destinations);
        return res.status(200).json(destinations);
      },
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    db.query(
      `INSERT INTO destination (country_id, cost, name, notes) VALUES (${req.body['country_id']}, ${req.body['cost']}, '${req.body['name']}', '${req.body['notes']}')`,
      function (err, dest) {
        if (err) console.log(err);
        console.log(dest);
        return res.status(200).json('Destination was inserted.');
      },
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    db.query(
      `UPDATE destination SET country_id = ${req.body['country_id']}, cost = ${req.body['cost']}, name = ${req.body['name']}, notes = '${req.body['notes']}' WHERE id=${req.params['id']}`,
      function (err, dest) {
        if (err) console.log(err);
        console.log(dest);
        res.status(200).json(`Destination updated in DB`);
      },
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    db.query(
      `DELETE FROM destination WHERE id=${req.params['id']}`,
      function (err, destinations) {
        if (err) console.log(err);
        console.log(destinations);
      },
    );
    db.query(
      `DELETE FROM itinerary_destination WHERE destination_id=${req.params['id']}`,
      function (err, destinations) {
        if (err) console.log(err);
        console.log(destinations);
      },
    );
    return res.status(200).json('Destination Deleted');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
