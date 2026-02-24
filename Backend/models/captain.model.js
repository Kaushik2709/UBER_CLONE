import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const captainSchema = new mongoose.Schema({
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
        lowercase:true,
        minlength:[5,'Email must be at least 5 characters long']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be at least 3 characters long']
        },
        numberPlate:{
            type:String,
            required:true,
            minlength:[5,'Number plate must be at least 5 characters long']
        },
        capacity:{
            type:Number,
            required:true,
                min:[1,'Capacity must be at least 1'],
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["car","bike","auto"]
        },
    },
    location:{
        latitude:{
            type:Number,
            min:-90,
        },
        longitude:{
            type:Number,
            min:-180,
        }
    }
})

captainSchema.statics.generateAuthToken = function(userId) {
    const token = jwt.sign({_id:userId}, process.env.JWT_SECRET,{expiresIn:"24h"})
    return token;
}
captainSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}
captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10)
}

export const CaptainModel = mongoose.model("Captain",captainSchema)