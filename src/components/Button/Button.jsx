import s from "./Button.module.css";
import { saveAs } from "file-saver";

const Button = ({ imageSrc, forecastData }) => {
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "weather_forecast.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadCSV = () => {
    if (!forecastData || forecastData.length === 0) return;

    const headers = Object.keys(forecastData[0]);
    const csvRows = [];

    csvRows.push(headers.join(","));

    forecastData.forEach((row) => {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '""');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });

    saveAs(blob, "weather_forecast.csv");
  };

  const handleDownloadAll = () => {
    downloadImage();
    downloadCSV();
  };

  return (
    <button className={s.btn} type="button" onClick={handleDownloadAll}>
      Завантажити прогноз
    </button>
  );
};

export default Button;
