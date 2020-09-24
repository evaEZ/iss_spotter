//require and run our main fetch function.

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printTime(passTimes);
});

const printTime = function(passTime){
for (let items in passTime){
  const dateTime = new Date(0);
  dateTime.setUTCSeconds(passTime[items]["risetime"]);
  console.log(`Next pass at ${dateTime} for ${passTime[items]["duration"]} seconds!`);
}
};



/** 
const { fetchMyIP } = require('./iss');
//const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

fetchMyIP ((error, ip) =>{
  if (error){
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", ip)
});


fetchCoordsByIP ("45.41.175.225", (error, data) => {
  if(error){
    console.log(error);
    return;
  }
  console.log(data);
});


fetchISSFlyOverTimes({latitude: '49.27670', longitude: '-123.13000'}, (error, data) => {
  if(error){
    console.log(error);
    return;
  }
  console.log(data);
});
*/