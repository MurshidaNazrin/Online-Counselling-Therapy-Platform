import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
        therapistId: { type: mongoose.Schema.ObjectId, ref: "Therapist", required: true, },
        startTime: {type: Date,required: true,},
        duration: {type: Number,default: 60,},
        sessionType: { type: String, enum: ["chat", "video"], default: "chat", },
        status: { type: String, enum: ["booked", "cancelled", "completed"], default: "booked", },
        paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending", },
        paymentID: { type: String, }, //razorpay or stripe payment ID
        notes: { type: String, maxlength: 600, },
    },
    { timestamps: true }
);

// Prevent double booking — unique per therapist per timeslot
appointmentSchema.index(
  { therapistId: 1, startTime: 1 },
  { unique: true }
);

export default mongoose.model("Appointment", appointmentSchema);