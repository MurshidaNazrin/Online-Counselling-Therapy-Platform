import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail } from 'lucide-react';
import axios from "axios";

 function ViewTpstProfile() {
  const navigate = useNavigate();
  const { therapistId } = useParams();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!therapistId) return;

    const fetchTherapistProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:3000/api/view-therapist/${therapistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );

        setTherapist(res.data?.therapist || null);
      } catch (err) {
        console.error("Error fetching therapist:", err.response?.data || err.message);
        setTherapist(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapistProfile();
  }, [therapistId]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!therapist) return <p className="p-6 text-center">Therapist not found</p>;

  return (
    <div className='min-h-screen bg-gray-100 p-4 md:p-8'>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className='p-2 bg-white rounded-full shadow hover:bg-gray-50'
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl md:text-2xl font-bold text-teal-800">Profile</h2>
      </div>

      {/* card */}
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={therapist?.profileImage}
            alt={therapist?.name}
            className='h-32 w-32 md:w-36 md:h-36 rounded-full object-cover shadow-md'
          />

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-teal-700 uppercase">
              {therapist?.name}
            </h1>
            <p className="text-gray-600 mt-1">{therapist?.profession}</p>
            <p className="text-gray-600 mt-1">{therapist?.experience} Years experience</p>
            <p className="text-gray-600 mt-2 font-medium">
              {therapist?.specialization?.join(" • ")}
            </p>
          </div>
        </div>

        {/* About */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
          <p className="text-gray-600 leading-relaxed">{therapist?.bio}</p>
        </div>

        {/* Contact */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl shadow-sm">
            <Phone className='text-teal-600' />
            <Link 
                to={`tel:${therapist?.phone}`}
                className="text-gray-700 hover:text-teal-600 hover:underline">
                {therapist?.phone}
            </Link>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl shadow-sm">
            <Mail className="text-teal-600" />
            <Link 
                to={`mailto:${therapist?.email}`}
                className="text-gray-700 hover:text-teal-600 hover:underline hover:cursor-pointer">
                {therapist?.email || "N/A"}
            </Link>
          </div>
        </div>

        <div className="mt-10 flex justify-center md:justify-end">
          <button
            onClick={() => navigate(`/booking/${therapist?._id}`)}
            className="bg-teal-600 text-white px-6 py-3 rounded-xl shadow hover:bg-teal-700"
          >
            Book a Session
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewTpstProfile;

