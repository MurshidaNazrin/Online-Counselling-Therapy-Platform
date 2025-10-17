import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function TpstSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // regex
    const strongPswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // validate
    if (!strongPswd.test(value)) {
      setPasswordError("Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.");
    } else {
      setPasswordError("")
    }
  };



  const createAcnt = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/therapist-signup`, { name, email, password });
      console.log(response);

      if (response) {
        //  Store email temporarily
        sessionStorage.setItem("userEmail", email);

        // Navigate to OTP verification page
        navigate("/therapist-otp");
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row max-w-4xl w-full overflow-hidden gap-4 md:gap-8">

        {/* Image Panel */}
        <div className="md:w-1/2 w-full h-64 md:h-auto rounded-t-2xl md:rounded-l-2xl shadow-[4px_0_10px_rgba(0,0,0,0.15)] overflow-hidden">
          <img
            src="/Signupimg.jpg"
            alt="signup illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Signup Form */}
        <div className="md:w-1/2 w-full p-6 md:p-12 flex flex-col justify-center bg-white rounded-b-2xl md:rounded-r-2xl shadow-xl">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img src="/logo3.png" alt="Logo" className="h-24 md:h-36 w-24 md:w-36" />
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6 md:mb-8">
            Join MindLink
          </h2>

          {/* Form */}
          <form className="space-y-4 md:space-y-6 flex flex-col items-center"
            onSubmit={createAcnt}>
            <div className="w-full max-w-xs">
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Full Name"
                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div className="w-full max-w-xs">
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="name@gmail.com"
                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div className="relative w-full max-w-xs">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={handlePasswordChange}
                value={password}
                placeholder="Password"
                className="w-full px-4 py-3 pr-10 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 box-border"
              />
              {/* hide/unhide button */}
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3  text-gray-500 hover:text-gray-700 cursor-pointer">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

              {/* password Error msg */}
              {password && (
                <p className='text-red-500 text-sm mt-1'>{passwordError}</p>
              )}
            </div>

            <div className="w-full max-w-xs">
              <button
                type="submit"
                className={`w-full py-2 md:py-3 rounded-full text-white font-semibold
                  bg-gradient-to-r from-teal-400 to-purple-500
                  hover:from-teal-500 hover:to-purple-600
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300
                 ${passwordError
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-400 to-purple-500 hover:from-teal-500 hover:to-purple-600"
                  }`}
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TpstSignup;

