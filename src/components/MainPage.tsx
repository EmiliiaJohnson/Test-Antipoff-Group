import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import ".././App.css";

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    navigate("/signIn");
  };

  return (
    <div className="about-us">
      <button className="sign-out" onClick={handleSignOut}>
        Выход
      </button>
      <div>
        <h1>Наша команда</h1>
        <p>
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
          ложатся на их плечи, и умеющие находить выход из любых, даже самых
          сложных ситуаций.
        </p>
      </div>
    </div>
  );
};

export default MainPage;
