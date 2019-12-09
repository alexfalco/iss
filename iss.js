
const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};




const fetchCoordsByIP = function(ip,callback) {

  request('https://ipvigilante.com/json/' + ip, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode}`), null);
      return;
    }

    const {latitude, longitude} = JSON.parse(body).data;
    callback(null, {latitude, longitude});

  });


};



const fetchFlyOver = function(data,callback) {

  const url = `http://api.open-notify.org/iss-pass.json?lat=${data.latitude}&lon=${data.longitude}`;
  
  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode}`), null);
      return;
    }

    const pass = JSON.parse(body).response;
    callback(null, pass);

  });


};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchFlyOver(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
}




module.exports = { fetchMyIP,fetchCoordsByIP,fetchFlyOver,nextISSTimesForMyLocation };