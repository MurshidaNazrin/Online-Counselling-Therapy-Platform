import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
        therapistId: { type: mongoose.Schema.ObjectId, ref: "Therapist", required: true, },
        date: { type: String, required: true, },
        time: { type: String, required: true, },
        sessionType: { type: String, enum: ["chat", "video"], default: "chat", },
        status: { type: String, enum: ["booked", "cancelled", "completed"], default: "booked", },
        paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending", },
        paymentID: { type: String, }, //razorpay or stripe payment ID
        notes: { type: String, maxlength: 600, },
    },
    { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);