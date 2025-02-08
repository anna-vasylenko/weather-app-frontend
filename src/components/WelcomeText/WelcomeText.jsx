import s from "./WelcomeText.module.css";

const WelcomeText = ({ text }) => {
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Твої дані – твій прогноз</h2>
      <p className={s.text}>{text}</p>
    </div>
  );
};

export default WelcomeText;
