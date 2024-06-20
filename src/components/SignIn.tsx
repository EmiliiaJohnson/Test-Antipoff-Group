import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../firebase";
import ".././App.css";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [passwordHidden, hidePassword] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Неверный формат email")
        .required("Обязательное поле"),
      password: Yup.string()
        .min(6, "Не менее 6 символов")
        .required("Обязательное поле"),
    }),
    onSubmit: async (values) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const token = await userCredential.user.getIdToken();
        localStorage.setItem("token", token);
        navigate("/");
      } catch (error) {
        console.error("Error signing in with email and password", error);
      }
    },
  });

  return (
    <form className="auth-form" onSubmit={formik.handleSubmit}>
      <span className="form-title">Вход</span>
      <div className="form-group">
        <label className="form-label">
          Электронная почта
          <input
            className={`form-input ${
              formik.touched.email && formik.errors.email ? "invalid" : ""
            }`}
            type="text"
            placeholder="example@mail.ru"
            {...formik.getFieldProps("email")}
          />
        </label>
        {formik.touched.email && formik.errors.email ? (
          <div className="form-error">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="form-group">
        <label className="form-label" style={{ position: "relative" }}>
          Пароль
          <input
            className={`form-input ${
              formik.touched.password && formik.errors.password ? "invalid" : ""
            }`}
            placeholder="******"
            type={passwordHidden ? "password" : "text"}
            {...formik.getFieldProps("password")}
          />
          <button
            type="button"
            className="show-password"
            onClick={() => hidePassword(!passwordHidden)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_233_221)">
                <path
                  d="M10.7302 5.07319C11.1448 5.02485 11.5684 5 11.9999 5C16.6639 5 20.3998 7.90264 21.9999 12C21.6053 13.0104 21.0809 13.9482 20.4446 14.7877M6.51956 6.51944C4.47949 7.76406 2.90105 9.69259 1.99994 12C3.60008 16.0974 7.33597 19 11.9999 19C14.0375 19 15.8979 18.446 17.4805 17.4804M9.87871 9.87859C9.33576 10.4215 8.99994 11.1715 8.99994 12C8.99994 13.6569 10.3431 15 11.9999 15C12.8284 15 13.5785 14.6642 14.1214 14.1212"
                  stroke="#808185"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 4L20 20"
                  stroke="#808185"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_233_221">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </label>
        {formik.touched.password && formik.errors.password ? (
          <div className="form-error">{formik.errors.password}</div>
        ) : null}
      </div>
      <button className="form-group form-input form-button" type="submit">
        Войти
      </button>
      <div className="form__change-action">
        Еще нет аккаунта?
        <Link to="/createUser" className="change-action__link">
          Создать
        </Link>
      </div>
    </form>
  );
};

export default SignIn;
