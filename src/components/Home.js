import React, { useState, useEffect } from "react";
import "./style/Home.css";

import w from "../api/getWeather";
import Weather from "./Weather";

const LoadWeatherComponent = function (props) {
  if (props.isLoading === true) {
    return <Weather report={props.weather} checkTime={props.checkTime} />;
  }

  return (
    <div className="load-wrapper">
      <p className="loading">Loading...</p>
      <p className="loading">
        <span role="img" aria-label="Load">
          🌍☀⛅☁💧⚡❄
        </span>
      </p>
    </div>
  );
};

const Home = () => {
  const [isLocationAllow, setLocationAllow] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [weatherImg, setWeatherImg] = useState("");

  const checkTime = ({ isMorning, isAfternoon, isEvening }) => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );
    if (isMobileDevice) {
      // Add background Image

      if (isMorning) {
        setWeatherImg("good-morning");
      } else if (isAfternoon) {
        setWeatherImg("good-afternoon");
      } else {
        setWeatherImg("good-night");
      }

      return true;
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationAllow(true);

          (async function () {
            let res = await w.getWeather(position);

            if (res === undefined) {
              console.warn('This app is now going to use fake data.');

              alert("Warning! This app is using sample data. For fix please visit: https://github.com/Starboy-Sharma/react-weather-pwa ");

              res = {};
              res.data = await w.fetchLocalWeather();
              console.log(res);
            }

            setWeather(res.data);
            setLoading(true);
          })();
        },
        () => {
          alert("Please allow your location or clear site data");
          setLocationAllow(false);
        }
      );
    } else {
      alert("This browser is not supported :)");
      setLocationAllow(false);
    }
  }, []);

  return (
    <div className={"container " + weatherImg}>
      {isLocationAllow ? (
        <LoadWeatherComponent
          isLoading={isLoading}
          weather={weather}
          checkTime={checkTime}
        />
      ) : (
        <div className="isLocation">
          <h1 className="welcome-msg">
            You are brighter than a Sirius{" "}
            <span aria-label="Star" role="img">
              ⭐
            </span>
          </h1>
          <p className="weather-req">
            Please Allow Your Location{" "}
            <span aria-label="weather" role="img">
              ⛅
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
