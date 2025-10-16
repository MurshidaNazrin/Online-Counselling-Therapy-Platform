import bcrypt from "bcrypt";
import User from "../models/UserSchema.js";
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

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).send("User already exist");
    }

    const hpass = await bcrypt.hash(password, 10);

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); //valid for 5mins

    const newUser = await User.create({ name, email, password: hpass, role: 'client', isVerified: false, otp, otpExpires: otpExpiry, });

    //Send OTP email
    const subject = "Verify Your account - Online Counselling Platform";
    const text = `Hello ${name},\n\nYour OTP is: ${otp}\nIt will expire in 5 minutes.\n\nIf this was not you, ignore this email.`;

    await sendEmail(email, subject, text);

    return res.status(201).json({ message: "User registered. OTP send to email.Please verify", newUser });

  } catch (err) {
    return res.status(500).json(err)
  }

}


// =====================verify OTP=======================================
export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // check OTP
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expire OTP" });
    }

    // mark as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

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

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    // Generate new OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); //valid for 5mins

    user.otp = otp;
    user.otpExpires = otpExpiry;
    await user.save();

    //Send OTP email
    const subject = "Resend OTP - Online Counselling Platform";
    const text = `Hello ${user.name},\n\nYour new OTP is: ${otp}\nIt will expire in 5 minutes.\n\nIf this was not you, ignore this email.`;

    await sendEmail(user.email, subject, text);

    res.status(200).json({ message: "New OTP sent to your email." })
  } catch (err) {
    console.error("Resend OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
} 


// ====================Login===========================
export async function login(req,res){
  try{
    const {email,password} = req.body;

    if(!email || !password) {
      return res.status(400).json({message: "Please enter email and password"});
    }

    // find user
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid email or password"});
    }

    // check if verified
    if(!user.isVerified){
      return res.status(403).json({message: "Email not verified.Please verify Your email before login"});
    }

    // compare password
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message:"Invalid email or password"});
    }

    // generate JWT
    const token = jwt.sign({clientId: user._id, role:user.role}, process.env.JWT_TOKEN,{ expiresIn: "24h"});
    console.log(token);
    

    return res.status(200).json({message:"Login successful",token,user})
  }catch(err){
    console.error("Login Error:",err);
    res.status(500).json({message:"Server error"});
  }
}