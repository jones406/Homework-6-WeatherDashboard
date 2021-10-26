let cityFormEl = document.getElementById("cityname");
let submitButton = document.getElementById('btn');
let cwTable = document.getElementById("weatherdata");


setInterval(currentTime, 60000);
//grab date/time from moment API 
function currentTime() {
  let dateTime = moment().format('LLLL');
  let timeEl = document.getElementById("currenttime");
  timeEl.innerHTML = dateTime
}
currentTime();

//User enters a city name and presses "Get Weather" button
let formSubmitHandler = function (event) {
  event.preventDefault();
  let cityName = cityFormEl.value.trim(); //grab input from form and trim
  if (cityName) {
    getWeather(cityName);
    document.getElementsByClassName("resultsbox")[0].style.display = "table";
    document.getElementById("forecast").style.display = "block";
  } else {
    alert("Enter a city.");
  }
}

//One Call API gives all required data, but the URL requires lat/long. To avoid the user having to enter lat/long, I first used the current weather API call that takes in city name and returns lat/long. The next API call takes returned lat/long to use in the one call API.
let getWeather = function (cityName) {
  const APIkey = 'f4458c0fc59bb2bcd5a17322c84ac36e';
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;
  fetch(queryURL).then(function (response) { //take API call response
    return response.json();  //convert response to JSON
  }).then(function (data) {
    const lat = data.coord.lat; //get lat/long for one call API fetch
    const lon = data.coord.lon;
    const query2URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,hourly,minutely&units=imperial&appid=${APIkey}`;
    fetch(query2URL).then(function (response) {
      return response.json();
    })
      .then(function (data) {
        console.log(data);
        let cwHead = document.getElementById("cwtablehead");
        cwHead.innerHTML = `${cityName}'s Current Weather`;

        if (Array.from(cwTable.rows).length) {
          cwTable.deleteRow(0);
          cwTable.deleteRow(1);
          cwTable.deleteRow(2);
          cwTable.deleteRow(3);
        }

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
        let wfHead = document.getElementById("wftablehead");
        wfHead.innerHTML = "5-Day Forecast";
        //loop thru forecast array for data to make a 5-day forecast
        for (let i = 0; i < 5; i++) {
          let card = document.createElement("div");
          card.classList.add("wf-card");
          const colHead = document.createElement("h6");
          colHead.textContent = "Day " + [i + 1]
          card.appendChild(colHead)

          const descriptionDiv = document.createElement("div");
          descriptionDiv.textContent = data.daily[i].weather[0].description

          const icon = data.daily[i].weather[0].icon;
          const iconImageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
          const iconEl = document.createElement("img");
          iconEl.src = iconImageURL;
          descriptionDiv.appendChild(iconEl)

          card.appendChild(descriptionDiv)

          const tempDiv = document.createElement("div");
          tempDiv.textContent = " Temperature (F): " + data.daily[i].temp.day
          card.appendChild(tempDiv)
          const humidityDiv = document.createElement("div");
          humidityDiv.textContent = " Humidity: " + data.daily[i].humidity
          card.appendChild(humidityDiv)
          const windDiv = document.createElement("div");
          windDiv.textContent = " Wind Speed: " + data.daily[i].wind_speed
          card.appendChild(windDiv)
          const uvDiv = document.createElement("div");
          uvDiv.textContent = " UV Index: " + data.daily[i].uvi
          card.appendChild(uvDiv)
          wfcontainer.appendChild(card)
          // console.log("Day " + [i + 1] + " Humidity: " + data.daily[i].humidity);
          // console.log("Day " + [i + 1] + " Temperature (F): " + data.daily[i].temp.day);
          // console.log("Day " + [i + 1] + " Wind Speed: " + data.daily[i].wind_speed);
          // console.log("Day " + [i + 1] + " UV Index: " + data.daily[i].uvi);
          // //create table and append
          // let row = document.createElement("tr");
          // for (let j = 0; j < 5; j++) {
          //   let cell = document.createElement("td");
          //   //let day1 = document.createTextNode("cell in row " + i + ", column " + j);
          //   let d1h = document.createTextNode("Day " + [i + 1] + " Humidity: " + data.daily[i].humidity + " ");
          //   let d1t = document.createTextNode("Day " + [i + 1] + " Temperature (F): " + data.daily[i].temp.day + " ");
          //   let d1w = document.createTextNode("Day " + [i + 1] + " Wind Speed: " + data.daily[i].wind_speed + " ");
          //   let d1u = document.createTextNode("Day " + [i + 1] + " UV Index: " + data.daily[i].uvi + " ");
          //   cell.appendChild(d1h);
          //   cell.appendChild(d1t);
          //   cell.appendChild(d1w);
          //   cell.appendChild(d1u);
          //   row.appendChild(cell);
          // }
          // wfTable.appendChild(row);
        }
      })
  })
}

//TO DO: use local storage to store persistent data

submitButton.addEventListener('click', formSubmitHandler);