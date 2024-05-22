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
  }); // expires in 24 hours

  user.password = Hashpassword;
  user.token = token;

  user
    .save()
    .then(() => {
      res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          expiresIn: 86400,
          secure: true,
        })
        .send({ name: req.body.name, email: req.body.email, token });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};

const PostLogin = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  try {
    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    ); // compare password

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
          expiresIn: 86400,
          secure: true, // Only send cookie over HTTPS
        })
        .send({ name: user.name, email: user.email, token });
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { PostSignup, PostLogin };
