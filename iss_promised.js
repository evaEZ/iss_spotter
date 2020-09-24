const request = require("request-promise-native");

const fetchMyIP = function (){
  return request.get('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function (body){
  const ip = JSON.parse(body).ip;
  const url = "https://ipvigilante.com/" + ip;
  return request.get(url);
}

const fetchISSFlyOverTimes = function (loc){ 
  //const lat = JSON.parse(loc).data.latitude;
  //const lon = JSON.parse(loc).data.longitude;
  const { latitude, longitude } = JSON.parse(loc).data;
  const url = "http://api.open-notify.org/iss-pass.json?lat=" + latitude + "&lon=" + longitude;
  
  return request.get(url);
}

const nextISSTimesForMyLocation = function(){
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      //console.log(body);
      const res = JSON.parse(body).response;
      return res;
    });
}

module.exports = {
  nextISSTimesForMyLocation
};
/*
module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};
*/