import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./profile.module.css";
import axios from "axios";

const ProfilePage = ({ url, user, setUser }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

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

  return (
    <div className={style.main}>
      <div className={style.profile_box}>
        <div className={style.left}>
          <img src="/dummy.png" alt="User" className={style.profile_image} />
        </div>
        <div className={style.separator}></div>
        <div className={style.right}>
          <h2>Profile Information</h2>
          <form>
            <div className={style.form_group}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                disabled
              />
            </div>
            <div className={style.form_group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                disabled
              />
            </div>
          </form>
          <button className="btn btn-primary">
            <Link to="/home">Go Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
