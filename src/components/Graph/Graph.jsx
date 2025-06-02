import s from "./Graph.module.css";

const Graph = ({ src }) => {
  return (
    <div className={s.graphWrapper}>
      <img className={s.graph} alt="Прогноз" src={src} />
    </div>
  );
};

export default Graph;
