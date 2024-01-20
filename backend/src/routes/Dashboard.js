const express = require("express");
const mysql = require("mysql");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("POST Route");
  const user = req.body;
  console.log(user);

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "techtrek24",
  });

  con.connect(function (err) {
    if (err) throw err;

    console.log("Connected to DB");

    con.query(
      "SELECT i.id, i.title, c.name, i.budget, d.country_id, d.cost, d.name, d.notes FROM itinerary i LEFT JOIN country c ON i.country_id = c.id LEFT JOIN itinerary_destination id ON i.id = id.itinerary_id LEFT JOIN destination d ON id.destination_id = d.id",
      function (err, db_itineraries) {
        if (err) console.log(err);
        console.log(db_itineraries);
        res.send(db_itineraries);

        con.end();
      }
    );
  });
});

module.exports = router;
