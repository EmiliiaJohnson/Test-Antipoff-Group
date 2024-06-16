import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import ".././App.css";

const CreateUser: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error("Error signing up with email and password", error);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <span className="form-title">Регистрация</span>
      <div className="form-group">
        <label className="form-label">
          Имя
          <input
            className="form-input"
            type="text"
            placeholder="Артур"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Электронная почта
          <input
            className="form-input"
            type="email"
            value={email}
            placeholder="example@mail.ru"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Пароль
          <input
            className="form-input"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          Подтвердите пароль
          <input
            className="form-input"
            type="password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>
      <button className="form-group form-input form-button" type="submit">
        Зарегистрироваться
      </button>
      <div className="form__change-action">
        Уже есть аккаунт?
        <Link to="/signIn" className="change-action__link">
          Войти
        </Link>
      </div>
    </form>
  );
};

export default CreateUser;
