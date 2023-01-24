const journeysByDeparture = [
  {
    '$match': {
      'Covered distance (m)': {
        '$gte': 10
      }, 
      'Duration (sec)': {
        '$gte': 10
      }
    }
  }, {
    '$limit': 100
  }, {
    '$sort': {
      'Departure': 1
    }
  }
]

module.exports = journeysByDeparture
