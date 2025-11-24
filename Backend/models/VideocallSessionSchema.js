import mongoose from "mongoose";


const videoSessionSchema = new mongoose.Schema(
    {
        appointmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
        },

        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        therapistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Therapist",
            required: true,
        },

        roomId: {
            type: String, // unique ID for WebRTC signalling room
            required: true,
        },

        callStatus: {
            type: String,
            enum: ["initiated", "connected", "ended", "missed"],
            default: "initiated",
        },

        startedAt: {
            type: Date,
        },

        endedAt: {
            type: Date,
        },

        duration: {
            type: Number, // in seconds
            default: 0,
        },

        recordingUrl: {
            type: String, 
        },
    },
    { timestamps: true}
);

export default mongoose.model("VideoSession", videoSessionSchema);



