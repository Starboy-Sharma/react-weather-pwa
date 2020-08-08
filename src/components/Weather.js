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
  const [temperature, setTemperature] = useState(report.currently.temperature);
  const [action, setAction] = useState("F");

  const { summary, icon } = report.currently;
  const timezone = report.timezone;

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

  const convertTemp = () => {
    if (action === "F") {
      // Convert in C
      var fTemp = temperature;
      var fToCel = ((fTemp - 32) * 5) / 9;
      fToCel = fToCel.toFixed(2);

      setTemperature(fToCel);
      setAction("C");
    } else {
      setTemperature(report.currently.temperature);
      setAction("F");
    }
  };

  return (
    <div className="weather">
      <div className="location">
        <h1 className="location-timezone">{timezone}</h1>
        <WeatherIcon icon={icon} />
      </div>

      <div className="temprature">
        <div className="degree-section" onClick={convertTemp}>
          <h2 className="temprature-degree">{temperature}</h2>
          <span>{action}</span>
        </div>
      </div>

      <div className="temprature-description">{summary}</div>
    </div>
  );
};

export default Weather;
