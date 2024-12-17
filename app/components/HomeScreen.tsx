"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCurrentWeather } from "../hooks/useWeather";
import ProviderReactQuery from "../providers/queryClinet";
import WeatherDetails from "./WeatherDetails";
import SearchCity from "./SearchCity";

const ScreenUI = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [unit, setUnit] = useState<string>("metric"); // 'metric' for Celsius, 'imperial' for Fahrenheit

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("lat", position.coords.latitude);
          console.log("long", position.coords.longitude);

          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const { data, isLoading, isError } = useCurrentWeather(lat ?? 0, lon ?? 0); 

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };
  console.log("data in home screen", data);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching weather data.</div>;

  const temp = data?.temp
    ? unit === "metric"
      ? data?.temp
      : (data?.temp * 9) / 5 + 32
    : "";
  const unitLabel = unit === "metric" ? "°C" : "°F";
  const src = `https://www.weatherbit.io/static/img/icons/${data?.weather?.icon}.png`;

  return (
    <ProviderReactQuery>
      <div className="p-4">
        {/*  */}
        <div className=" md:flex md:flex-col md:justify-center items-center  bg-gradient-to-b from-indigo-600 to-indigo-800 min-h-screen text-white flex flex-col p-6 rounded-md">
          {/* Header Section */}
          <div className="flex items-center justify-between  w-full md:max-w-screen-md ">
            <div>
              <p className="text-lg font-medium">📍 {data?.city_name}</p>
              <p className="text-sm text-gray-300">
                description : {data?.weather.description}
              </p>
            </div>
            <div className="text-gray-300">
              <Image
                width={50}
                height={50}
                alt="icon"
                src={src}
                loader={() => src}
              />
            </div>
          </div>

          {/* Current Temperature */}
          <div className="text-center mt-8  w-full ">
            <p className="text-5xl font-bold">
              {temp} <sup>{unitLabel}</sup>
            </p>
            <div className="flex justify-center gap-4 mt-2 text-gray-300">
              <button
                onClick={toggleUnit}
                className="mt-4 p-2 bg-blue-100 text-black rounded"
              >
                Switch to {unit === "metric" ? "Fahrenheit" : "Celsius"}
              </button>
            </div>
          </div>

          {/* Weather Details */}

          <WeatherDetails datetime={""} wind_spd={0} uv={0} weather={{
            description: ""
          }} temp={0} rh={0} sunrise={""} {...data} />

          {/* Hourly Forecast */}
          <main className=" mt-6  w-full text-center flex justify-center items-center flex-col ">
            <h2 className="text-lg font-semibold mb-2">Hourly Forecast</h2>
            <section className="w-full md:max-w-[40%] lg:max-w[200px] lg:p-4 flex justify-between items-center bg-white/10  rounded-lg">
              <SearchCity/>
            </section>
          </main>
          {/* Tomorrow Forecast */}
          <section className="mt-6 bg-white/10 p-4 rounded-lg backdrop-blur-md">
            <h2 className="text-lg font-semibold mb-2">Tomorrow</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-2xl">🌧️</p>
                <p className="text-lg">Light Rain Showers</p>
              </div>
              <p className="text-lg">↑ 17° ↓ 10°</p>
            </div>
          </section>
        </div>
    
      </div>
    </ProviderReactQuery>
  );
};

export default ScreenUI;
