import Header from "./Components/Header/Header.jsx";
import Hero from "./Components/Hero/Hero.jsx";
import Companies from "./Components/Companies/Companies.jsx";
import "./App.css";
import { useState } from "react";
import Residencies from "./Components/Residencies/Residencies.jsx";
import Value from "./Components/Value/Value.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import GetStarted from "./Components/GetStarted/GetStarted.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword.jsx";
import Resetpassword from "./Components/Resetpassword/Resetpassword.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import Signup from "./Components/Signup/Signup.jsx";
import Login from "./Components/Login/Login.jsx";
import NewsForm from "./Components/NewsForm/NewsForm.jsx";
import SellPage from "./Components/SellPage/SellPage.jsx";
import LostAndFoundForm from "./Components/LostAndFoundForm/LostAndFoundForm.jsx";
import CarpoolForm from "./Components/CarpoolForm/CarpoolForm.jsx";
import BuyAndSellPage from "./Components/BuyAndSellPage/BuyAndSellPage.jsx";
import LostAndFoundPage from "./Components/LostAndFound/LostAndFound.jsx";
import Carpool from "./Components/Carpool/Carpool.jsx";
function App() {
  const url = "http://localhost:8000";
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <>
                <div className="App">
                  <div>
                    <div className="white-gradient" />
                    <Header />
                    <Hero url={url} setUser={setUser} user={user}></Hero>
                  </div>
                  <Companies />
                  <Residencies />
                  <Value />
                  <Contact />
                  <GetStarted />
                  <Footer></Footer>
                </div>
              </>
            }
          />
          <Route path="/login" element={<Login url={url}></Login>} />
          <Route path="/" element={<Login url={url}></Login>} />
          <Route path="/signup" element={<Signup url={url}></Signup>} />
          <Route
            path="/forgot-password"
            element={<ForgetPassword url={url}></ForgetPassword>}
          />
          <Route
            path="/resetpassword"
            element={<Resetpassword url={url}></Resetpassword>}
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile url={url} user={user} setUser={setUser}></Profile>
            }
          />
          <Route
            path="/newsSubmit"
            element={<NewsForm url={url}></NewsForm>}
          ></Route>
          <Route path="/sell" element={<SellPage url={url}></SellPage>}></Route>
          <Route
            path="/lost-and-found-form"
            element={<LostAndFoundForm url={url}></LostAndFoundForm>}
          ></Route>
          <Route
            path="/lost-found"
            element={<LostAndFoundPage url={url}></LostAndFoundPage>}
          ></Route>
          <Route
            path="/carpool-form"
            element={
              <CarpoolForm
                url={url}
                user={user}
                setUser={setUser}
              ></CarpoolForm>
            }
          />
          <Route
            path="/carpool"
            element={<Carpool url={url}></Carpool>}
          ></Route>
          <Route
            path="/buy-and-sell"
            element={<BuyAndSellPage></BuyAndSellPage>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
