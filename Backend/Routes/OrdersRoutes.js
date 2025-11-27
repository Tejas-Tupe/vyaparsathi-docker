import express from "express";
import { createOrder, exportOrdersToExcel, getOrdersByUser, deleteAllOrdersByUser} from "../Controllers/Orders.js";
import protect from "../Middlewares/Authentication.js";

const router = express.Router();

// Create a new order
router.post("/create", protect, createOrder);

// Get all my orders (simple)
router.get("/myorders", protect, getOrdersByUser);

// Get all orders into excel file
router.get("/export", protect, exportOrdersToExcel);

// delete all orders associated with user
router.delete('/delete',protect,deleteAllOrdersByUser);

export default router;
