import { UserModel } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokeModel from "../models/blacklistToke.model.js";

export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullName, email, password } = req.body;
  try {
    const userExsist = await UserModel.findOne({ email });
    if (userExsist) {
        return res.status(400).json({ message: "User already exsist with this email" });
    }
    const user = await createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password,
    });
    const userToken = UserModel.generateAuthToken(user._id);
    
    res.cookie("token", userToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }).status(201).json({
      message: "User registered successfully",
      user,
      token: userToken,
    });
  } catch (error) {
    console.log(error);
  }
  next();
};

export const LoginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const ExsistingUser = await UserModel.findOne({ email }).select(
      "+password",
    );
    if (!ExsistingUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const isPassWordValid = await ExsistingUser.comparePassword(password);
    if (!isPassWordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const userToken = UserModel.generateAuthToken(ExsistingUser._id); 
    res.cookie("token", userToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }).status(200).json({
      message: "Login successful",
      user: ExsistingUser,
      token: userToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
  next();
};

export const getUserProfile = async (req, res, next) => {

    res.status(200).json({ user: req.user });
    next();
}

export const logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        if(token) {
            try {
                await blacklistTokeModel.create({ token });
            } catch(blacklistError) {
                // If token is already blacklisted or other db error, continue with logout
                console.log("Blacklist error:", blacklistError.message);
            }
        }
        
        res.clearCookie("token").status(200).json({ message: "Logout successful" });
    } catch(error) {
        console.log("Logout error:", error);
        res.status(500).json({ message: "Logout failed" });
    }
    next();
}