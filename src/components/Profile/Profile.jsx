import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import s from "./Profile.module.css";

const Profile = () => {
  const user = useSelector(selectUser);

  return (
    <div className={s.profile}>
      <p className={s.icon}>{user.name.charAt(0)}</p>
      <p className={s.name}>{user.name}</p>
    </div>
  );
};

export default Profile;
