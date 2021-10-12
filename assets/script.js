let APIkey = "f4458c0fc59bb2bcd5a17322c84ac36e";
let city = "";

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} required parameters: q is the query parameter where we ad city variable and appid parameters is where we add the api key var

let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;



fetch('api.openweathermap.org/data/2.5/forecast?id=524901&appid=f4458c0fc59bb2bcd5a17322c84ac36e')

.then(function(response) {
    return response.json();
})
//will return resolved or rejected for a response.


//use local storage to store persistent data\

//search for a city

//get current AND future weather

//return city name, date, icons rep of weather condition, temp, humidity, wind speed, UV index
