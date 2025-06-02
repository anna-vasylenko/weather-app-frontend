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

const ForecastPage = () => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const forecastLocation = useSelector(selectForecastLocation);
  const user = useSelector(selectUser);
  const location = forecastLocation ? forecastLocation : user.location;

  const [forecastData, setForecastData] = useState([]);
  const [showForecast, setShowForecast] = useState(false);
  const [daysRequested, setDaysRequested] = useState(null);
  const [hasObservations, setHasObservations] = useState(false);

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

  const handleForecastSubmit = (days) => {
    setDaysRequested(Number(days));
    setShowForecast(true);
  };

  const getCsvFileName = () => {
    if (daysRequested === 1) {
      return "weather_forecast_1_without.csv";
    }

    if (daysRequested > 1 && daysRequested < 10) {
      return "weather_forecast_7_without.csv";
    }

    if (daysRequested >= 10 && daysRequested <= 20) {
      return hasObservations
        ? "weather_forecast_14.csv"
        : "weather_forecast_14_without.csv";
    }

    return "weather_forecast_365.csv";
  };

  const getImagePath = () => {
    if (daysRequested === 1) {
      return "/assets/weather_forecast_1_without.png";
    }
    if (daysRequested > 1 && daysRequested < 10) {
      return "/assets/weather_forecast_7_without.png";
    }
    if (daysRequested >= 10 && daysRequested <= 20) {
      return hasObservations
        ? "/assets/weather_forecast_14.png"
        : "/assets/weather_forecast_14_without.png";
    }
    return "/assets/weather_forecast_365.png";
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
      console.error("Помилка при зчитуванні CSV:", error);
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
