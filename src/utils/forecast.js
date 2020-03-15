const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/7b09b032d38ef9d8cade3b6d2c3f8605/${latitude},${longitude}`;

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback(`Unable to connect to weather service.`, undefined);
    } else if (res.body.error) {
      callback(`Unable to find location.`, undefined);
    } else {
      const currently = res.body.currently;
      callback(
        undefined,
        `${res.body.daily.data[0].summary} It is currently ${currently.temperature}° out. There is a ${currently.precipProbability}% of rain. The current visibility is ${currently.visibility} miles.`
      );
    }
  });
};

module.exports = forecast;
