import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Navigation from "../../components/Navigation/Navigation";
import { getLocations } from "../../redux/locations/operations";

import s from "./ForecastPage.module.css";

const ForecastPade = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  return (
    <div className={s.page}>
      <Navigation />
    </div>
  );
};

export default ForecastPade;
