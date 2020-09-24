const { nextISSTimesForMyLocation } = require('./iss_promised');

/*
fetchMyIP()
.then(fetchCoordsByIP)
.then(fetchISSFlyOverTimes)
.then(body => {
  console.log(body);
});
*/

nextISSTimesForMyLocation()
  .then((body) => {
  printTime(body);
})
  .catch((error) =>{
    console.log("It didn't work: ", error.message);
  });

const printTime = function(passTime){
  for (let items in passTime){
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(passTime[items]["risetime"]);
    console.log(`Next pass at ${dateTime} for ${passTime[items]["duration"]} seconds!`);
  }
};