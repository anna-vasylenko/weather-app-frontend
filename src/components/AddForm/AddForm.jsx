import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import dayjs from "dayjs";

import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";

import { addObservation } from "../../redux/observations/operations";
import { selectLocation } from "../../redux/auth/selectors";
import { addObservationSchema } from "../../helpers/addObservationSchema";

import s from "./AddForm.module.css";

const AddForm = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);

  const [selectedDate, setSelectedDate] = useState(null);

  const initialValues = {
    date: null,
    temperature: "",
    humidity: "",
    precipitation: "",
    windSpeed: "",
    windDirection: "",
  };

  const handleSubmit = (values, action) => {
    const { date, ...restValues } = values;

    const observation = Object.fromEntries(
      Object.entries({
        ...restValues,
        locationId: location._id,
        time: selectedDate ? dayjs(selectedDate).toISOString() : undefined,
      }).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    dispatch(addObservation(observation));
    action.resetForm();
    setSelectedDate(null);
  };

  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={addObservationSchema}
      >
        {({ setFieldValue }) => (
          <Form className={s.form}>
            <label className={s.label}>
              Дата та час спостереження * :
              <CustomDatePicker
                className={s.input}
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setFieldValue(
                    "date",
                    date ? dayjs(date).format("YYYY-MM-DD") : null
                  );
                }}
              />
            </label>

            <label className={s.label}>
              Температура * :
              <div>
                <Field
                  name="temperature"
                  className={s.input}
                  placeholder="-3.5"
                />
              </div>
              <ErrorMessage
                name="temperature"
                component="span"
                className={s.errorMessage}
              />
            </label>

            <label className={s.label}>
              Вологість :
              <div>
                <Field name="humidity" className={s.input} placeholder="82" />
              </div>
              <ErrorMessage
                name="humidity"
                component="span"
                className={s.errorMessage}
              />
            </label>

            <label className={s.label}>
              Опади :
              <div>
                <Field
                  name="precipitation"
                  className={s.input}
                  placeholder="0.0"
                />
              </div>
              <ErrorMessage
                name="precipitation"
                component="span"
                className={s.errorMessage}
              />
            </label>

            <label className={s.label}>
              Швидкість вітру :
              <div>
                <Field name="windSpeed" className={s.input} placeholder="5.5" />
              </div>
              <ErrorMessage
                name="windSpeed"
                component="span"
                className={s.errorMessage}
              />
            </label>

            <label className={s.label}>
              Напрямок вітру :
              <div>
                <Field
                  name="windDirection"
                  className={s.input}
                  placeholder="5.5"
                />
              </div>
              <ErrorMessage
                name="windDirection"
                component="span"
                className={s.errorMessage}
              />
            </label>

            <button className={s.btnSubmit} type="submit">
              Додати
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddForm;
