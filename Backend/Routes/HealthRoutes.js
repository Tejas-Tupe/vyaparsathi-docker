import express from "express";
import Health from "../Controllers/health.js";

const router = express.Router();

router.get("/", Health);

export default router;
