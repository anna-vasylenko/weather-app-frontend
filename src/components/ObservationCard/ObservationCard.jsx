import dayjs from "dayjs";

import s from "./ObservationCard.module.css";

const ObservationCard = ({ observation }) => {
  const formattedDate = observation.time
    ? dayjs(observation.time).format("DD-MM-YYYY")
    : "-";

  return (
    <div className={s.card}>
      <p className={s.date}>{formattedDate || "-"}</p>
      <ul className={s.list}>
        <li className={s.item}>
          <p className={s.text}>Температура :</p>
          <p className={s.value}>{observation.temperature || ""}°C</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Вологість :</p>
          <p className={s.value}>{observation.humidity || ""}%</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Опади :</p>
          <p className={s.value}>{observation.precipitation || ""} мм</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Швидкість вітру :</p>
          <p className={s.value}>{observation.windSpeed || ""} км/год</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Напрямок вітру :</p>
          <p className={s.value}>{observation.windDirection || ""}°C</p>
        </li>
      </ul>
    </div>
  );
};

export default ObservationCard;
