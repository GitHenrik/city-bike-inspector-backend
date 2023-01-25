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

const mapStations = (stations) => {
  return stations.map((station) => {
    return {
      fid: station["FID"],
      id: station["ID"],
      nameFinnish: station["Nimi"],
      nameSwedish: station["Namn"],
      nameEnglish: station["Name"],
      addressFinnish: station["Osoite"],
      addressSwedish: station["Adress"],
      cityFinnish: station["Kaupunki"],
      citySwedish: station["Stad"],
      operator: station["Operaattor"],
      capacity: station["Kapasiteet"],
      locationX: station["x"],
      locationY: station["y"],
    };
  });
};

const getStationNames = (stations) => {
  return mapStations(stations).map(station => station.nameFinnish)
}

const getStationByName = (stations, name) => {
  return mapStations(stations).find(station => station.nameFinnish === name)
}

module.exports = {mapJourneys, mapStations, getStationNames, getStationByName}