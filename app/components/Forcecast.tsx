"use client";

import { useForecast } from "../hooks/useWeather";
import ProviderReactQuery from "../providers/queryClinet";
import Image from "next/image";

const Forecast: React.FC<{ lat: number; lon: number; unit: string }> = ({
  lat,
  lon,
  unit,
}) => {
  const { data, isLoading, isError, error } = useForecast(lat, lon); // گرفتن اطلاعات خطا

  if (isLoading) {
    return <div>Loading forecast...</div>;
  }

  if (isError) {
    // در صورتی که خطا پیش بیاید، خطای دقیق‌تر نمایش داده می‌شود
    return (
      <div className="text-red-500">
        <p>Error fetching forecast data:</p>
        <p>
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </p>
      </div>
    );
  }

  return (
    <ProviderReactQuery>
      <div className="grid grid-cols-2 gap-4">

        {data?.map((day:{weather:{icon:string,},datetime:string, temp:number}, ) => {
          const temp = unit === "metric" ? day.temp : (day.temp * 9) / 5 + 32; // تبدیل دما به فارنهایت
          const unitLabel = unit === "metric" ? "°C" : "°F";
          const src = `https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`;

          return (
            <div key={day.datetime} className="p-4 border rounded">
              <p>{day.datetime}</p>
              <p>
                {temp} {unitLabel}
              </p>
              <Image
                loader={() => src}
                src={src}
                alt="icon"
                width={150}
                height={150}
              />
            </div>
          );
        })}

        {/* Tomorrow Forecast */}
   
      </div>
    </ProviderReactQuery>
  );
};

export default Forecast;
