import graph from "../../images/graph.png";

import s from "./Graph.module.css";

const Graph = () => {
  return (
    <div>
      <img className={s.graph} alt="logo" src={graph} />
    </div>
  );
};

export default Graph;
