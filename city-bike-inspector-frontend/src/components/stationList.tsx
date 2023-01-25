import React from "react";
import stationApi from "../api/stationApi";
import { Station } from "../App";
import { SingleStation } from "./singleStation";

interface Props {
  isLoading: boolean;
  stationNames?: string[];
}

const StationList = ({ isLoading, stationNames }: Props) => {
  const [selectedStation, setSelectedStation] = React.useState<Station>();
  const [hasError, setHasError] = React.useState(false);

  const handleStationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stationName = e.target.value;
    stationApi
      .getStationByName(stationName)
      .then((station) => setSelectedStation(station))
      .catch((_) => setHasError(true));
  };

  if (!stationNames) return <>No station names loaded.</>;
  return (
    <>
      <h2>Select for a station to inspect</h2>
      <form>
        <select
          name="station-names"
          id="station-names"
          onChange={handleStationChange}
        >
          {stationNames.map((name, i) => (
            <option key={i} value={name}>
              {name}
            </option>
          ))}
        </select>
      </form>
      <SingleStation
        hasError={hasError}
        isLoading={isLoading}
        station={selectedStation}
      />
    </>
  );
};

export default StationList;
