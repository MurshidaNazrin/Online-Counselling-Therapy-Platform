import bcrypt from "bcrypt";
import Therapist from "../models/TherapistSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";


// ==================signup================================
export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("Please fill all fields");
    }

    // password strength validation
    const strongPswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPswd.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const existTherapist = await Therapist.findOne({ email });
    if (existTherapist) {
      return res.status(400).send("User already exist");
    }

    const hpass = await bcrypt.hash(password, 10);

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); //valid for 5mins

    const newTherapist = await Therapist.create({ name, email, password: hpass, role: 'therapist', isVerified: false, otp, otpExpires: otpExpiry, });

    //Send OTP email
    const subject = "Verify Your account - Online Counselling Platform";
    const text = `Hello ${name},\n\nYour OTP is: ${otp}\nIt will expire in 5 minutes.\n\nIf this was not you, ignore this email.`;

    await sendEmail(email, subject, text);

    return res.status(201).json({ message: "Therapist registered. OTP send to email.Please verify", newTherapist });

  } catch (err) {
    return res.status(500).json(err)
  }

}


// =====================verify OTP=======================================
export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    const therapist = await Therapist.findOne({ email });
    if (!therapist) return res.status(400).json({ message: "Therapist not found" });

    if (therapist.isVerified) {
      return res.status(400).json({ message: "Therapist already verified" });
    }

    // check OTP
    if (therapist.otp !== otp || therapist.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expire OTP" });
    }

    // mark as verified
    therapist.isVerified = true;
    therapist.otp = null;
    therapist.otpExpires = null;
    await therapist.save();

    res.status(200).json({ message: "OTP verified Successfully. Redirect to login page." })

  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}


// =======================Resend OTP===============================
export async function resendOTP(req, res) {
  try {
    const { email } = req.body;

    const therapist = await Therapist.findOne({ email });
    if (!therapist) return res.status(400).json({ message: "Therapist not found" });

    if (therapist.isVerified) {
      return res.status(400).json({ message: "Therapist already verified" });
    }

    // Generate new OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); //valid for 5mins

    therapist.otp = otp;
    therapist.otpExpires = otpExpiry;
    await therapist.save();

    //Send OTP email
    const subject = "Resend OTP - Online Counselling Platform";
    const text = `Hello ${therapist.name},\n\nYour new OTP is: ${otp}\nIt will expire in 5 minutes.\n\nIf this was not you, ignore this email.`;

    await sendEmail(therapist.email, subject, text);

    res.status(200).json({ message: "New OTP sent to your email." })
  } catch (err) {
    console.error("Resend OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}


// ====================Login===========================
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }

    // find user
    const therapist = await Therapist.findOne({ email });
    if (!therapist) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check if verified
    if (!therapist.isVerified) {
      return res.status(403).json({ message: "Email not verified.Please verify Your email before login" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, therapist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // generate JWT
    const token = jwt.sign({ therapistId: therapist._id, role: therapist.role }, process.env.JWT_TOKEN, { expiresIn: "24h" });
    console.log(token);


    return res.status(200).json({ message: "Login successful", token, therapist })
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}


// ================Setup/Update Therapist Profile=======================
export async function therapistProfile(req, res) {
  try {
    const therapistId = req.user.therapistId;
    console.log(therapistId);
    const { profileImage,
      profession,
      qualifications,
      specialization,
      experience,
      certificate,
      bio
    } = req.body;

    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found!!" });
    }

    if (!therapist.isVerified) {
      return res.status(403).json({ message: "Email is not Verified, Cannot update Profile." });
    }

    const tpstDetails = await Therapist.findByIdAndUpdate(therapistId, { profileImage, profession, qualifications, specialization, experience, certificate, bio });
    if (tpstDetails) {
      return res.status(200).json({ message: "Profile updated Successfully", tpstDetails })
    }

  } catch (err) {
    console.error("Profile setup error:", err);
    res.status(500).json({ message: "Server Error" })
  }
}


// =========Get/show Therapist profile=======================
export async function getTherapistProfile(req, res) {
  try {
    const therapistId = req.user.therapistId;

    const getTherapist = await Therapist.findById(therapistId).select("-password -otp -otpExpires");
    if (!getTherapist) {
      return res.status(404).json({ message: "Therapist not found!!" });
    }

    res.status(200).json({ success: true, therapist: getTherapist });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server Error" })
  }
}

// ===================delete profile/Account=========================
export async function deleteAccount(req, res) {
  try {
    const therapistId = req.user.therapistId;
    const deleteAccount = await Therapist.findByIdAndDelete(therapistId);
    if (!deleteAccount) {
      return res.status(404).json({ success: false, message: 'Therapist not found' });
    }
    return res.status(200).json({ success: true, message: "Account delete successfully." })
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}