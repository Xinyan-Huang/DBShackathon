const express = require('express');
const destinationService = require('../service/DestinationService');
const router = express.Router();

// const destinationService = new DestinationService();
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

router.post('/', async (req, res) => {
  try {
    const destinationData = req.body;
    console.log(destinationData);
    // if (
    //   !!destinationData.country_id ||
    //   !!destinationData.cost ||
    //   !!destinationData.name ||
    //   !!destinationData.notes
    // ) {
    //   return res.status(500).json({
    //     error: 'Inputed data does not comply with destination data model',
    //   });
    // }
    db.query(
      `INSERT INTO destination (country_id, cost, name, notes) VALUES ? ('${destinationData.country_id}, ${destinationData.cost}, ${destinationData.name}, ${destinationData.notes}')`,
      function (err, createDestination) {
        if (err) console.log(err);
        console.log(createDestination);
        return res.status(200).json(createDestination);
      },
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
