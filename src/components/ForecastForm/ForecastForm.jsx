import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import clsx from "clsx";

import { selectLocations } from "../../redux/locations/selectors";
import { addForecastSchema } from "../../helpers/addForecastSchema";
import { selectLocation } from "../../redux/auth/selectors";

import s from "./ForecastForm.module.css";

const ForecastForm = () => {
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
    days: "",
  };

  const handleSubmit = (values, action) => {
    const { location, days } = values;

    console.log({ locationId: location.value, days });
    action.resetForm();
  };

  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={addForecastSchema}
      >
        {({ values, setFieldValue }) => (
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

            <label className={s.label}>
              Кількість днів :
              <div>
                <Field name="days" className={s.input} placeholder="7" />
              </div>
              <ErrorMessage
                name="days"
                component="span"
                className={s.errorMessage}
              />
            </label>

            <button className={s.btnSubmit} type="submit">
              Сформувати прогноз
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForecastForm;
