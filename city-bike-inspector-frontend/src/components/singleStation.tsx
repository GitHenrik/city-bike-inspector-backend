import * as React from "react";
import { Station } from "../App";
import useIsFirstRender from "../hooks/hooks";

interface SingleStationProps {
  hasError: boolean;
  isLoading: boolean;
  station?: Station;
}

export const SingleStation = ({
  hasError,
  isLoading,
  station,
}: SingleStationProps) => {
  const isFirstRender = useIsFirstRender();
  if (isFirstRender)
    return (
      <div>Station information will appear here after searching for it.</div>
    );
  if (hasError) return <div>Search failed.</div>;
  if (isLoading) return <div>Loading... Please wait.</div>;
  if (!station)
    return <div>No station found, try searching with an station ID.</div>;
  return (
    <div>
      <h3>Single station</h3>
      <ul>
        {Object.entries(station).map(([key, value], i) => (
          <li key={i}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
