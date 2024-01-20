const express = require('express');
const { authenticate } = require('../../generateAccessToken')

const router = express.Router();

const db = require('../../db');

// router.get('/', async (req, res) => {
//   try {
//     db.query('SELECT * FROM destination', function (err, destinations) {
//       if (err) console.log(err);
//       console.log(destinations);
//       return res.status(200).json(destinations);
//     });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

router.get('/', authenticate, async (req, res) => {
  try {
    db.query(
      `SELECT d.country_id, d.cost, d.name, d.notes FROM itinerary i INNER JOIN itinerary_destination id ON id.itinerary_id = i.id INNER JOIN destination d ON id.destination_id = d.id WHERE i.user_id = ${req.body['userId']};`,
      function (err, destination) {
        if (err) console.log(err);
        console.log(destination);
        return res.status(200).json(destination);
      },
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/country/:country_id', async (req, res) => {
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

router.post('/', authenticate, async (req, res) => {
  try {
    db.query(
      `INSERT INTO destination (country_id, cost, name, notes) VALUES (${req.body['countryId']}, ${req.body['cost']}, '${req.body['name']}', '${req.body['notes']}')`,
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

router.put('/:id', authenticate, async (req, res) => {
  try {
    db.query(
      `UPDATE destination SET country_id = ${req.body['countryId']}, cost = ${req.body['cost']}, name = '${req.body['name']}', notes = '${req.body['notes']}' WHERE id=${req.params['id']}`,
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

router.delete('/:id', authenticate, async (req, res) => {
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
