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
function App() {
  return (
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
  );
}

export default App;
