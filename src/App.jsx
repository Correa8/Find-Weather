import React from 'react';
import './app.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from './components/Weather';

const App = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(null);
  const [gradesCel, setGradesCel] = useState(true);
  navigator.geolocation.getCurrentPosition((position) => {
    setLongitude(position.coords.longitude);
    setLatitude(position.coords.latitude);
    console.log(longitude);
    console.log(latitude);
  });

  const getWeather = async () => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1d4407cd8e297ed94b328101b6d05461`,
    );
    console.log(res.data);
    setLocation(res.data);
  };
  useEffect(() => {
    if (latitude != null && longitude != null) {
      getWeather();
    }
  }, [latitude]);
  return (
    <>
      <Weather
        location={location}
        setLocation={setLocation}
        gradesCel={gradesCel}
        setGradesCel={setGradesCel}
      />
    </>
  );
};

export default App;
