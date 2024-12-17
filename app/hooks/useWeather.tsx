
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentWeather } from '../services/weatherService';
import { fetchForecast } from '../services/forecastService';

export const useCurrentWeather = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ['currentWeather', lat, lon],
    queryFn: () => fetchCurrentWeather(lat, lon),
    staleTime: 1000 * 60 * 5, // 5 دقیقه
  });
  
};

export const useForecast = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ['forecast', lat, lon],
    queryFn: () => fetchForecast(lat, lon),
    staleTime: 1000 * 60 * 10, // 10 دقیقه
  });
};
