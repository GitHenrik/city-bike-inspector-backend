// init stuff
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

// pipelines
const journeysByDeparture = require("./mongodb/pipelines");

// Mongo stuff: client
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PW}@cluster0.gy8uuph.mongodb.net/city-bike-data?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const getFilteredJourneys = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const journeys = client.db("city-bike-data").collection("journeys");
  const filteredJourneys = await journeys
    .aggregate(journeysByDeparture)
    .toArray();
  return filteredJourneys;
};

// Mappings
const mapJourneys = (journeys) => {
  return journeys.map((journey) => {
    return {
      departureTime: journey["Departure"],
      returnTime: journey["Return"],
      departureStationId: journey["Departure station id"],
      departureStationName: journey["Departure station name"],
      returnStationId: journey["Return station id"],
      returnStationName: journey["Return station name"],
      coveredDistance: journey["Covered distance (m)"],
      duration: journey["Duration (sec)"],
      id: journey._id,
    };
  });
};

// Express stuff
app.get("/journeys", (req, res) => {
  getFilteredJourneys()
    .then((journeys) => res.send(mapJourneys(journeys)).json())
    .catch(console.error)
    .finally(() => client.close());
});

app.listen(3001);
