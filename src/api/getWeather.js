import Axios from "axios";

async function fetchWeather(position) {
  try {
    const long = position.coords.longitude;
    const lat = position.coords.latitude;

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const API = `${proxy}https://api.darksky.net/forecast/70da67e5c26bcaf05abd28259558db91/${lat},${long}`;

    // Axios.get(API)
    //   .then(function (response) {
    //     console.log(response);
    //     return response;
    //   })
    //   .catch((error) => {
    //     console.warn("Unable to fetch weather");
    //     console.error(error);
    //   });

    const response = await Axios.get(API);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export default fetchWeather;
