import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";
import WelcomeText from "../../components/WelcomeText/WelcomeText";

import s from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={s.container}>
      <Header />
      <div className={s.wrapper}>
        <LoginForm />
        <WelcomeText text="Отримай доступ до власних спостережень та персоналізованих прогнозів." />
      </div>
    </div>
  );
};

export default LoginPage;
