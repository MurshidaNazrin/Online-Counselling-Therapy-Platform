import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
    {
        therapistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Therapist",
            required: true,
        },

        day: {type: String, enum: ["Monday","Tuesday", "Wednesday","Thursday","Friday", "Saturday","Sunday",], required: true,},

        startTime: { type: String, required: true },
        endTime: {type: String, required: true }
    },
{timestamps: true}
);

export default mongoose.model("Availability", availabilitySchema);