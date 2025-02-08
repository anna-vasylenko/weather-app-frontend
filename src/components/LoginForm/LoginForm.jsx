import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";

import { loginThunk } from "../../redux/auth/operations";
import { logInSchema } from "../../helpers/loginSchema";

import s from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = { email: "", password: "" };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values, action) => {
    dispatch(loginThunk(values));
    action.resetForm();
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={logInSchema}
          validateOnBlur={true}
        >
          <Form className={s.form}>
            <label className={s.label}>
              Електронна адреса *
              <div>
                <Field
                  type="email"
                  name="email"
                  className={s.input}
                  placeholder="your@email.com"
                />
              </div>
              <ErrorMessage
                name="email"
                component="span"
                className={s.errorMessage}
              />
            </label>
            <label className={s.label}>
              Пароль *
              <div className={s.passwordWrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={s.input}
                  placeholder="Пароль"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={s.eyeButton}
                >
                  {showPassword ? (
                    <MdOutlineVisibilityOff size="18" />
                  ) : (
                    <MdOutlineRemoveRedEye size="18" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className={s.errorMessage}
              />
            </label>
            <button className={s.btnSubmit} type="submit">
              Увійти
            </button>
            <Link className={s.link} to="/register">
              Реєстрація
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
