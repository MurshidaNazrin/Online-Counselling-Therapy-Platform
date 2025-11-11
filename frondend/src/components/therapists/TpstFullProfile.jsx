import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, FileText, ArrowLeft,Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function TpstFullProfile() {
    const [therapist, setTherapist] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ==============fetch therapist profile===============
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:3000/api/therapist-profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.data.success) {
                    setTherapist(res.data.therapist);
                } else {
                    console.error("Failed to load therapist profile:", res.data.message);
                }
            } catch (err) {
                console.error("Error fetching profile:", err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-teal-600">
                <Loader2 size={32} className='animate-spin' />
                <p className='ml-2 text-gray-600'>Loading...</p>
            </div>
        );
    }


    if (!therapist) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-gray-600">
                <p>No profile found</p>
                <button
                    onClick={() => navigate(-1)}
                    className='mt-4 bg-teal-600 text-white px-4 py-4 rounded-lg'>
                    Go Back
                </button>
            </div>
        )
    }
    return (
        <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-8 lg:px-16'>
            {/* Heaader */}
            <div className="flex items-center justify-between mb-8">
                <h1 className='text-2xl font-bold text-teal-700'>Therapist Profile</h1>
                <button
                    onClick={() => navigate(-1)}
                    className='flex items-center-safe gap-2 text-teal-600 hover:text-teal-700 font-medium'>
                    <ArrowLeft size={20} /> Back
                </button>
            </div>


            {/* Profile card */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 grid md:grid-cols-3 gap-8 items-start">
                {/* Left section - image and Basic info */}
                <div className="flex flex-col items-center text-center space-y-3 md:col-span-1">
                    <img src={therapist.profileImage} alt="profile"
                        className='w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-teal-200' />

                    <h2 className="text-lg font-semibold text-gray-800">
                        {therapist.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                        {therapist.profession}
                    </p>

                    <a
                        href={therapist.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-medium"
                    >
                        <FileText size={16} /> View Certificate
                    </a>


                     <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate("/profile-setup")}
              className="flex items-center gap-1 bg-teal-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-teal-700 transition"
            >
              <Edit size={16} /> 
            </button>

            <button
              onClick={handleDeleteAccount}
              className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition"
            >
              <Trash2 size={16} /> 
            </button>
          </div>
                </div>

                

                {/* Right section */}
                <div className='md:col-span-2 space-y-6'>
                    <div>
                        <h3 className="text-gray-700 font-semibold mb-2">Personal Information</h3>
                        <div className='grid sm:grid-cols-2 gap-2 text-sm text-gray-600'>
                            <p>
                                <span className='font-medium text-gray-800'>Email:</span>{" "}
                                {therapist.email}
                            </p>

                            <p>
                                <span className="font-medium text-gray-800">Experience:</span>{" "}
                                {therapist.experience ? `${therapist.experience} years` : "N/A"}
                            </p>
                            <p>
                                <span className="font-medium text-gray-800">Qualification:</span>{" "}
                                {therapist.qualifications || "N/A"}
                            </p>
                            <p>
                                <span className="font-medium text-gray-800">Specialization:</span>{" "}
                                {Array.isArray(therapist.specialization)
                                    ? therapist.specialization.join(", ")
                                    : therapist.specialization || "N/A"}
                            </p>
                        </div>
                    </div>

                    {/* Bio Section */}
                    {therapist.bio && (
                        <div>
                            <h3 className="text-gray-700 font-semibold mb-2">About</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {therapist.bio}
                            </p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default TpstFullProfile
