import { validationResult } from "express-validator";
import { CaptainModel } from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";

export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req)    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullName, email, password, vehicle } = req.body;
    const hashPassword = await CaptainModel.hashPassword(password);
    try {
        const captainExsist = await CaptainModel.findOne({ email });    
        if(captainExsist){
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
        res.status(201).json({
            message: "Captain registered successfully",
            captain,
            token
        }).cookie("token",token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        })
    }catch (error) {
        console.log(error);
    }
}