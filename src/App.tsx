import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import SignIn from "./components/SignIn";
import MainPage from "./components/MainPage";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  console.log(window.location.pathname);
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<MainPage />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
