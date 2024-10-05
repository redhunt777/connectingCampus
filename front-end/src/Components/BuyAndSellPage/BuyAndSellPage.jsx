import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./buyAndSell.module.css";
import Header from "../Header/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const BuyAndSellPage = () => {
  axios.defaults.withCredentials = true;
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    let isMounted = true; // track whether the component is mounted
    axios
      .get("http://localhost:8000/submit/product")
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

  const filteredData = category
    ? data.filter((item) => item.category === category)
    : data;

  return (
    <div className={style.main}>
      <Header />
      <h4 style={{ paddingRight: "100px", textAlign: "right" }}>
        <button className="btn btn-primary">
          <Link to="/sell">Want To Sell?</Link>
        </button>
      </h4>
      <div className="container">
        <h1 className="text-center my-4">Shop by Category</h1>
        <div className="d-flex justify-content-center mb-4">
          <select className="form-select w-50" onChange={handleCategoryChange}>
            <option value="" defaults>
              All
            </option>
            <option value="Academics">Academics</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Sports">Sports</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div className="row">
          {filteredData.map((item) => (
            <div className="col-md-4 mb-4" key={item.description}>
              <div className={style.card}>
                <img
                  src={item.image}
                  className={style.card_img_top}
                  alt={item.title}
                />
                <div className={style.card_body}>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <strong>Price: Rs{item.price}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyAndSellPage;
