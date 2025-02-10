import s from "./Button.module.css";

const Button = () => {
  return (
    <button className={s.btn} type="button">
      Зберегти прогноз
    </button>
  );
};

export default Button;
