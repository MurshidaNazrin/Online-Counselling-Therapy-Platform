import React, { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";

function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading ] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:3000/api/admin-login",
                {
                    email, password,
                });

            toast.success("Login successful!");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);

            if (res.data.role === "superadmin")
                navigate("/superadmin-dashboard");
            else navigate("/admin-dashboard");
        } catch (err) {
            toast.error(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 relative overflow-hidden'>
            <div className='absolute inset-0 bg-white/30 backdrop-blur-md'></div>
            <form action="" onSubmit={handleLogin}
                className='relative z-10 bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-2xl shadow-2xl w-full max-w-md'>

                <h2 className='text-3xl font-bold text-center text-teal-700 mb-8'>
                    Admin Login
                </h2>

                {/* email  */}
                <div className='mb-5'>
                    <label className='block text-gray-700 font-semibold mb-2'>Email</label>
                    <input type="email" placeholder='Enter Your email'
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg' required />
                </div>

                {/* password */}
                <div className='mb-6 relative'>
                    <label className='block text-gray-700 font-semibold mb-2'>Password</label>
                    <div className='relative'>
                        <input type={showPassword ? "text" : "password"}
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-4 py-3 border border-gray-300 rounded-lg' required />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-3 top-3.5 text-gray-500 cursor-pointer hover:text-teal-600'
                        >{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                </div>

                {/* Login button */}
                <button type='submit'
                    disabled={loading}
                    className={`w-full py-3 text-white font-semibold rounded-lg transition-all ${
                        loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
                    }`}>
                    {loading ? "Logging in...":"Login"}
                </button>
            </form>
        </div>
    )
}

export default AdminLogin
