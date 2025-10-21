import mongoose from "mongoose";
import validator from "validator";

const TherapistSchema = new mongoose.Schema({

    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { type: String, required: [true, "Email is required"], unique: true, lowercase: true, trim: true, validate: [validator.isEmail, "Invalid email format"] },
    password: { type: String, required: [true, "Password is required"], minlength: 8 },
    role: { type: String, default: 'therapist', enum: ["therapist"] },

    // OTP verififcation
    isVerified: { type: Boolean, default: false },
    otp: { type: Number },
    otpExpires: { type: Date },

    // Therapist-specific fields
    profileImage: { type: String, default: null },
    profession: {
        type: String, enum: ["Psychiatrist", "Psychologist",
            "Licensed Professional Counsellor", "Licensed Social Worker",
            "Licensed Marriage and Family Therapist", "Psychiatric Nurse"
        ], default: null
    },

    qualifications: { type: String, default: null },
    specialization: {
        type: [String], enum: [
            "Anxiety", "Depression", "Trauma", "Child Therapy",
            "Couples Counseling", "CBT", "Grief Counseling"
        ],
        default: []
    },
    experience: { type: Number, default: 0, min: [0, "Experience cannot be negative"] },
    certificate: { type: String, default: null },
    bio: { type: String, default: null },
    isApproved: { type: Boolean, default: false }, //admin sets true after recieving certificate
}, { timestamps: true });


const Therapist = mongoose.model("Therapist", TherapistSchema);
export default Therapist;