
let weatherResults = document.getElementById("weather-table");
let cityFormEl = document.getElementById("cityname");
let submitButton = document.getElementById('btn');
let chosenCity = document.getElementById('return');

let formSubmitHandler = function (event) {
  event.preventDefault();
  let cityName = cityFormEl.value.trim(); //grab input from form and trim
  if (cityName) {
    getWeather(cityName);
    chosenCity.append(cityName + ' Weather:');
  } else {
    alert("Enter a city.");
  }
};

//The one call API requires lat and long. So, user types in a city name, which is stored in the above cityName variable.
//Take the city name and get it's lat and long? 

//Input lat/long into the queryURL for the onecall API URL

let getWeather = function(cityName) {
  const APIkey = 'f4458c0fc59bb2bcd5a17322c84ac36e';
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;
  fetch(queryURL)
  .then(function(response) { //take API call response
      return response.json();  //convert response to JSON/array
    })
    .then(function(data) {
      console.log(data);  //after converted, log it
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        let tableRow = document.createElement('tr');
        tableRow.append = data[i].coord.lat;
        
      }
    })
}

//TODOs:

//get current AND future weather
//return city name, date, icons rep of weather condition, temp, humidity, wind speed, UV index

//use local storage to store persistent data

submitButton.addEventListener('click', formSubmitHandler);