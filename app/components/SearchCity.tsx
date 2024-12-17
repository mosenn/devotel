"use client";

import { useState } from "react";
import ProviderReactQuery from "../providers/queryClinet";
import axios from "axios";

const SearchCity = () => {
  const [city, setCity] = useState("");

  const [weatherData, setWeatherData] = useState({
    name: "",
    sys: { country: "" },
    weather: [{ description: "" }],
    main: { temp: 0, humidity: "" },
    wind: { speed: 0 },
  });
  const [status , setStatus] = useState(0)
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: process.env.NEXT_PUBLIC_GEOCODING_API_KEY,
            units: "metric", // برای دریافت دما به سلسیوس
          },
        }
      );
      // `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`
      console.log(response, "response");
      setStatus(response.status)
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProviderReactQuery>
      <div className="container mx-auto ">
        <form className="mb-4 flex justify-center" onSubmit={handleSearch}>
          <input
            style={{ color: "black" }}
            type="text"
            className="p-2 border border-gray-300 rounded-l"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r"
          >
            Search
          </button>
        </form>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : status === 200 ? (
          <div className="bg-purple-600 text-white p-4 rounded-lg shadow-lg">
            <h1 className="text-center text-2xl">
              {weatherData.name}, {weatherData.sys.country}
            </h1>
            <div className="flex justify-around mt-4">
              <div className="text-center">
                <p>{weatherData.weather[0].description}</p>
                <p>{weatherData.main.temp}°C</p>
              </div>

              <div className="text-center">
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} km/h</p>
                <p>UV Index: {weatherData.main.temp > 30 ? "High" : "Low"}</p>
              </div>
            </div>

            {/* بخش پیش‌بینی فردا */}
            <div className="mt-6">
              <h2 className="text-center text-xl">Tomorrows Forecast</h2>
              <div className="flex justify-around mt-4">
                <div className="text-center">
                  <p>Light Rain Showers</p>
                  <p>Max Temp: 17°C</p>
                  <p>Min Temp: 10°C</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">
            Please search for a city to get weather information.
          </p>
        )}
      </div>
      {/*  */}
    </ProviderReactQuery>
  );
};
export default SearchCity;
