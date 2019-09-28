const request = require('request')

const forecast = (lat, lon, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(lat) + ',' + encodeURI(lon) + '.json?access_token=pk.eyJ1IjoicXVvY2xvbiIsImEiOiJjanhyNDMxZDMwNHpmM2NwcGRxaDJpNDJyIn0.Q5dSG5IZo-WDFg_2KrK9ew&limit=1'
    const url = 'https://api.darksky.net/forecast/c92720239e4d078217e0bd0cf544e3ce/' + lat + ',' + lon + ''

    console.log(url)
 
    request({url, json: true}, (error, {body}) => {

    if(error){
        callback("There was a basic Error", undefined)
    } else if (body.error){
        callback('Unable to find location ' + body.error, undefined)
    } else {
        callback(error, body.daily.data[0].summary + ' with ' + body.daily.data[0].precipProbability + ' chance of rain' + ' with windspeed of ' + body.daily.data[0].windSpeed)
    }   

    })
}


module.exports = forecast