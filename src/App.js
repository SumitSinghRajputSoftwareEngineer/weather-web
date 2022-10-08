import { useState } from "react";
import "./App.css";
import day from "./day.jpg";
import rain from './rain.png';
import sun from './sun.png';
import haze from './haze.png';
import fog from './fog.png';
import cloud from './cloud.png';
import mist from './mist.png';
import drizzle from './drizzle.png';
const api = {
  key: "3bc9b9853bd5a5e850d1cf912b499de0"
};
function App() {
  const [state, setState] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setState('');
          setWeather(result);
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  let weatherIcon = ()=>{
    let w = weather.weather[0].main;
    if(w==="Clouds"){
      return cloud;
    }
    else if(w==="Haze"){
      return haze;
    }
    else if(w==="Rain"){
      return rain;
    }
    else if(w==="Fog"){
      return fog;
    }
    else if(w==="Mist"){
      return mist;
    }
    else if(w==="Drizzle"){
      return drizzle;
    }
    else{
      return sun;
    }
  }
  return (
    <div className="App">
      <div className="container">
        <main>
          <div className="container_searchbox">
            <input
              type="text"
              className="search_bar"
              placeholder="    Search..."
              onChange={(e) => setState(e.target.value)}
              value={state}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
            <div>
            <div className="location_box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather_box">
            <div className="temp">{Math.round(weather.main.temp - 273)} °C</div>
            <div className="min_max">Min Temp: {Math.round(weather.main.temp_min -273)}°C  Max Temp: {Math.round(weather.main.temp_max -273)}°C</div>
            <div className="weather">{weather.weather[0].main}</div>
            <div className="weather_logo"><img src={weatherIcon()} alt="weather logo"/></div>
          </div>
            </div>
          ):('')}
          
        </main>
      </div>
    </div>
  );
}


export default App;
