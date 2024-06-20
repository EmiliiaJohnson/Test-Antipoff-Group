import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import SignIn from "./components/SignIn";
import MainPage from "./components/MainPage";
import SingleUser from "./components/SingleUser";
import PrivateRoute from "./components/PrivateRoute";
import { StoreProvider } from "./store";

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <main>
          <Routes>
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/user/:id" element={<SingleUser />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </StoreProvider>
  );
};

export default App;
