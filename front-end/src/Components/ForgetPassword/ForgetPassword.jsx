import React from "react";
import { Link } from "react-router-dom";
import "./forgetPass.scss";

const ForgetPassword = () => {
  return (
    <div className="forgotPassword">
      <h1>Forgot Password?</h1>
      <h2> Don't Worry Enter Your Email Here</h2>
      <form>
        <input
          type="email"
          name="email"
          placeholder="Enter your email here ..."
          required
        ></input>
        <input
          type="submit"
          value="Send mail"
          className="btn btn-outline-light"
        />
      </form>

      <p>Check your email for further details !</p>

      <span>
        <Link to="/login">←prev</Link>
      </span>
    </div>
  );
};

export default ForgetPassword;
