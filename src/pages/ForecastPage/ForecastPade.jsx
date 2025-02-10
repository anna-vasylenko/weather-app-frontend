import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Navigation from "../../components/Navigation/Navigation";
import WeatherCard from "../../components/WeatherCard/WeatherCard";
import ForecastForm from "../../components/ForecastForm/ForecastForm";
import ForecastTable from "../../components/ForecastTable/ForecastTable";
import Graph from "../../components/Graph/Graph";
import Button from "../../components/Button/Button";

import { getLocations } from "../../redux/locations/operations";
import s from "./ForecastPage.module.css";

const ForecastPade = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  return (
    <div className={s.page}>
      <div>
        <Navigation />
        <ForecastForm />
        <Graph />
        <Button />
      </div>
      <div>
        <WeatherCard />
        <ForecastTable />
      </div>
    </div>
  );
};

export default ForecastPade;
