// init stuff
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

// Utils
const {
  mapJourneys,
  mapStations,
  getStationNames,
  getStationByName,
} = require("./utils/mappings");

// Mongo stuff: client
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PW}@${process.env.ATLAS_URL}`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// single database connection
let db;

// pipelines
const journeysByDeparture = require("./mongodb/pipelines");

// Journeys
const getFilteredJourneys = async () => {
  const journeys = db.collection("journeys");
  const filteredJourneys = await journeys
    .aggregate(journeysByDeparture)
    .toArray();
  return filteredJourneys;
};

app.get("/journeys", (req, res) => {
  getFilteredJourneys()
    .then((journeys) => res.send(mapJourneys(journeys)))
    .catch(console.error);
});

// Stations
const getStations = async () => {
  const stations = db.collection("stations");
  // chaining aggregate.array is required
  return await stations.aggregate().toArray();
};

app.get("/stations", (req, res) => {
  getStations()
    .then((stations) => res.send(mapStations(stations)))
    .catch(console.error);
});

app.get("/stations/names", (req, res) => {
  getStations()
    .then((stations) => res.send(getStationNames(stations)))
    .catch(console.error);
});

app.get("/stations/names/:name", (req, res) => {
  getStations()
    .then((stations) => res.send(getStationByName(stations, req.params.name)))
    .catch(console.error);
});

// server initialization function
const init = async () => {
  try {
    // connect once (in single-thread nodejs, connection is kept open)
    await client.connect();
    db = client.db("city-bike-data");
    app.listen(3001, () => console.log("MongoDB connection initialized!"));
  } catch (e) {
    console.log("error: ", e);
  }
};

// start the server
init();
