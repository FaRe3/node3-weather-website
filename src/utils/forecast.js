const request = require('postman-request')

const forecast=(lattitude , longitude , callback)=>{
      const url = 'http://api.weatherstack.com/current?access_key=286d39c101322ef7f2125d834914369d&query='+lattitude+','+longitude+'&units=m'
      
      request({url:url,json:true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect with the weather service",undefined)
            }
        else if(body.error){
            callback("Unable to find the location",undefined)
            }
        else{
            callback(undefined,(body.current.weather_descriptions[0]+"."+" It is currently "+(body.current.temperature)+" degree . But it feels like "+(body.current.feelslike)+" out there."))    
            }
      })
}

module.exports=forecast