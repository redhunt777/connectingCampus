import mongoose from "mongoose";
import { Schema } from "mongoose";

const lostFoundSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const LostFound = mongoose.model("LostFound", lostFoundSchema);
export default LostFound;
