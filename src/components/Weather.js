import React, { useState, useEffect } from "react";
import "./style/Weather.css";
import Skycons from "react-skycons";

const WeatherIcon = ({ icon }) => {
  return (
    <Skycons
      color="white"
      className="weather-icon"
      icon={icon.replace(/-/g, "_").toUpperCase()}
      autoplay={true}
    />
  );
};

const Weather = ({ report, checkTime }) => {
  const [isMorning, setMorning] = useState(false);
  const [isAfternoon, setAfternoon] = useState(false);
  const [isEvening, setEvening] = useState(false);
  useEffect(() => {
    let today = new Date();
    let curHr = today.getHours();

    if (curHr < 12) {
      console.log("Good Morning");
      setMorning(true);
    } else if (curHr < 18) {
      console.log("Good Afternoon");
      setAfternoon(true);
    } else {
      console.log("Good Evening");
      setEvening(true);
    }
  }, []);

  useEffect(() => {
    console.log("Hey Called");
    checkTime({ isMorning, isAfternoon, isEvening });
  });

  const { temperature, summary, icon } = report.currently;
  const timezone = report.timezone;
  return (
    <div className="weather">
      <div className="location">
        <h1 className="location-timezone">{timezone}</h1>
        <WeatherIcon icon={icon} />
      </div>

      <div className="temprature">
        <div className="degree-section">
          <h2 className="temprature-degree">{temperature}</h2>
          <span>F</span>
        </div>
      </div>

      <div className="temprature-description">{summary}</div>
    </div>
  );
};

export default Weather;
