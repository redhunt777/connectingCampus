import React from "react";
import { Link } from "react-router-dom";
import "./resetpassword.scss";

const Resetpassword = () => {
  return (
    <div className="forgotPassword">
      <h1>Enter Your New Password!</h1>
      <form>
        <input
          type="password"
          name="password"
          placeholder="Enter your password here ..."
          required
        ></input>
        <input
          type="submit"
          value="Reset Password"
          className="btn btn-outline-light"
        />
      </form>

      <span>
        <Link to="/login">←prev</Link>
      </span>
    </div>
  );
};

export default Resetpassword;
