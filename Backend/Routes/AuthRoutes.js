import express from "express";
import { signup, login, updateProfile, deleteAccount, changePassword } from "../Controllers/AuthController.js";
import { signupSchema, loginSchema, updateProfileSchema, changePasswordSchema } from "../Joi Schemas/UserSchemas.js";
import { validater } from "../Middlewares/Validation.js";
import protect from "../Middlewares/Authentication.js";

const router = express.Router();

// Public routes
router.post("/signup", validater(signupSchema), signup);
router.post("/login", validater(loginSchema), login);

// Protected routes (require login)
router.post("/changepassword", validater(changePasswordSchema), protect, changePassword);
router.delete("/deleteaccount", protect, deleteAccount);
router.post("/editprofile", validater(updateProfileSchema), protect, updateProfile);

export default router;
