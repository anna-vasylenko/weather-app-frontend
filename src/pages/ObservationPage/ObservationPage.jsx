import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import AddForm from "../../components/AddForm/AddForm";
import Navigation from "../../components/Navigation/Navigation";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import ObservationList from "../../components/ObservationList/ObservationList";

import SearchBox from "../../components/SearchBox/SearchBox";
import { getObservations } from "../../redux/observations/operations";
import { getLocations } from "../../redux/locations/operations";
import { getCurrentWeather } from "../../redux/weather/operations";
import { selectUser } from "../../redux/auth/selectors";
import { selectLocations } from "../../redux/locations/selectors";

import s from "./ObservationPage.module.css";
import { resetForecastLocation } from "../../redux/locations/slice";

const ObservationPage = () => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const { location } = useSelector(selectUser);

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(getLocations());
    }
  }, [dispatch, locations]);

  useEffect(() => {
    dispatch(getObservations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetForecastLocation());
  }, [dispatch]);

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
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
        <SearchBox />
        <AddForm />
      </div>
      <div>
        <WeatherCard location={location.name} />
        <p className={s.text}>Мої спостереження :</p>
        <ObservationList />
      </div>
    </div>
  );
};

export default ObservationPage;
