import mongoose from "mongoose";
import { Schema } from "mongoose";

const newsSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
});

const News = mongoose.model("News", newsSchema);
export { News };
