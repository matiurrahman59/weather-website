const request = require('request');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibXJubmF5YW41OSIsImEiOiJjbDhybmphbGswcjZuM29wcjZlMm4zeXB3In0._yl1jSxXgoTcznUzaI1CMg&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!');
    } else if (body.features.length === 0) {
      callback('Unable to find location, try another search.');
    } else {
      const [lng, lat] = body.features[0].center;
      const location = body.features[0].place_name;
      callback(undefined, { lat, lng, location });
    }
  });
};

module.exports = geoCode;
