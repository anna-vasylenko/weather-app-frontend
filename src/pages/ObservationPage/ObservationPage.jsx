import { useDispatch } from "react-redux";
import { useEffect } from "react";

import AddForm from "../../components/AddForm/AddForm";
import Navigation from "../../components/Navigation/Navigation";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import ObservationList from "../../components/ObservationList/ObservationList";

import SearchBox from "../../components/SearchBox/SearchBox";
import { getObservations } from "../../redux/observations/operations";
import { getLocations } from "../../redux/locations/operations";

import s from "./ObservationPage.module.css";

const ObservationPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
    dispatch(getObservations());
  }, [dispatch]);

  return (
    <div className={s.page}>
      <div>
        <Navigation />
        <SearchBox />
        <AddForm />
      </div>
      <div>
        <WeatherCard />
        <p className={s.text}>Мої спостереження :</p>
        <ObservationList />
      </div>
    </div>
  );
};

export default ObservationPage;
