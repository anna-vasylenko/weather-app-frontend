import clsx from "clsx";

import s from "../Navigation/Navigation.module.css";
import { NavLink } from "react-router-dom";
import { TiWeatherShower } from "react-icons/ti";
import { IoAnalyticsSharp } from "react-icons/io5";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.item, isActive && s.linkActive);
  };
  return (
    <div>
      <nav>
        <ul className={s.list}>
          <li className={s.item}>
            <NavLink className={buildLinkClass} to="/">
              <div className={s.wrapper}>
                <TiWeatherShower className={s.icon} />
              </div>
              <span className={s.navText}>Мої спостереження</span>
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink className={buildLinkClass} to="/forecast">
              <div className={s.wrapper}>
                <IoAnalyticsSharp className={s.icon} />
              </div>
              <span className={s.navText}>Прогноз</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
