import "dotenv/config";
import express from "express";
import morgan from "morgan";
import router from "./routes/routes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//middlewares
app.use(morgan("tiny"));
app.use(
  cors({
    origin: true, // allow to server to accept request from different origin
    credentials: true,
  })
);
app.use(express.json()); // body parser middleware for json data parsing from request body
app.use(cookieParser());
app.use("/auth/user", router); // routing

//connect to mongodb
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/test`);
  console.log("Connected to MongoDB");
}

//listen to port
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
