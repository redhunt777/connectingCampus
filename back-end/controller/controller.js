import { User } from "../model/model.js";

const PostSignup = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
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
