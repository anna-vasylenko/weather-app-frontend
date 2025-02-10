import table from "../../images/table.png";

import s from "./ForecastTable.module.css";

const ForecastTable = () => {
  return (
    <div className={s.container}>
      <img className={s.table} alt="logo" src={table} />
    </div>
  );
};

export default ForecastTable;
