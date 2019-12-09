// index.js

const { fetchMyIP, fetchCoordsByIP,fetchFlyOver ,nextISSTimesForMyLocation} = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});




fetchCoordsByIP('67.71.216.6', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('it worked! Returned Coords:', data);
});



const example = { latitude: '43.63190', longitude: '-79.37160' }

fetchFlyOver(example, (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('it worked!:', data);
});



const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});