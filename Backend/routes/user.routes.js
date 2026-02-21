import express from "express";
const router = express.Router()
// For validation we need to use express-validator
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controllers.js";

router.post("/register", [
    body('email').isEmail().withMessage("Please enter a valid email address"),
    body('fullName.firstName').isLength({min:3}).withMessage("First name must be at least 3 characters long"),
    body('fullName.lastName').isLength({min:3}).withMessage("Last name must be at least 3 characters long"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long")
], registerUser)

export default router