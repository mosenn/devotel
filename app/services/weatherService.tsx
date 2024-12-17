import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const fetchCurrentWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`https://api.weatherbit.io/v2.0/current`, {
      params: { lat, lon, key: API_KEY },
    });
    return response.data.data[0];
  } catch (err) {
    console.log("error fetch current weather", err);
  }
};
