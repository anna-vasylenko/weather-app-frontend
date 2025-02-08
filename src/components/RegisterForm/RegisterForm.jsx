import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";

import { registrationSchema } from "../../helpers/registrationSchema";
import { registerThunk } from "../../redux/auth/operations";

import s from "./RegisterForm.module.css";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values, action) => {
    dispatch(registerThunk(values));
    action.resetForm();
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={registrationSchema}
          validateOnBlur={true}
        >
          <Form className={s.form}>
            <label className={s.label}>
              Ім’я *
              <div>
                <Field name="name" className={s.input} placeholder="..." />
              </div>
              <ErrorMessage
                name="name"
                component="span"
                className={s.errorMessage}
              />
            </label>
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
              Зареєструватися
            </button>
            <span className={s.span}>
              Вже з нами?
              <Link className={s.link} to="/login">
                Увійти
              </Link>
            </span>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
