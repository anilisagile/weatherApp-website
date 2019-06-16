const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5pbHNvZnR3YXJlZGV2IiwiYSI6ImNqdm52Y2dzazFteTc0YnMyZDY3b2Y4YXUifQ.yOqd4CA7TrAqJeJ4nafiwA&limit=1'
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined);
        }
        else if(body.features.length === 0){

            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            const featuresObj = body.features[0];
            const centerAray = featuresObj.center;
            callback(undefined, {

                lattitude: centerAray[1],
                longitude: centerAray[0],
                location: featuresObj.place_name

            });
        }

    
    })
} 



module.exports = geocode;
