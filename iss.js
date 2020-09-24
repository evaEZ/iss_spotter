//contain most of the logic for fetching the data from each API endpoint.


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) =>{
    if(error){
      return callback((error, null));
    }

    fetchCoordsByIP(ip, (error, coords) =>{
      if(error){
        return callback((error, null));
      }

      fetchISSFlyOverTimes(coords, (error, data) =>{
      if(error){
        return callback((error, null));
      }
      callback(null, data);
      });

    });

  });
}


/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

//return ip
const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request.get('https://api.ipify.org?format=json',(error, res) =>{
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    
    if (res.statusCode !== 200) {
      const body = res["body"];
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
      const test = JSON.parse(res["body"]);
      const ip = test["ip"];
      callback(null, ip);
  });
}

//return the latitude and longitude based on the ip
const fetchCoordsByIP = function (ip, callback){
  const url = "https://ipvigilante.com/" + ip;
  
  request.get(url, (error, res, body) => {
    if (error) {
      callback(error, null);
      return;
    } 
    
    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } 
    
    const b = JSON.parse(body);
    const loc = b["data"];

    const lat = loc["latitude"];
    const lon = loc["longitude"];
    const data = {
      latitude: lat,
      longitude: lon
    }
    callback (null, data);
   
  });
  
}

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords["latitude"]}&lon=
  ${coords["longitude"]}`;
  request.get(url, (error, res, body) =>{
  
    if(error){
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } 

    const data = JSON.parse(body);
    callback (null, data.response);   
  });
};


module.exports = { 
  nextISSTimesForMyLocation
};