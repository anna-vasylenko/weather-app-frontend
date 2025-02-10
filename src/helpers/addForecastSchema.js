import * as Yup from "yup";

export const addForecastSchema = Yup.object({
  days: Yup.number()
    .required("Обов’язкове поле")
    .typeError("Значення має бути числом"),
});
