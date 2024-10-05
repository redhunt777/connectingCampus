import express from "express";
import { News } from "../model/news.js";
import Product from "../model/product.js";
import LostFound from "../model/Lost&Found.js";
import Carpool from "../model/carpool.js";

const router = express.Router();

router.post("/news", async (req, res) => {
  const { title, description, image, category } = req.body;
  console.log(req.body);
  const news = new News({
    title,
    description,
    image,
    category,
  });
  try {
    const savedNews = await news.save();
    res.status(200).json(savedNews);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/news", async (req, res) => {
  try {
    const news = await News.find(); // Use find() instead of findOne() to get all news items from the database
    res.status(200).json(news);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/product", async (req, res) => {
  const { title, price, description, category, image } = req.body;
  console.log(req.body);
  const product = new Product({
    title,
    price,
    description,
    category,
    image,
  });
  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

router.get("/product", async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

router.post("/lostandfound", async (req, res) => {
  const { title, description, category, image } = req.body;
  console.log(req.body);
  const lostFound = new LostFound({
    title,
    description,
    category,
    image,
  });
  try {
    const savedLostFound = await lostFound.save();
    res.status(200).json(savedLostFound);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

router.get("/lostandfound", async (req, res) => {
  try {
    const lostFound = await LostFound.find();
    res.status(200).json(lostFound);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

router.post("/carpool", async (req, res) => {
  const { email, name, time, destination, source, date } = req.body;
  console.log(req.body);
  const carpool = new Carpool({
    email,
    name,
    time,
    destination,
    source,
    date,
  });
  try {
    const savedCarpool = await carpool.save();
    res.status(200).json(savedCarpool);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

export default router;
