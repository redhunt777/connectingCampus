import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./carpool.module.css";
import Header from "../Header/Header";
import axios from "axios";
import { Link } from "react-router-dom";

const Carpool = () => {
  axios.defaults.withCredentials = true;

  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true; // track whether the component is mounted
    axios
      .get("http://localhost:8000/submit/carpool")
      .then((res) => {
        if (isMounted) {
          console.log(res.data);
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
    <div className={style.main}>
      <Header />
      <h4
        style={{
          paddingRight: "100px",
          textAlign: "right",
          paddingTop: "50px",
        }}
      >
        <button className="btn btn-primary">
          <Link to="/carpool-form">Apply for Carpooling</Link>
        </button>
      </h4>
      <div className="container">
        <h1 className="text-center my-4">Carpooling</h1>
        <div className="row">
          {data.map((item) => (
            <div className="col-md-4 mb-4" key={item.description}>
              <div className={style.card}>
                <div className={style.card_body}>
                  <h5 className="card-title">Looking for a Ride?</h5>
                  <p className="card-text">Source: {item.source}</p>
                  <p className="card-text">Destination: {item.destination}</p>
                  <div>
                    <p className="card-text">UserName: {item.name}</p>
                    <p className="card-text">Email: {item.email}</p>
                  </div>
                  <div>
                    <p className="card-text">Date: {item.date}</p>
                    <p className="card-text">Time: {item.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carpool;
