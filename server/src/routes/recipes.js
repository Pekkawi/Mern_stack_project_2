import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/recipes";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find();
  } catch (err) {
    res.json(err);
  }
});

export { router as recipesRouter };
