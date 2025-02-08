import * as Yup from "yup";

export const logInSchema = Yup.object({
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
