import { Router } from "express";
import * as rh from "./controllers/ReqHandler.js";
import * as tp from "./controllers/TherapistController.js";
import * as ad from './controllers/AdminController.js';
import Auth from "./middleware/Auth.js";
import upload from "./middleware/upload.js";


const router = Router()

// client
router.route("/signup").post(rh.signup);
router.route('/verify-otp').post(rh.verifyOtp);
router.route('/resend-otp').post(rh.resendOTP);
router.route('/user-login').post(rh.login);

router.route('/profile').get(Auth(['client']), rh.getProfile);
router.route('/edit-profile').put(Auth(['client']),upload.single("profileImage"), rh.updateProfile);
router.route('/delete-profile').delete(Auth(['client']), rh.deleteAccount);
router.route('/fetchtherapists').get(Auth(['client']),rh.getApprovedTherapists);

// therapist
router.route("/therapist-signup").post(tp.signup);
router.route('/therapist-verify-otp').post(tp.verifyOtp);
router.route('/therapist-resend-otp').post(tp.resendOTP);
router.route('/therapist-login').post(tp.login);

router.route('/therapist-createprofile').put(Auth(["therapist"]), upload.fields([{ name: "profileImage", maxCount: 1 }, { name: "certificate", maxCount: 1 },]), tp.therapistProfile);
router.route('/therapist-profile').get(Auth(["therapist"]), tp.getTherapistProfile);
router.route('/therapist-deleteprofile').delete(Auth(["therapist"]), tp.deleteAccount);
router.route('/therapist-status').get(Auth(["therapist"]), tp.getTherapistStatus);


// super Admin
router.route('/admin-login').post(ad.loginAdmin);
router.route('/admin-create').post(Auth(['superadmin']),ad.createAdmin);
router.route('/getadmins').get(Auth(['superadmin']), ad.getAllAdmin);
router.get('/getadmin/:adminId', Auth(['superadmin']), ad.getAdmin);
router.route('/updateadmin/:adminId').put(Auth(['superadmin']), ad.updateAdmin);
router.route('/deleteadmin/:adminId').delete(Auth(['superadmin']), ad.deleteAdmin);


// Admin
// router.route('/admin-login').post(ad.loginAdmin);
router.route('/therapists').get(Auth(['admin','superadmin']), ad.getAllTherapists);
router.route('/therapist/:id').get(Auth(['admin','superadmin']), ad.getTherapist);
router.route('/therapist-status/:id').put(Auth(['admin','superadmin']), ad.updateTherapistStatus);
router.route('/therapist-active/:id').put(Auth(['admin','superadmin']), ad.disableAccount);
export default router