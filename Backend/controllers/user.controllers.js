import { UserModel } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password } = req.body;
    try {
        const hashedPassword = await UserModel.hashPassword(password);
        const user = await createUser({ firstName: fullName.firstName, lastName: fullName.lastName, email, password: hashedPassword });
        const userToken = UserModel.generateAuthToken(user._id);
        res.status(201).json({ message: "User registered successfully", user, token: userToken });
    } catch (error) {
        console.log(error);
        
    }
}