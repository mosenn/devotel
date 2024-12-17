import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const fetchForecast = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily`,
      {
        params: { lat, lon, key: API_KEY },
      }
    );
    return response.data.data;
  } catch (err) {
    console.log("fetch forecCast", err);
  }
};
