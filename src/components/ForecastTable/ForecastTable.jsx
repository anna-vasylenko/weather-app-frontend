import React from "react";
import s from "./ForecastTable.module.css";

const headersMap = {
  temperature_2m: "Температура (°C)",
  apparent_temperature: "Відчувається як (°C)",
  relative_humidity_2m: "Вологість (%)",
  precipitation_probability: "Імовірність опадів (%)",
  precipitation: "Опади (мм)",
  wind_speed_10m: "Швидкість вітру (км/год)",
  wind_direction_10m: "Напрямок вітру (°)",
  time: "Час",
};

const ForecastTable = ({ data }) => {
  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  return (
    <div className={s.wrapper}>
      <div className={s.card}>
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>
                    {headersMap[header] || header.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {headers.map((key) => (
                    <td key={key}>{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ForecastTable;
