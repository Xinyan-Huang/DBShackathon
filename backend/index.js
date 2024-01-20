const express = require("express");
const app = express();
const cors = require('cors');
var cookieParser = require('cookie-parser');
app.use(express.json());

const dbroutes = require("./src/routes/Dashboard.js");
const itineraryRoutes = require("./src/routes/ItineraryRouter");
const loginroute = require("./src/routes/LoginRouter");
const destinationRouter = require('./src/routes/DestinationRouter');

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

app.use("/db", dbroutes);
app.use('/itinerary', itineraryRoutes);
app.use("/login", loginroute);
app.use('/destination', destinationRouter);

//Backend Listens to port 5001, your axios calls should be localhost:5001
app.listen(5001, () => console.log('Server up and running... on port 5001'));
