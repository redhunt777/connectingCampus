import {
  Login,
  signup,
  generate_OTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
} from "../controller/controller.js";
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/model.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log("signup route");
  await signup(req, res);
});

router.post("/login", async (req, res) => {
  console.log("login route");
  await Login(req, res);
});

router.post("/generate-otp", async (req, res) => {
  console.log("generate-otp route");
  await generate_OTP(req, res);
});

router.post("/verify-otp", async (req, res) => {
  console.log("verify-otp route");
  await verifyOTP(req, res);
});

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("Token not found");
    return res.status(403).json({ status: false, message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Pass the decoded user info to the next middleware
    next();
  } catch (err) {
    console.log("Invalid token", err.message);
    return res.status(403).json({ status: false, message: "Invalid token" });
  }
};

router.get("/verify", verifyUser, async (req, res) => {
  try {
    const { email } = req.user; // Access the decoded token data
    const user = await User.findOne({ email }); // Use findOne instead of find

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    return res.status(200).json({
      email: user.email,
      name: user.name,
      status: true,
      admin: user.admin,
      message: "User verified",
    });
  } catch (err) {
    console.log("Server error", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
});

router.patch("/update", verifyUser, (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    User.findOneAndUpdate(
      { email: decoded.email },
      {
        name: req.body.name,
      }
    ).then(() => {
      res
        .status(200)
        .json({ status: true, message: "Data updated", data: req.body });
    });
  });
});

router.post("/forgotPassword", (req, res) => forgotPassword(req, res));
router.post("/resetPassword/:token", async (req, res) =>
  resetPassword(req, res)
);

router.get("/logout", (req, res) => {
  console.log("logout");
  res
    .clearCookie("token", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None", // Adjust as per your needs
    })
    .json({ status: true, message: "logged out" });
});

export default router;
