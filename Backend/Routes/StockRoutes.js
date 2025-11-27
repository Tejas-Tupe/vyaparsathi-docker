import express from "express";
import { addStock, refillStock } from "../Controllers/StockController.js";
import protect from "../Middlewares/Authentication.js";

const router = express.Router();

// Add new stock
router.post("/add", protect, addStock);

// Refill existing stock
router.post("/refill", protect, refillStock);

export default router;
