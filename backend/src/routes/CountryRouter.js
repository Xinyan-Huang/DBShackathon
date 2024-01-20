const express = require('express');
const router = express.Router();

const db = require('../../db');

router.get('/', async (req, res) => {
  try {
    db.query('SELECT * FROM country', function (err, countries) {
      if (err) console.log(err);
      console.log(countries);
      return res.status(200).json(countries);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
