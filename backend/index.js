const express = require("express");
const app = express();
const cors = require("cors");
var cookieParser = require("cookie-parser");
app.use(express.json());

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const dbdestroutes = require("./src/routes/Dashboard_destination.js");
const dbroutes = require("./src/routes/Dashboard.js");
const itineraryRoutes = require("./src/routes/ItineraryRouter");
const loginroute = require("./src/routes/LoginRouter");

//authentication
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  const token = auth && auth.split(" ")[1];
  console.log(token, "HI");
  console.log(auth);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log(user, "user");
    next();
  });
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use("/dbdest", dbdestroutes);
app.use("/db", dbroutes);
app.use("/itinerary", itineraryRoutes);
app.use("/login", loginroute);

//Backend Listens to port 5001, your axios calls should be localhost:5001
app.listen(5001, () => console.log("Server up and running... on port 5001"));
