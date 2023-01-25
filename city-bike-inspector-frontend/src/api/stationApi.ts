import axios from "axios"

// base URL: local express backend
const baseUrl = "http://localhost:3001"

// station URL's
const stationsBaseUrl = `${baseUrl}/stations`
const stationNamesUrl = `${stationsBaseUrl}/names`
const singleStationByNameUrl = (name: string) => `${stationNamesUrl}/${name}`

const getStationNames = () => {
  return axios.get(stationNamesUrl)
    .then(response => response.data)
    .catch(error => console.warn(error))
}

const getStationByName = (name: string) => {
  return axios.get(singleStationByNameUrl(name))
    .then(response => response.data)
    .catch(error => console.warn(error))
    // .then((response) => setSelectedStation(response.data))
    // .catch((_) => setHasStationHerror(true))
    // .finally(() => setIsLoading(false))
}

const stationApi = {
  getStationNames,
  getStationByName
}

export default stationApi