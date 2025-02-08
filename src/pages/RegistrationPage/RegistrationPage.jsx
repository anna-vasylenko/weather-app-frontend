import Header from "../../components/Header/Header";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import WelcomeText from "../../components/WelcomeText/WelcomeText";

import s from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={s.container}>
      <Header />
      <div className={s.wrapper}>
        <RegisterForm />
        <WelcomeText text="Обирай локацію, переглядай історичні показники або додавай власні спостереження, щоб отримати точний прогноз." />
      </div>
    </div>
  );
};

export default RegistrationPage;
