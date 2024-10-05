import { User } from "../model/model.js";
import "dotenv/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otplib from "otplib";
import { sendOtpFunc, sendMailFunc } from "../email/transporter.js";

const signup = async (req, res) => {
  const data = req.body;
  try {
    const existingStudent = await User.findOne({ email: data.email });
    if (existingStudent) {
      return res.json({ status: false, message: "Student already registered" });
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const student = new User({
      name: data.username,
      email: data.email,
      password: hashedPassword,
    });
    await student.save().then(() => {
      res.json({ status: true, message: "Student registered successfully" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

const Login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      return res.status(404).send("User not found");
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(403).send("Invalid password");
    }

    var token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
      expiresIn: 86400,
    }); // expires in 24 hours

    user.token = token;
    user.save().then(() => {
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
          sameSite: "None", // Allows cross-site cookies; use 'Strict' or 'Lax' if not needed
          maxAge: 24 * 60 * 60 * 1000,
          path: "/", // Cookie will be sent for all routes
        })
        .send({ name: user.name, email: user.email, token });
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

let otpStore = {}; // In-memory store for OTPs (for demo purposes)

// Ensure otplib is correctly configured
otplib.authenticator.options = {
  step: 30, // The time step used for generating the OTP (default is 30 seconds)
  window: 1, // The allowable window for OTP verification (default is 1)
  digits: 6,
  algorithm: "sha1", // The algorithm used for OTP generation (default is 'SHA-1')
};

const generate_OTP = async (req, res) => {
  const { email } = req.body;

  // Check if the email is already registered
  const student = await User.findOne({ email });
  if (student) {
    return res.json({ status: false, message: "Student already registered" });
  }

  const secret = otplib.authenticator.generateSecret();
  const otp = otplib.authenticator.generate(secret);

  // Store the OTP and secret for verification
  otpStore[email] = { otp, secret };

  console.log(`Generated OTP for ${email}: ${otp}`);
  console.log(`Secret for ${email}: ${secret}`);

  // Send the OTP via email
  sendOtpFunc(email, otp, res);
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  // Check if the OTP is stored
  if (!otpStore[email]) {
    return res.status(403).json({
      status: false,
      message: "OTP not found or email invalid",
    });
  }

  const { secret } = otpStore[email];

  console.log(`Verifying OTP for ${email}: ${otp}`);
  console.log(`Stored Secret for ${email}: ${secret}`);

  const isValid = otplib.authenticator.check(otp, secret);

  console.log(`OTP Valid: ${isValid}`);

  if (isValid) {
    delete otpStore[email]; // Clear the OTP after successful validation
    res.json({ status: true, message: "OTP verified" });
  } else {
    res.json({ status: false, message: "Invalid OTP" });
  }
};

const forgotPassword = async (req, res) => {
  const data = req.body;
  try {
    const student = await User.findOne({ email: data.email });
    if (!student) {
      return res
        .status(404)
        .json({ status: false, message: "User doesn't exist!" });
    }

    const token = jwt.sign({ email: student.email }, process.env.SECRET_KEY, {
      expiresIn: "5m",
    });
    sendMailFunc(data, token, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const data = req.body;
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const student = await User.findOne({ email: decoded.email });
    if (!student) {
      return res.json({ status: false, message: "User doesn't exist!" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await User.updateOne(
      { email: decoded.email },
      { $set: { password: hashedPassword } }
    );
    res.status(200).json({ status: true, message: "Password updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export {
  signup,
  Login,
  generate_OTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
};
