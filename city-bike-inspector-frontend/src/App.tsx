/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import JourneyList from "./components/journeyList";
import StationList from "./components/stationList";
import journeyApi from "./api/journeyApi";
import stationApi from "./api/stationApi";

export interface Station {
  fid: number;
  id: string;
  nameFinnish: string;
  nameSwedish: string;
  nameEnglish: string;
  addressFinnish: string;
  addressSwedish: string;
  cityFinnish?: string;
  citySwedish?: string;
  operator?: string;
  capacity: number;
  locationX: number;
  locationY: number;
}

export interface Journey {
  departureTime: string;
  returnTime: string;
  departureStationId: string;
  departureStationName: string;
  returnStationId: string;
  returnStationName: string;
  coveredDistance: number;
  duration: number;
  id: number;
}

// TODO: generic cleanup after implementing wanted frontend functionalities
// loading states

/**
 * A simple frontend to display backend data.
 * This project is mainly backend-focused.
 */
const App = () => {
  const [stationNames, setStationNames] = React.useState<string[]>();
  const [journeys, setJourneys] = React.useState<Journey[]>();

  // loading / error states
  const [hasStationError, setHasStationHerror] = React.useState(false);
  const [hasJourneyError, setHasJourneyError] = React.useState(false);
  const [isLoadingStations, setIsLoadingStations] = React.useState(false);
  const [isLoadingJourneys, setIsLoadingJourneys] = React.useState(false);

  //get all station names on load
  React.useEffect(() => {
    setIsLoadingStations(true)
    stationApi.getStationNames()
      .then(names => setStationNames(names))
      .catch((_) => setHasStationHerror(true))
      .finally(() => setIsLoadingStations(false))
  }, [])

  // get some journeys on load
  React.useEffect(() => {
    setIsLoadingJourneys(true);
    journeyApi
      .getJourneys()
      .then((journeys) => setJourneys(journeys))
      .catch((_) => setHasJourneyError(true))
      .finally(() => setIsLoadingJourneys(false));
  }, []);

  return (
    <div className="App">
      <h1>City Bike Inspector</h1>
      <StationList stationNames={stationNames} isLoading={isLoadingStations} />
      <hr />
      <JourneyList journeys={journeys} />
    </div>
  );
};

export default App;
