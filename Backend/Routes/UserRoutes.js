import express from "express";
import { UserData } from "../Controllers/UserController.js";
import protect from "../Middlewares/Authentication.js";

const router = express.Router();

// Get user dashboard data
router.get("/userdetails", protect, UserData);

export default router;
