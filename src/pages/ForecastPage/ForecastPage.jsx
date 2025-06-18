import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Papa from "papaparse";

import Navigation from "../../components/Navigation/Navigation";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import ForecastForm from "../../components/ForecastForm/ForecastForm";
import ForecastTable from "../../components/ForecastTable/ForecastTable";
import Graph from "../../components/Graph/Graph";
import Button from "../../components/Button/Button";
import Instruction from "../../components/Instruction/Instruction";

import { getLocations } from "../../redux/locations/operations";
import {
  selectForecastLocation,
  selectLocations,
} from "../../redux/locations/selectors";

import s from "./ForecastPage.module.css";
import { getCurrentWeather } from "../../redux/weather/operations";
import { selectUser } from "../../redux/auth/selectors";
import { selectObservations } from "../../redux/observations/selectors";

const ForecastPage = () => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const forecastLocation = useSelector(selectForecastLocation);
  const user = useSelector(selectUser);
  const observations = useSelector(selectObservations);
  const location = forecastLocation ? forecastLocation : user.location;

  const [forecastData, setForecastData] = useState([]);
  const [showForecast, setShowForecast] = useState(false);
  const [daysRequested, setDaysRequested] = useState(null);

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(getLocations());
    }
  }, [dispatch, locations]);

  useEffect(() => {
    if (location) {
      dispatch(
        getCurrentWeather({
          latitude: location.latitude,
          longitude: location.longitude,
        })
      );
    }
  }, [dispatch, location]);

  const isPonornytsia = location?.name?.toLowerCase() === "понорниця";
  const hasObservations = Boolean(observations && observations.length > 0);

  const getFilePrefix = () => (isPonornytsia ? "p_" : "");
  const getFileSuffix = () => (hasObservations ? "" : "_w");

  const getForecastCode = () => {
    if (daysRequested === 1) return "1";
    if (daysRequested > 1 && daysRequested < 10) return "7";
    if (daysRequested >= 10 && daysRequested < 20) return "14";
    if (daysRequested >= 20 && daysRequested < 90) return "60";
    if (daysRequested >= 90 && daysRequested < 365) return "365";
    if (daysRequested >= 365 && daysRequested < 730) return "730";
    return "730";
  };

  const handleForecastSubmit = (days) => {
    setDaysRequested(Number(days));
    setShowForecast(true);
  };

  const getCsvFileName = () => {
    return `${getFilePrefix()}weather_forecast_${getForecastCode()}${getFileSuffix()}.csv`;
  };

  const getImagePath = () => {
    return `/assets/${getFilePrefix()}weather_forecast_${getForecastCode()}${getFileSuffix()}.png`;
  };

  const loadCsv = async () => {
    try {
      const fileName = getCsvFileName();
      const response = await fetch(`/assets/${fileName}`);
      const text = await response.text();

      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setForecastData(results.data);
        },
      });
    } catch (error) {
      console.error("Помилка при зчитуванні даних:", error);
    }
  };

  useEffect(() => {
    if (showForecast && daysRequested !== null) {
      loadCsv();
    }
  }, [showForecast, daysRequested]);

  return (
    <div className={s.page}>
      <div>
        <Navigation />
        <ForecastForm onSubmitSuccess={handleForecastSubmit} />
        {showForecast && (
          <>
            <Graph src={getImagePath()} />
            <Button imageSrc={getImagePath()} forecastData={forecastData} />
          </>
        )}
      </div>
      <div>
        <WeatherCard location={location?.name} />
        {!showForecast && <Instruction />}
        {showForecast && <ForecastTable data={forecastData} />}
      </div>
    </div>
  );
};

export default ForecastPage;
