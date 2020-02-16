request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/aa96f63a99e176c87eb505a672e25727/' + latitude + ',' + longitude
    + '?units=si'

    request({ url, json: true }, (error, { body }) => {
    // const data = JSON.parse(response.body)
    if (error){
        callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 
        ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
    })
}

module.exports = forecast