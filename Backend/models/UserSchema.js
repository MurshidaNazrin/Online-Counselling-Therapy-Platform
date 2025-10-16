import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    //common fields
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true, validate: [validator.isEmail, "Invalid email format"] },
    password: { type: String, required: [true, "Password is required"], minlength: 8 }, 
    role: { type: String, default: 'client', enum: ["client"]},
    // profileImage: { type: String, default: null },


    // OTP verififcation
    isVerified: { type: Boolean, default: false },
    otp: { type: Number },
    otpExpires: { type: Date },

    // Therapist-specific fields
    // profession: {
    //     type: String, enum: ["Psychiatrist", "Psychologist",
    //         "Licensed Professional Counsellor", "Licensed Social Worker",
    //         "Licensed Marriage and Family Therapist", "Psychiatric Nurse"
    //     ], default: null
    // },

    // qualifications: { type: String, default: null },
    // specialization: { type: String, default: null },
    // experience: { type: Number, default: 0 },
    // certificate: { type: String, default: null },
    // isVerified: { type: Boolean, default: false }, //admin sets true after recieving certificate

    // // Admin-specific
    // isSuperAdmin: {type: Boolean,default: false},
}, { timestamps: true });


const User = mongoose.model("User", UserSchema);
export default User;