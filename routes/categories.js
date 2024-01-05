import express from "express";
import { Category } from "../models/Category.js";

const router = express.Router();

// CREATE CATEGORY
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json({ message: "category created successfully!", data: savedCat });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL CATEGORY
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json({ status: "success", result: cats.length, message: "category returned!", data: cats });
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as categoryRoute };
