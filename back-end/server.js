import express from "express";
import morgan from "morgan";
import "dotenv/config";
import router from "./routes/routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("tiny"));
app.use(express.json()); // body parser middleware for json data parsing from request body
app.use(cookieParser());
app.use("/user", router); // routing

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("Connected to MongoDB");
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
