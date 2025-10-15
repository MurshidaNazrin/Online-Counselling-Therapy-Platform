import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";


function OTPverification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); //success/error
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  const email = sessionStorage.getItem("userEmail");
  

  // Countdown timer for resend button
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);


  // OTP
  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto move to next input
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };


  // submit OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTp.");
      setMessageType("error");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/verify-otp",{email,otp: Number(enteredOtp),});
      console.log(res.data);
      
      setMessage(res.data.message);
      setMessageType("success");

      setTimeout(() => {
        sessionStorage.removeItem("userEmail"); //  clear after success
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed.");
      setMessageType("error");
    }
  };


  // Resend OTP
  const handleResend = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/resend-otp", { email, });
      setMessage(res.data.message);
      setMessageType("success");
      setTimer(60);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to resend OTP.");
      setMessageType("error");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white px-4'>
      <div className='bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-teal-100'>
        <h2 className='text-2xl font-bold text-teal-700 mb-2'>
          Verify Your Email
        </h2>
        <p className='text-gray-600 mb-6 text-sm'>
          Enter the 6-digit OTP sent to Your registered email address.
        </p>

        {/* OTP */}
        <form onSubmit={handleSubmit} className='flex justify-center gap-3 mb-6'>
          {otp.map((digit, index) => (
            <input type="text"
              key={index}
              id={`otp-input-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className='w-10 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none'
            />
          ))}
        </form>

        {/* message */}
        {message && (
          <div
            className={`flex items-center justify-center gap-2 p-2 mb-4 rounded-lg text-sm ${messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
              }`}
          >
            {messageType === "success" ? (
              <FaCheckCircle className="text-green-600" />
            ) : (
              <FaExclamationCircle className="text-red-600" />
            )}
            {message}
          </div>
        )}

        {/*verify Button  */}
        <button
          type='submit'
          onClick={handleSubmit}
          className='w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg transition duration-300 font-semibold'>
          Verify OTP
        </button>

        {/* Resend */}
        <div className='mt-4 text-sm text-gray-600'>
          Didn't recieve the OTP?{" "}
          {timer > 0 ? (
            <span>Resend in {timer}s</span>
          ) : (
            <button
              type='button'
              onClick={handleResend}
              className='text-teal-600 hover:underline font-medium'>
              Resend OTP</button>
          )}
        </div>
      </div>

    </div>
  )
}

export default OTPverification
