import { useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations";

import s from "./LogOut.module.css";

const LogOut = () => {
  const dispatch = useDispatch();
  const handleClickLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <button
      className={s.buttonLogOut}
      type="button"
      onClick={handleClickLogout}
    >
      Вихід
    </button>
  );
};

export default LogOut;
