import express from "express";
const router = express.Router()
// For validation we need to use express-validator
import { body } from "express-validator";
import { LoginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { getUserProfile } from "../controllers/user.controllers.js";
import { profileMiddleware } from "../middlewares/auth.middleware.js";

router.post("/register", [
    body('email').isEmail().withMessage("Please enter a valid email address"),
    body('fullName.firstName').isLength({min:3}).withMessage("First name must be at least 3 characters long"),
    body('fullName.lastName').isLength({min:3}).withMessage("Last name must be at least 3 characters long"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long")
], registerUser)

router.post("/login",[
    body('email').isEmail().withMessage("Please enter a valid email address"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 characters long")
],LoginUser)

router.get("/profile", profileMiddleware, getUserProfile)
router.get("/logout", logoutUser)
export default router