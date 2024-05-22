import { User } from "../model/model.js";
import "dotenv/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const PostSignup = async (req, res) => {
  const user = new User(req.body);

  if (
    !user.name ||
    !user.email ||
    !user.password ||
    (await User.findOne({ email: req.body.email }))
  ) {
    return res.status(400).send("PLEASE ENTER CORRECT DETAILS");
  }

  const Hashpassword = bcrypt.hashSync(req.body.password, 8);
  if (!Hashpassword) {
    return res.status(500).send("Error hashing password");
  }
  var token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY, {
    expiresIn: 86400,
  });
  user.password = Hashpassword;
  user.token = token;

  user
    .save()
    .then(() => {
      res
        .status(201)
        .send({ name: req.body.name, email: req.body.email, token });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};

const PostLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send("User not found");
  }
  if (user.password !== req.body.password) {
    return res.status(403).send("Invalid password");
  }
  res.status(200).send("Login successful");
};

export { PostSignup, PostLogin };
