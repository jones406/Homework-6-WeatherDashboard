let cityFormEl = document.getElementById("cityname");
let submitButton = document.getElementById('btn');
let cwTable = document.getElementById("weatherdata");
let wfTable = document.getElementById("weatherforecast");
let cw = document.getElementById("cw");
let wf = document.getElementById("wf");

//User enters a city name and presses "Get Weather" button
let formSubmitHandler = function (event) {
  event.preventDefault();
  let cityName = cityFormEl.value.trim(); //grab input from form and trim
  if (cityName) {
    getWeather(cityName);
  } else {
    alert("Enter a city.");
  }
};

//I want to use the One Call API as it gives all the required data, but the URL requires lat/long. To avoid the user having to enter lat/long, I first used the current weather API call that takes in city name and returns lat/long. The next API call takes returned lat/long to use in the one call API.
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
        let cwHead = document.getElementById("cwtablehead"); //grab current weather table head
        cwHead.innerHTML = `${cityName}'s Current Weather`; //add header text w/ city name
        //create rows in the table
        let tempRow = cwTable.insertRow(0); 
        let humRow = cwTable.insertRow(1);
        let winRow = cwTable.insertRow(2);
        let uviRow = cwTable.insertRow(3);
        
        //add data to rows
        tempRow.innerHTML = "Temperature (F): " + data.current.temp; 
        humRow.innerHTML = "Humidity: " + data.current.humidity;
        winRow.innerHTML = "Wind: " + data.current.wind_speed;
        uviRow.innerHTML = "UV Index: " + data.current.uvi;
        
        //make weather forecast table header
        let wfHead = document.getElementById("wftablehead"); //grab forecast table head
        wfHead.innerHTML = `${cityName}'s 5-Day Weather Forecast`; //add header text w/ city name

        //loop thru forecast array for data to make a 5-day forecast
        for (let i = 0; i < 5; i++) {
          console.log("Day " + [i + 1] + " Humidity: " + data.daily[i].humidity);
          console.log("Day " + [i + 1] + " Temperature (F): " + data.daily[i].temp.day);
          console.log("Day " + [i + 1] + " Wind Speed: " + data.daily[i].wind_speed);
          console.log("Day " + [i + 1] + " UV Index: " + data.daily[i].uvi);
          
          //create table and append
          let row = document.createElement("tr");
          for (let j = 0; j < 5; j++) {
            let cell = document.createElement("td");
            let cellText = document.createTextNode("cell in row "+i+", column "+j);
            cell.appendChild(cellText);
            row.appendChild(cell);
          }
          wfTable.appendChild(row);
        }
      })
  })
}

//TO DO: return date, weather icons
//TO DO: use local storage to store persistent data

submitButton.addEventListener('click', formSubmitHandler); 