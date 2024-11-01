import { useEffect, useState } from "react";

const useWeather = () => {
  const [weatherData, setweatherData] = useState({
    location: "",
    climate: "",
    temparature: "",
    maxTemparaure: "",
    minTemparature: "",
    humidity: "",
    cloudPercentage: "",
    wind: "",
    time: "",
    longitude: "",
    latitude: "",
  });

  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });

  const [error, setError] = useState(null);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setLoading({
        ...loading,
        state: true,
        message: "Fetaching Weather Data...",
      });
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&unites=metric`
      );
      if (!response.ok) {
        const errorMessage = `Fetching Weather data failed: ${response.status}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      const updatedData = {
        ...weatherData,
        location: data?.name,
        climate: data?.weather[0]?.main,
        temparature: data?.main?.temp,
        maxTemparaure: data?.main?.temp_max,
        minTemparature: data?.main?.temp_min,
        humidity: data?.main?.humidity,
        cloudPercentage: data?.clouds?.all,
        wind: data?.wind?.speed,
        time: data?.dt,
        longitude: longitude,
        latitude: latitude,
      };
      setweatherData(updatedData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading({
        ...loading,
        state: false,
        message: "",
      });
    }
  };

  useEffect(() => {
    setLoading({
      loading: true,
      message: "Finding location...",
    });
    navigator.geolocation.getCurrentPosition(function (position) {
      fetchWeatherData(position.coords.latitude, position.coords.longitude);
    });

    fetchWeatherData();
  }, []);
  return {
    weatherData,
    error,
    loading,
  };
};

export default useWeather;
