import React from "react";

interface WeatherProps {
  datetime: string;
  wind_spd: number;
  uv: number;
  weather: { description: string };
  temp: number;
  rh: number;
  sunrise: string;
}

const WeatherDetails = ({
  wind_spd,
  rh,
  temp,
  datetime,
  weather,
  uv,
  sunrise,
}: WeatherProps) => {
  const windSpeedKmh = (wind_spd * 3.6).toFixed(1);

  return (
    <main className="p-4 bg-purple-600 text-white rounded-lg my-5 w-full md:max-w-[40%] lg:max-w-[30%] border">
      {/* Row 1 */}
      <ul className=" mb-4 flex justify-between mt-5">
        <li>
          <p className="text-lg font-semibold">{datetime.slice(-5)}</p>
          <p className="text-sm">🌧️ {weather.description}</p>
        </li>
        <li>
          <p className="text-lg font-semibold">{windSpeedKmh} km/h</p>
          {/* <p className="text-sm">🍃 Gentle breeze</p> */}
        </li>
        <li>
          <p className="text-lg font-semibold">UV{uv}</p>
          <p className="text-sm">☀️ {sunrise}</p>
        </li>
      </ul>

      {/* Additional Info */}
      <section className="  text-sm flex justify-between mt-5">
        <div className="flex justify-between">
          <span>🌡️ Temperature:</span>
          <span>{temp}°C</span>
        </div>
        <div className="flex justify-between">
          <span>rh:{rh}%</span>
        </div>
      </section>
    </main>
  );
};

export default WeatherDetails;
