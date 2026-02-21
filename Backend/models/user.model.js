import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
             minlength:[3,'First name must be at least 3 characters long']
        },
        lastName:{
            type:String,
            required:true,
             minlength:[3,'Last name must be at least 3 characters long']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'Email must be at least 5 characters long']
    },
    password:{
        type:String,
        required:true,
    },
    socketId:{
        type:String,

    }
})

userSchema.statics.generateAuthToken = (userId) => {
    const token = jwt.sign({_id:userId}, process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async(password) => {
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

export const UserModel = mongoose.model("User",userSchema)