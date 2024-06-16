import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error("Error signing in with email and password", error);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <span className="form-title">Вход</span>
      <div className="form-group">
        <label className="form-label">Электронная почта</label>
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">
          Пароль
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
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
