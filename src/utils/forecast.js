const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/f45b423aeefaaea198dabd55e7ba4469/' + latitude + ',' +  longitude // url for darks sky api to fetch weather data
    //url contains latitude,longitude ,key

     //es6 object destructing //............
  //  request({url : url, json: true} , (error,response)
 // request({url, json: true} , (error,response)
    request({url, json: true} , (error,{body})=>{ // we send coordinates with url and get all the data back in json format

        //  const data = JSON.parse(response.body)  // due to json:true  json file get parsed sutomatically 
             
        if(error){
            callback('unable to connect to internet ',undefined)
        }
        else if(body.error){               //  else if(response.body.error){
              console.log('unable to find location',undefined)
        }
        else{
          //callback(undefined,response.body.daily.data[0].summary + ' it is currently ' + response.body.currently.temperature + ' degree out there there is '+ response.body.currently.precipProbability + '% chances of rain')
          callback(undefined,body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + ' degree out there there is '+ body.currently.precipProbability + '% chances of rain')
        }
      })
}

module.exports = forecast