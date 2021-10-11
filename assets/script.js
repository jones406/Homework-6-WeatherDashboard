//select tags in HTML to input data



//read documentation of API
// API ex: call http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}
// ex 2: api.openweathermap.org/data/2.5/forecast?id=524901&appid=f4458c0fc59bb2bcd5a17322c84ac36e

//make a variable to store you API key
//APIkey = "f4458c0fc59bb2bcd5a17322c84ac36e";


fetch('api.openweathermap.org/data/2.5/forecast?id=524901&appid=f4458c0fc59bb2bcd5a17322c84ac36e')

.then(function(response) {
    return response.json();
})
//will return resolved or rejected for a response.


//use local storage to store persistent data


//search for a city

//get current AND future weather

//return city name, date, icons rep of weather condition, temp, humidity, wind speed, UV index
