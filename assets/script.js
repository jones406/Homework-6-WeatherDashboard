
let weatherResults = document.getElementById("weather-table");
let cityFormEl = document.getElementById("cityname");
let submitButton = document.getElementById('btn');
let chosenCity = document.getElementById('return');

//User enters a city name and presses "Get Weather" button
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

//The one call API requires lat and long. So, user types in a city name, which is stored in the above cityName variable. Take the city name and get it's lat and long. Input lat/long into the queryURL for the onecall API URL

let getWeather = function (cityName) {
  const APIkey = 'f4458c0fc59bb2bcd5a17322c84ac36e';
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;
  fetch(queryURL).then(function(response) { //take API call response
      return response.json();  //convert response to JSON/array
    }).then(function(data) {
      console.log(data);
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      console.log("latitude: " + lat + " longitude: " + lon);
      let query2URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,hourly,minutely&appid=${APIkey}`;
      fetch(query2URL).then(function (response) {
        return response.json();})
        .then(function(data) {
          console.log(data);
      })})}
  



      //get current AND future weather
      //return city name, date, icons rep of weather condition, temp, humidity, wind speed, UV index

      //use local storage to store persistent data

      submitButton.addEventListener('click', formSubmitHandler);

//AskBCS Okay so data is showing us the object and you can see there is a lot of information inside it, in the console.log open them up and identify what info you need. You won’t be able to for loop through it and to pull the data, instead I suggest you define variable based on the dot notation of data example: “var humidity = weather.humidity;” then you need to build each component individually dynamically updating the HTML create a div using .createElement -> set attributes -. create elements -> and then using textContent initialize the variables example: humidityEl.textContent = Humidity: ${humidity} %; (edited) 