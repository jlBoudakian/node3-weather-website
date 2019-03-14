const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1cef3667a66972214b64e0a804b36ad6/' + longitude + ',' + latitude + '?units=si';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} Max temperature of ${body.daily.data[0].apparentTemperatureHigh} and min of ${body.daily.data[0].apparentTemperatureLow}.`);
        }
    });

};


module.exports = forecast;