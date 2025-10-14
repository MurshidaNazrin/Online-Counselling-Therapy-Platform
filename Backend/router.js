import { Router } from "express";
import * as rh from "./ReqHandler.js";
const router = Router()

router.route("/signup").post(rh.signup);
router.route('/verify-otp').post(rh.verifyOtp);
router.route('/resend-otp').post(rh.resendOTP);
router.route('/user-login').post(rh.login);

export default router