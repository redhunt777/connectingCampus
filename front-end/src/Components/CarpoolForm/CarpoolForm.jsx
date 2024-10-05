import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CarpoolForm = ({ url, user, setUser }) => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`${url}/auth/user/verify`);
        console.log("verify user");

        if (response.data.status) {
          setUser(response.data);
          console.log(response.data); // Log the response directly after setting
        } else {
          navigate("/login");
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Unauthorized, redirect to login
          navigate("/login");
        } else {
          console.error("An error occurred while verifying the user:", error);
          // Optionally handle other errors, like showing a notification to the user
        }
      }
    };

    verifyUser(); // Call the function inside useEffect

    // No clean-up needed since this is a one-time call
  }, [url, navigate]); // Added url and navigate as dependencies

  const [formData, setFormData] = useState({
    destination: "",
    source: "",
    date: "",
    time: "",
    agree: false,
  });

  const [errors, setErrors] = useState({
    destination: "",
    source: "",
    date: "",
    time: "",
    agree: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, agree: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let formErrors = {
      source: "",
      destination: "",
      date: "",
      time: "",
      agree: "",
    };

    let isValid = true;

    if (!formData.source) {
      formErrors.source = "Please provide a valid Source.";
      isValid = false;
    }

    if (!formData.destination) {
      formErrors.destination = "Please provide a valid destination.";
      isValid = false;
    }

    if (!formData.date) {
      formErrors.date = "Please provide a  valid date";
      isValid = false;
    }

    if (!formData.time) {
      formErrors.time = "Please provide a valid time";
      isValid = false;
    }

    if (!formData.agree) {
      formErrors.agree = "You must agree before submitting.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("source", formData.source);
      formDataToSend.append("destination", formData.destination);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("time", formData.time);
    }

    const data = {
      source: formData.source,
      destination: formData.destination,
      date: formData.date,
      time: formData.time,
      name: user.name,
      email: user.email,
    };
    console.log(data);
    axios
      .post(`${url}/submit/carpool`, data)
      .then((res) => {
        console.log(res.data);
        alert("Form successfully submitted");
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
        alert("Error in submitting form");
      });
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url("/hero-image.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Header />
        <div
          className="container"
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <div className="row">
            <div className="col-8 offset-2">
              <h1>Carpooling</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    placeholder="Enter destination"
                    id="title"
                    className="form-control"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">{errors.title}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Source
                  </label>
                  <input
                    name="source"
                    id="description"
                    placeholder="Enter source"
                    className="form-control"
                    value={formData.source}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">{errors.description}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="category"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">{errors.category}</div>
                </div>
                <div className="mb-3">
                  <label htmlFor="category1" className="form-label">
                    Time
                  </label>
                  <input
                    name="time"
                    type="time"
                    id="category1"
                    className="form-control"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">{errors.category}</div>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="agree">
                    Please enter all the fields
                  </label>
                  <div className="invalid-feedback">{errors.agree}</div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarpoolForm;
