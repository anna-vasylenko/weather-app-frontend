import { MdMenuBook } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";

import s from "./Instruction.module.css";

const Instruction = () => {
  return (
    <ul className={s.list}>
      <li className={s.item}>
        <p className={s.title}>Крок 1.</p>
        <div className={s.wrapper}>
          <MdMenuBook className={s.icon} />
          <div>
            <p className={s.mainText}>Створіть особистий журнал спостережень</p>
            <p className={s.secondText}>Додайте реальні спостереження</p>
          </div>
        </div>
      </li>
      <li className={s.item}>
        <p className={s.title}>Крок 2.</p>
        <div className={s.wrapper}>
          <SiSimpleanalytics className={s.icon} />
          <div>
            <p className={s.mainText}>Сформуйте свій персональний прогроз</p>
            <p className={s.secondText}>
              Визначте локацію, оберіть період, отримайте персональний прогноз.
            </p>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Instruction;
