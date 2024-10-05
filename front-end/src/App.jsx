import Header from "./Components/Header/Header.jsx";
import Hero from "./Components/Hero/Hero.jsx";
import Companies from "./Components/Companies/Companies.jsx";
import "./App.css";
import Residencies from "./Components/Residencies/Residencies.jsx";
import Value from "./Components/Value/Value.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import GetStarted from "./Components/GetStarted/GetStarted.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import Resetpassword from "./Components/Resetpassword/Resetpassword.jsx";
import Profile from "./Components/Profile/Profile.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="App">
                  <div>
                    <div className="white-gradient" />
                    <Header />
                    <Hero />
                  </div>
                  <Companies />
                  <Residencies />
                  <Value />
                  <Contact />
                  <GetStarted />
                </div>
              </>
            }
          />
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/signup" element={<h1>Signup</h1>} />
          <Route
            path="/forgot-password"
            element={<ForgetPassword></ForgetPassword>}
          />
          <Route
            path="/resetpassword"
            element={<Resetpassword></Resetpassword>}
          ></Route>
          <Route path="/profile" element={<Profile></Profile>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
