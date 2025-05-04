import { useSelector } from "react-redux";
import { selectCurrentWeather } from "../../redux/weather/selectors";
import s from "./WeatherCard.module.css";

const WeatherCard = ({ location }) => {
  const weather = useSelector(selectCurrentWeather) || {};

  const date = new Date(weather.time);
  date.setHours(date.getHours() + 3);
  const formattedDate = date
    .toLocaleString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
  return (
    <div className={s.card}>
      <p className={s.date}>{location || ""}</p>
      <p className={s.date}>{formattedDate || ""}</p>

      <ul className={s.list}>
        <li className={s.item}>
          <p className={s.text}>Температура :</p>
          <p className={s.value}>{weather.temperature_2m || ""}°C</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Відчувається як :</p>
          <p className={s.value}>{weather.apparent_temperature || ""}°C</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Вологість :</p>
          <p className={s.value}>{weather.relative_humidity_2m || ""}%</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Імовірність опадів :</p>
          <p className={s.value}>{weather.precipitation_probability || "0"}%</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Опади :</p>
          <p className={s.value}>{weather.precipitation || "0"} мм</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Швидкість вітру :</p>
          <p className={s.value}>{weather.windspeed_10m || ""}км/год</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Напрямок вітру :</p>
          <p className={s.value}>{weather.winddirection_10m || ""}°C</p>
        </li>
      </ul>
    </div>
  );
};

export default WeatherCard;
