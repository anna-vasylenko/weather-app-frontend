import { CiStopwatch } from "react-icons/ci";

import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loader}>
      <CiStopwatch className={s.icon} />
    </div>
  );
};

export default Loader;
