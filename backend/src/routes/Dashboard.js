const express = require("express");
const db = require('../../db');
const { authenticate } = require('../../generateAccessToken')


const router = express.Router();

router.get("/", authenticate, (req, res) => {
  console.log("POST Route");
  const user = req.body;
  console.log(user);

  db.query(
    `SELECT i.id, i.title, c.name, i.budget FROM itinerary i LEFT JOIN country c  ON i.country_id = c.id WHERE i.user_id = ${req.body["user_id"]}`,
    function (err, db_itineraries) {
      if (err) console.log(err);
      console.log(db_itineraries);
      res.send(db_itineraries);
    }
  );
});

module.exports = router;
