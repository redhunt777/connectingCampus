import mongoose from "mongoose";
import { Schema } from "mongoose";

const carpoolSchema = new Schema({
  destination: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Carpool = mongoose.model("Carpool", carpoolSchema);
export default Carpool;
