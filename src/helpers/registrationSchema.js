import * as Yup from "yup";

export const registrationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(20, "Максимум 20 символів")
    .required("Введіть ім'я"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Некоректний формат email!"
    )
    .required("Введіть email"),
  password: Yup.string()
    .matches(
      /^[^\s]{8,64}$/,
      "Пароль має містити від 8 до 64 символів без пробілів"
    )
    .required("Введіть пароль"),
});
