import { PostLogin, PostSignup } from "../controller/controller.js";
import express from "express";

const router = express.Router();
router.post("/signup", PostSignup).post("/login", PostLogin);

export default router;
