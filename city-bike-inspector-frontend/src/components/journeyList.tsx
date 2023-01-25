import React from "react";
import { Journey } from "../App";

interface Props {
  journeys?: Journey[];
}

const JourneyList = ({ journeys }: Props) => {
  if (!journeys) return <div>No journeys loaded.</div>;
  return (
    <>
      <h2>Some journeys</h2>
      {journeys && (
        <ul>
          {journeys.map((journey) => {
            return (
              <li key={journey.id}>
                {journey.departureStationName}--{journey.returnStationName}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default JourneyList;
