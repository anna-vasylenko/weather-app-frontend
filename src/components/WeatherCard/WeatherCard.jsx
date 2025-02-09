import s from "./WeatherCard.module.css";

const WeatherCard = () => {
  return (
    <div className={s.card}>
      <p className={s.date}>09.02.2025 17:10</p>
      <ul className={s.list}>
        <li className={s.item}>
          <p className={s.text}>Температура :</p>
          <p className={s.value}>-3.7°C</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Відчувається як :</p>
          <p className={s.value}>-7.7°C</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Вологість :</p>
          <p className={s.value}>84%</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Імовірність опадів :</p>
          <p className={s.value}>0%</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Опади :</p>
          <p className={s.value}>0 мм</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Швидкість вітру :</p>
          <p className={s.value}>5.9 км/год</p>
        </li>
        <li className={s.item}>
          <p className={s.text}>Напрямок вітру :</p>
          <p className={s.value}>11°C</p>
        </li>
      </ul>
    </div>
  );
};

export default WeatherCard;
