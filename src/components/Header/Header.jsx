import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LogOut from "../LogOut/LogOut";
import Profile from "../Profile/Profile";

import { selectIsLoggedIn } from "../../redux/auth/selectors";
import logo from "../../images/logo.webp";
import s from "./Header.module.css";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={s.container}>
      <Link className={s.link} to="/">
        <img className={s.logo} alt="logo" src={logo} />
      </Link>
      {isLoggedIn && <Profile />}
      {isLoggedIn && <LogOut />}
    </div>
  );
};

export default Header;
