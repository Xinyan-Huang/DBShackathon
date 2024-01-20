const express = require("express");
const db = require("../../db");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("POST Route");
  const user = req.body;
  console.log(user);

  db.query(
    `SELECT c.name, d.country_id, d.cost, d.name AS destination, d.notes FROM itinerary i LEFT JOIN country c ON i.country_id = c.id LEFT JOIN itinerary_destination id ON i.id = id.itinerary_id LEFT JOIN destination d ON id.destination_id = d.id WHERE id.itinerary_id = ${req.body["itinerary_id"]}`,
    function (err, db_dest) {
      if (err) console.log(err);
      console.log(db_dest);
      res.send(db_dest);
    }
  );
});

module.exports = router;
