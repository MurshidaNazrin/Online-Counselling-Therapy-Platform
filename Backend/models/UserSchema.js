import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    //common fields
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true, validate: [validator.isEmail, "Invalid email format"] },
    password: { type: String, required: [true, "Password is required"], minlength: 8 },
    role: { type: String, default: 'client', enum: ["client"] },
    // profileImage: { type: String, default: null },


    // OTP verififcation
    isVerified: { type: Boolean, default: false },
    otp: { type: Number },
    otpExpires: { type: Date },

    // profile info
    gender: { type: String, enum: ["male", "female", "other"], default: null, },
    phone: { type: String, default: null },
    profileImage: { type: String, default: null },

    // For session booking system
    // sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" },],

    // Progress notes from therapist
    // progressNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProgressNotes", },],

    // notifications 
    // notifications: [{ type: Object, default: { title: String, message: String, createdAt: { type: Date, default: Date.now, }, }, },],
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);
export default User;