import express from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controllers.js";
import { registerCaptain } from "../controllers/captaion.controller.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address"),

    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),

    body("fullName.lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("vehicle.color")
      .notEmpty()
      .withMessage("Vehicle color is required"),

    body("vehicle.numberPlate")
      .notEmpty()
      .withMessage("Vehicle number plate is required"),

    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1"),

    body("vehicle.vehicleType")
      .notEmpty()
      .withMessage("Vehicle type is required"),
  ],
     registerCaptain
);




export default router;