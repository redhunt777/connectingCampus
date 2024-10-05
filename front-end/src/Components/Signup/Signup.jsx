import React, { useState, useEffect } from "react";
import "./signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ url }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Basic validation
    const EmailRegex = /^[a-zA-Z0-9._%+-]+@bitmesra\.ac\.in$/; // Adjust to your college's domain

    // Email validation
    if (!EmailRegex.test(email)) {
      setError(
        "Email should be a valid college email (e.g., name@bitmesra.ac.in)"
      );
      return;
    }

    const data = {
      email,
      password,
      username,
    };

    axios
      .post(`${url}/auth/user/signup`, data)
      .then((res) => {
        if (res.data.status) {
          navigate("/login");
        } else {
          setError(res.data.message);
          navigate("/signup");
        }
      })
      .catch((err) => {
        alert("Something went wrong! Please try again.");
        navigate("/signup");
      });
    console.log("Form submitted", formData);
    setError(""); // Reset any error messages
  };

  return (
    <div className="signupC">
      <div className="signup-container" style={styles.container}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        <span>
          <Link to="/login">Already a user?</Link>
        </span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    width: "35%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  field: {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
};

export default Signup;
