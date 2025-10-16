import mongoose from "mongoose";
import validator from "validator";

const TherapistSchema = new mongoose.Schema({

    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true, validate: [validator.isEmail, "Invalid email format"] },
    password: { type: String, required: [true, "Password is required"], minlength: 8 }, 
    role: { type: String, default: 'therapist', enum: ["therapist"]},

     // OTP verififcation
    isVerified: { type: Boolean, default: false },
    otp: { type: Number },
    otpExpires: { type: Date },
    }, { timestamps: true });
    
    
    const Therapist = mongoose.model("Therapist", TherapistSchema);
    export default Therapist;