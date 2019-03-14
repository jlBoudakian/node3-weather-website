const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1cef3667a66972214b64e0a804b36ad6/' + longitude + ',' + latitude + '?units=si';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It's currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`);
        }
    });

};


module.exports = forecast;