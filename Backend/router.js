import { Router } from "express";
import * as rh from "./controllers/ReqHandler.js";
import * as tp from "./controllers/TherapistController.js";
import Auth from "./middleware/Auth.js";
import upload from "./middleware/upload.js";


const router = Router()

// client
router.route("/signup").post(rh.signup);
router.route('/verify-otp').post(rh.verifyOtp);
router.route('/resend-otp').post(rh.resendOTP);
router.route('/user-login').post(rh.login);

// therapist
router.route("/therapist-signup").post(tp.signup);
router.route('/therapist-verify-otp').post(tp.verifyOtp);
router.route('/therapist-resend-otp').post(tp.resendOTP);
router.route('/therapist-login').post(tp.login);

router.route('/therapist-createprofile').put(Auth(["therapist"]), upload.fields([{ name: "profileImage", maxCount: 1 }, {name: "certificate", maxCount: 1},]), tp.therapistProfile);
router.route('/therapist-profile').get(Auth(["therapist"]), tp.getTherapistProfile);
router.route('/therapist-deleteprofile').delete(Auth(["therapist"]), tp.deleteAccount);


export default router