import { useSelector } from "react-redux";
import { selectObservations } from "../../redux/observations/selectors";

import ObservationCard from "../ObservationCard/ObservationCard";

import s from "./ObservationList.module.css";
import Instruction from "../Instruction/Instruction";

const ObservationList = () => {
  const observations = useSelector(selectObservations);

  return (
    <>
      {observations.length === 0 ? (
        <Instruction />
      ) : (
        <ul className={s.list}>
          {observations.map((observation) => (
            <ObservationCard key={observation._id} observation={observation} />
          ))}
        </ul>
      )}
    </>
  );
};

export default ObservationList;
