import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Residencies.css";
// import data from'../../utils/slider.json';
import { slidersettings } from "../../utils/common";
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";

const Residencies = () => {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  useEffect(() => {
    let isMounted = true; // track whether the component is mounted

    axios
      .get("http://localhost:8000/submit/news")
      .then((res) => {
        if (isMounted) {
          setData(res.data); // set data only if the component is still mounted
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      isMounted = false; // cleanup function to set isMounted to false when component unmounts
    };
  }, []);

  return (
    <section className="r-wrapper">
      <div className="padding innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Upcoming Events</span>
          <span className="primaryText">Newsroom</span>
        </div>
        <div>
          <SearchBar data={data} setSearchedData={setSearchedData}></SearchBar>
        </div>
        <Swiper {...slidersettings}>
          <SliderButtons />
          {searchedData.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="r-card flexColStart">
                <img src={card.image} alt="home" />
                <span className="secondaryText r-price">
                  <span style={{ color: "orange" }}></span>
                  <span className="orangeText">{card.title}</span>
                </span>
                <span className="primaryText">{card.title}</span>
                <span className="secondaryText">{card.description}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Residencies;
const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
