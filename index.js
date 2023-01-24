// init stuff
const express = require("express");
const app = express();
require("dotenv").config();

// pipelines
const journeysByDeparture = require("./mongodb/pipelines");

// Mongo stuff
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.ATLAS_USER}:${process.env.ATLAS_PW}@cluster0.gy8uuph.mongodb.net/city-bike-data?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const initDbConnection = async () => {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const journeys = client.db("city-bike-data").collection("journeys");
  const filteredJourneys = await journeys.aggregate(journeysByDeparture).toArray();
  return filteredJourneys;
};

initDbConnection()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

// Express stuff
app.get("/", (req, res) => {
  res.send("I will be shown on the Browser");
  console.log("I will be shown on the Terminal");
});

app.listen(3000);
