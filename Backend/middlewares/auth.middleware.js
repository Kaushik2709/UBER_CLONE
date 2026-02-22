import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import blacklistTokeModel from "../models/blacklistToke.model.js";

export const profileMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({ message: "Unauthorized access no token" });
    }
    const isBlacklisted = await blacklistTokeModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized access" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized access" });
    }    
};
