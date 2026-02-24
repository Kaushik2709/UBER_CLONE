import { validationResult } from "express-validator";
import { CaptainModel } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import blacklistTokeModel from "../models/blacklistToke.model.js";

export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullName, email, password, vehicle } = req.body;
    const hashPassword = await CaptainModel.hashPassword(password);
    try {
        const captainExsist = await CaptainModel.findOne({ email });
        if (captainExsist) {
            return res.status(400).json({ message: "Captain already exsist with this email" })
        }
        const captain = await createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.numberPlate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        })
        const token = CaptainModel.generateAuthToken(captain._id);
        res.status(201).cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }).json({
            message: "Captain registered successfully",
            captain,
            token
        })
    } catch (error) {
        console.log(error);
    }
}

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { email, password } = req.body
        console.log("Login attempt - Email:", email);
        const captain = await CaptainModel.findOne({ email: email.toLowerCase() }).select("+password")
        console.log("Captain found:", captain ? "Yes" : "No");
        if (!captain) {
            return res.status(400).json({ message: "Captain not found" })
        }
        const isPasswordMatched = await captain.comparePassword(password)
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid password" })
        }
        const token = CaptainModel.generateAuthToken(captain._id)
        res.status(200).cookie("token", token, {
            httpOnly: true,
        }).json({
            message: "captain logged in successfully",
            captain,
            token
        })
    } catch (error) {
        console.log("Login error:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getCaptainProfile = async (req, res, next) => {
    try {
        res.status(200).json({
            captain: req.captain
        })
    } catch (error) {
        console.log(error)
    }
    next()
}

export const logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        
        if(token) {
            try {
                await blacklistTokeModel.create({ token });
            } catch(blacklistError) {
                console.log("Blacklist error:", blacklistError.message);
            }
        }
        
        res.clearCookie('token').status(200).json({
            message: "captain logged out successfully"
        });
    } catch(error) {
        console.log("Logout error:", error);
        res.status(500).json({ message: "Logout failed" });
    }
    next();
}