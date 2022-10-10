const request = require('request');

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=58041686d7e790d78e76b3251ce05486&query=${lat},${lng}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      const temp = body.current.temperature;
      const tempFeels = body.current.feelslike;
      const rainProbability = body.current.precip;
      const weatherCondition = body.current.weather_descriptions[0];

      const data = `${weatherCondition}. It is currently ${temp} degrees out. It feels like ${tempFeels} degrees. There is ${
        rainProbability === 0 ? 'no' : `a ${rainProbability}%`
      } chance of rain.`;

      callback(undefined, data);
    }
  });
};

module.exports = forecast;

// const url =
//   'http://api.weatherstack.com/current?access_key=58041686d7e790d78e76b3251ce05486&query=37.8262,-122.4233&units=f';
