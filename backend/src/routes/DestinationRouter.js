const express = require('express');
const destinationService = require('../service/DestinationService');
const router = express.Router();

// const destinationService = new DestinationService();
const db = require('../../db');

const querying = async (query, values) => {
  await new Promise((resolve, reject) => {
    db.query(query, [values], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const select = async (query) => {
  await new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const getAllDestination = async () => {
  const dest = await select(`SELECT * FROM destination`);
  console.log(dest);
  return dest;
};

const createDestination = async ({ country_id, cost, name, notes }) => {
  const dest = await querying(
    `INSERT INTO destination (country_id, cost, name, notes) VALUES ?`,
    [[country_id, cost, name, notes]],
  );
  return dest;
};

router.get('/', async (req, res) => {
  try {
    console.log('inside');
    const allDestination = await getAllDestination();
    return res.status(200).json(allDestination);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('inside');
    const destinationData = req.body;
    console.log(destinationData);
    // if (
    //   !!destinationData.country_id ||
    //   !!destinationData.cost ||
    //   !!destinationData.name ||
    //   destinationData.notes
    // ) {
    //   return res.status(500).json({
    //     error: 'Inputed data does not comply with destination data model',
    //   });
    // }
    const newDestination = await createDestination(destinationData);
    return res.status(200).json(newDestination);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
