import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

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

const ForecastPade = () => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const forecastLocation = useSelector(selectForecastLocation);
  const user = useSelector(selectUser);
  const [showForecast, setShowForecast] = useState(false);
  const location = forecastLocation ? forecastLocation : user.location;

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

  return (
    <div className={s.page}>
      <div>
        <Navigation />
        <ForecastForm onSubmitSuccess={() => setShowForecast(true)} />
        {showForecast && (
          <>
            <Graph /> <Button />
          </>
        )}
      </div>
      <div>
        <WeatherCard location={location.name} />
        {!showForecast && <Instruction />}
        {showForecast && <ForecastTable />}
      </div>
    </div>
  );
};

export default ForecastPade;
