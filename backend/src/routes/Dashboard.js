const express = require("express");
const db = require("../../db");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("POST Route");
  const user = req.body;
  console.log(user);

  db.query(
    `SELECT i.id, i.title, c.name, i.budget, d.country_id, d.cost, d.name as destination, d.notes FROM itinerary i LEFT JOIN country c ON i.country_id = c.id LEFT JOIN itinerary_destination id ON i.id = id.itinerary_id LEFT JOIN destination d ON id.destination_id = d.id WHERE i.user_id = ${req.body["user_id"]}`,
    function (err, db_itineraries) {
      if (err) console.log(err);
      console.log(db_itineraries);
      res.send(db_itineraries);
    }
  );
});

module.exports = router;
