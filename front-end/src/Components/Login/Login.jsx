import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Signup/signup.css";

const Login = ({ url }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const { email, password } = formData;

    // Basic validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Logic for form submission (e.g., API call) can be added here
    console.log("Login data:", formData);

    const data = {
      email: formData.email,
      password: formData.password,
    };

    axios
      .post(`${url}/auth/user/login`, data)
      .then((res) => {
        if (res.status) {
          navigate("/home");
        } else {
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Password Wrong! Please try again.");
        navigate("/login");
      });
  };

  return (
    <div className="signupC">
      <div className="login-container" style={styles.container}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
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

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <span>
          Don't have an account?{" "}
          <Link to="/signup">
            <span style={{ color: "blue" }}> Sign up</span>
          </Link>
        </span>
      </div>
    </div>
  );
};

// Inline styles for quick styling
const styles = {
  container: {
    width: "350px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
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
    backgroundColor: "#007bff",
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

export default Login;
