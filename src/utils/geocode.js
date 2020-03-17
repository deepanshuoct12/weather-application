const request = require('request')

const geocode  = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGVlcGFuc2h1b2N0MTIiLCJhIjoiY2s3b2hibjFqMDhqeDNtcDlqcTd1NmZ0dCJ9.CSNPO6QxX2svY_MTtjdp9A&limit=1'
      
   // request({ url: url , json : true }, (error,response) => {
    request({ url , json : true }, (error,{body}) => {
            
       
       if(error){
           callback('unable to connect to services', undefined)

       }
    //   else if(response.body.features.length === 0){
       else if(body.features.length === 0){
           callback('unable to find location try another search', undefined)
       }
       else{
           /*     callback(undefined,{                   //error is undefined
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            location :response.body.features[0].place_name  */
        callback(undefined,{                   //error is undefined
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location :body.features[0].place_name
        })    

       }


    })
}

module.exports = geocode