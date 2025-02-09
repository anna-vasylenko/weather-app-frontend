import * as Yup from "yup";

export const addObservationSchema = Yup.object({
  date: Yup.date().required("Обов’язкове поле "),
  temperature: Yup.number()
    .required("Обов’язкове поле")
    .typeError("Значення має бути числом"),
  humidity: Yup.number().typeError("Значення має бути числом"),
  precipitation: Yup.number().typeError("Значення має бути числом"),
  windSpeed: Yup.number().typeError("Значення має бути числом"),

  windDirection: Yup.number().typeError("Значення має бути числом"),
});
