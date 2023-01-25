import axios from "axios";

// base URL: local express backend
const baseUrl = "http://localhost:3001";

// journey URL's
const journeysBaseUrl = `${baseUrl}/journeys`;

const getJourneys = () => {
  return axios
    .get(`${journeysBaseUrl}`)
    .then((response) => response.data)
    .catch((error) => console.warn(error));
};

const journeyApi = {
  getJourneys,
};

export default journeyApi;
