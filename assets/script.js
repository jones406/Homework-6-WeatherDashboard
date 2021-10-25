
let cityFormEl = document.getElementById("cityname");
let submitButton = document.getElementById('btn');
let cwTable = document.getElementById("weatherdata");
let wfTable = document.getElementById("weatherforecast");
let cwTableHead = document.getElementById('tablehead');
let wfTableHead = document.getElementById('tablehead2');

//User enters a city name and presses "Get Weather" button
let formSubmitHandler = function (event) {
  event.preventDefault();
  let cityName = cityFormEl.value.trim(); //grab input from form and trim
  if (cityName) {
    getWeather(cityName);
    cwTableHead.append(cityName + ' Current Weather:');
    wfTableHead.append(cityName + ' 5-Day Weather Forecast:');
  } else {
    alert("Enter a city.");
  }
};

//Function to retrieve weather data by making an API call.
//The One Call API gives all the info we need, but it requires lat and long. To avoid the user having to enter lat/long, we use a different API call that takes in city name and returns lat/long. The next API call takes returned lat/long to use in the one call API.
let getWeather = function (cityName) {
  const APIkey = 'f4458c0fc59bb2bcd5a17322c84ac36e';
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;
  fetch(queryURL).then(function (response) { //take API call response
    return response.json();  //convert response to JSON
  }).then(function (data) {
    let lat = data.coord.lat; //get lat/long for one call API fetch
    let lon = data.coord.lon;
    let query2URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,hourly,minutely&units=imperial&appid=${APIkey}`;
    fetch(query2URL).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        console.log(data);
        ///let wRow = cwTable.insertRow(0);
        let tempRow = cwTable.insertRow(0);
        let humRow = cwTable.insertRow(1);
        let winRow = cwTable.insertRow(2);
        let uviRow = cwTable.insertRow(3);
        //wRow.innerHTML = data.current.weather);
        //above line: still working on adding icon, weather description for current weather
        tempRow.innerHTML = "Temperature (F): " + data.current.temp;
        humRow.innerHTML = "Humidity: " + data.current.humidity;
        winRow.innerHTML = "Wind: " + data.current.wind_speed;
        uviRow.innerHTML = "UV Index: " + data.current.uvi;

        for (let i = 0; i < 5; i++) {
          console.log("Day " + [i + 1] + " Humidity: " + data.daily[i].humidity);
          console.log("Day " + [i + 1] + " Temperature (F): " + data.daily[i].temp.day);
          console.log("Day " + [i + 1] + " Wind Speed: " + data.daily[i].wind_speed);
          console.log("Day " + [i + 1] + " UV Index: " + data.daily[i].uvi);
        }
      })
  })
}

//TO DO: return date, weather icons
//TO DO: use local storage to store persistent data

submitButton.addEventListener('click', formSubmitHandler); 