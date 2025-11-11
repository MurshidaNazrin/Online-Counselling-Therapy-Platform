import React, { useState, useRef, useEffect } from 'react';
import { Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import axios from 'axios';

function TpstProfileDropdown() {
    const [open, setOpen] = useState(false);
    const [therapist, setTherapist] = useState(null);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // fetch therapist profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                const res = await axios.get('http://localhost:3000/api/therapist-profile', {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = res.data;
                // console.log(data);

                if (res.status) {
                    setTherapist(data.therapist)
                } else {
                    console.error(data.message);
                }
            } catch (err) {
                console.error("Error fetching therapist profile:", err);
            } finally {
                setLoading(false)
            }
        };

        // if (open && !therapist)
        fetchProfile();
    }, []);


    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    // delete account
    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account?")) return;

        try {
            const token = localStorage.getItem("token");

            const res = await axios.delete("http://localhost:3000/api/therapist-deleteprofile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                alert("Account deleted successfully.");
                localStorage.removeItem("token");
                window.location.href = "/";
            } else {
                alert(res.data.message || "Error deleting account");
            }
        } catch (err) {
            console.error("Delete error:", err.response?.data || err.message);
        }
    }


    return (
        <div ref={dropdownRef} className='relative'>
            {/* profile button */}
            <button
                onClick={() => setOpen(!open)}
                className='flex items-center gap-2 cursor-pointer '>
                <div className='p-2 hover:text-teal-600 transition flex items-center gap-2'>
                    {therapist?.profileImage ? (
                        <img
                            src={therapist.profileImage}
                            alt="profile image"
                            className='h-12 w-12 rounded-full border-2 border-gray-300 object-cover' />
                    ) : (
                        <div className='flex border-2 border-gray-300 h-12 w-12 rounded-full bg-gray-100 items-center justify-center'>
                            <FaUser className='h-7 w-7 text-gray-400' />
                        </div>

                    )}
                    <span className="text-gray-700 font-medium hidden sm:block">{therapist?.name}</span>
                </div>
            </button>


            {/* dropdown */}
            {open && (
                <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-100 shadow-lg rounded-xl p-4 z-50 animate-fadeIn">
                    {loading ? (
                        <p className='text-center text-gray-500 text-sm'>Loading...</p>
                    ) : therapist ? (
                        <>

                            {/* Profile info */}
                            <div className="flex items-center space-x-4 border-b pb-3">
                                {therapist?.profileImage ? (
                                    <img
                                        src={therapist.profileImage}
                                        alt="profile image"
                                        className='h-10 w-10 rounded-full border-2 border-gray-300 object-cover' />
                                ) : (
                                    <div className='flex border-2 border-gray-300 h-12 w-12 rounded-full bg-gray-100 items-center justify-center'>
                                        <FaUser className='h-7 w-7 text-gray-400' />
                                    </div>

                                )}
                                <div>
                                    <p className='text-gray-800 font-semibold text-sm md:text-base'>
                                        {therapist.name}
                                    </p>
                                    <p className='text-gray-500 text-xs md:text-sm'>
                                        {therapist.profession}
                                    </p>
                                </div>
                            </div>


                            {/*Details  */}
                            <div className='mt-3 text-gray-700 text-sm space-y-1'>
                                <p>
                                    <span className='font-medium'>Email:</span>{" "}
                                    {therapist.email}
                                </p>

                                <p>
                                    <span className="font-medium">Specialization:</span>{" "}
                                    {Array.isArray(therapist.specialization)
                                        ? therapist.specialization.join(", ")
                                        : therapist.specialization || "N/A"}
                                </p>

                                <p>
                                    <span className="font-medium">Experience:</span>
                                    {therapist.experience}
                                </p>
                            </div>


                            {/*  */}
                            <div className="flex justify-between md:justify-end items-center mt-4 gap-3">
                                <button
                                    onClick={() => navigate('/profile-setup')}
                                    className='text-teal-600 hover:text-teal-700 flex items-center gap-1 text-sm font-medium'>
                                    <Edit size={18} />
                                </button>

                                <button 
                                    onClick={handleDeleteAccount}
                                    className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-medium">
                                    <Trash2 size={18} />
                                </button>

                                <button
                                     onClick={() => (window.location.href = "/therapist-profile")}
                                    className='text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium'>
                                    <Eye size={18} />
                                    View All
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className='text-center text-gray-500 text-sm'>
                            No profile data found
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default TpstProfileDropdown
