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
        const token = captain.generateAuthToken();
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
        const captain = await CaptainModel.findOne({ email }).select("+password")
        if (!captain) {
            return res.status(400).json({ message: "Captain not found" })
        }
        const isPasswordMatched = await captain.comparePassword(password)
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid password" })
        }
        const token = captain.generateAuthToken(captain._id)
        res.status(200).cookie("token", token, {
            httpOnly: true,
        }).json({
            message: "captain logged in successfully",
            captain,
            token
        })
    } catch (error) {
        console.log(error)
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
    res.clearCookie('token').status(200).json({
        message: "captain logged out successfully"
    })
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    await blacklistTokeModel.create({ token })
    next()
}