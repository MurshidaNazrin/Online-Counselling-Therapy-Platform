import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
import Connection from "./Connection.js";
import router from "./router.js";
import User from "./models/UserSchema.js";
import Therapist from "./models/TherapistSchema.js";
dotenv.config()

const port = process.env.PORT;

const app = express()
// Middleware
app.use(express.json())
app.use(cors())

// routes
app.use('/api', router)

// connect DB and start Server
Connection().then(() => {
    app.listen(port, () => {
        console.log(port);

        console.log(`server created http://localhost:${port}`);

        // schedule cron job to delete expired, unverified users every 5 min
        cron.schedule("*/5 * * * *", async () => {
            try {
                const result = await User.deleteMany({ isVerified: false, otpExpires: { $lte: new Date() }, });
                if (result.deletedCount > 0) {
                    console.log(` Deleted ${result.deletedCount} unverified users`);
                }
            } catch (err) {
                console.error(" Error deleting unverified users:", err);
            }
        });

        // console.log("✅ Cron job scheduled: Running every 1 minute");

    })
}).catch((err) => {
    console.log("can't connect db:", err.message);
})


