import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import clsx from "clsx";
import { useId } from "react";
import { Form, Formik } from "formik";

import { selectLocations } from "../../redux/locations/selectors.js";

import s from "./SearchBox.module.css";
import { selectLocation } from "../../redux/auth/selectors.js";
import { getLocation } from "../../redux/locations/operations.js";

const SearchBox = () => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);
  const currentLocation = useSelector(selectLocation);

  const locationFieldId = useId();

  const locationsOptions = locations.map((location) => ({
    value: location._id,
    label: location.name,
  }));

  const initialValues = {
    location:
      locationsOptions.find(
        (option) => option.value === currentLocation?._id
      ) || null,
  };

  const handleSubmit = (values) => {
    const { location } = values;
    dispatch(getLocation({ id: location.value }));
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form className={s.form}>
            <div>
              <label className={s.label} htmlFor={locationFieldId}>
                Локація *
              </label>
              <Select
                id={locationFieldId}
                name="location"
                placeholder="Оберіть локацію"
                options={locationsOptions}
                value={
                  values.location ||
                  locationsOptions.find(
                    (option) => option.value === currentLocation?._id
                  )
                }
                onChange={(selectedOption) => {
                  setFieldValue("location", selectedOption);
                }}
                classNamePrefix="react-select"
                className={clsx(s.selectInput, s.selectLocation)}
              />
            </div>

            <button type="submit" className={s.btnSubmit}>
              Обрати
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBox;
