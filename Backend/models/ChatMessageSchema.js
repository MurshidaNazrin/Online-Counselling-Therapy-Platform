import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
    {
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
        },

        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "senderModel",
        },

        senderModel: {
            type: String,
            required: true,
            enum: ["User", "Therapist"],
        },

        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "recieverModel",
        },

        receiverModel: {
            type: String,
            required: true,
            enum: ["User", "Therapist"],
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        messageType: {
            type: String,
            enum: ["text", "image", "file"],
            default: "text",
        },

        seen: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true}
);

export default mongoose.model("ChatMessage", chatMessageSchema);