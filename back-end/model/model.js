import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@bitmesra\.ac\.in$/.test(v); // regex for college mail id validation (bitmesra.ac.in)
      },
      message: (props) =>
        `${props.value} is not valid, Enter your college mail id!`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export { User };
