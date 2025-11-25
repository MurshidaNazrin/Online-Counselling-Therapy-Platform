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

          callType: {
            type: String,
            enum: ["video", "audio", "screen-share"],
            default: "video",
        },

        callStatus: {
            type: String,
            enum: ["initiated", "connected", "ended", "missed"],
            default: "initiated",
        },

      
        isActive: { type: Boolean, default: true },

        token: { type: String }, // temporary auth token for joining the room


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
    { timestamps: true }
);

videoSessionSchema.index({ therapistId: 1, clientId: 1 });

export default mongoose.model("VideoSession", videoSessionSchema);



