import { Link } from "react-router-dom";

import logo from "../../images/logo.webp";
import s from "./Header.module.css";

const Header = () => {
  return (
    <div className={s.container}>
      <Link className={s.link} to="/">
        <img className={s.logo} alt="logo" src={logo} />
      </Link>
    </div>
  );
};

export default Header;
