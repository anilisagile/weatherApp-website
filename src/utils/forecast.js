const request = require('request');

const forecast = (lattitude, longitude, callback) => {

    const reqUrl = 'https://api.darksky.net/forecast/51437484189c8d7d5944c58107725b99/'+lattitude+','+longitude+'?units=si';
    request({ url: reqUrl, json: true}, (error, {body}) => {
       
       if(error){
           console.log('error @darkSkyApi ', error)
           callback('error @darkSkyApi ', undefined);
       }
       else if(body.error){
           console.log('Response has an error', body.error);
           callback('Response has an error', undefined);
       }
       else {
           callback(undefined, body.daily.data[0].summary + '  It is currently '+body.currently.temperature+' degrees out. There is a '+ body.currently.precipProbability+'% chance of rain. ');
           //console.log(response.body.daily.data[0].summary + '  It is currently '+response.body.currently.temperature+' degrees out. There is a '+ response.body.currently.precipProbability+'% chance of rain. ');
   
       }
   
   })
       
   }

module.exports = forecast;