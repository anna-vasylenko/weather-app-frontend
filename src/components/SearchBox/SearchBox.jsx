import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import clsx from "clsx";
import { useId } from "react";
import { Form, Formik } from "formik";

import { updateLocation } from "../../redux/auth/slice";
import { selectLocations } from "../../redux/locations/selectors.js";

import s from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);

  const locationFieldId = useId();

  const locationsOptions = locations.map((location) => ({
    value: location._id,
    label: location.name,
  }));

  const initialValues = {
    location: null,
  };

  const handleSubmit = (values) => {
    const { location } = values;
    console.log(location);

    dispatch(updateLocation({ name: location.label, _id: location.value }));
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
                value={values.location}
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
