import React from 'react';
import { useNavigate } from "react-router-dom";


function Therapistcard({ therapist }) {
  const navigate = useNavigate();

  const goTpProfile = () => navigate(`/view-therapist/${therapist._id}`);
  const goToBooking = (e) => {
    e.stopPropagation();
    navigate(`/booking/${therapist._id}`);
  };

  const formatSpecialization = (list = []) => list.join("•");
  return (
    <div
      onClick={goTpProfile}
      className='p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer'
    >
      <div className="flex items-center gap-4">
        <img
          src={therapist?.profileImage}
          alt={therapist?.name}
          className='h-20 w-20 rounded-full object-cover'
        />

        <div className='flex flex-col'>
          <h4 className="font-bold text-md text-teal-800 uppercase">{therapist.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{therapist.profession}</p>
          <p className="text-sm text-gray-600 mt-1">{formatSpecialization(therapist.specialization)}</p>
          <p className="text-sm text-gray-600 mt-1">{therapist.experience} yrs</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        {/* price */}
        <div>
          <p className="text-xs text-gray-500">Session starting at</p>
          <p className="text-lg font-bold text-teal-600">₹500</p>
        </div>

      <button
        className='bg-teal-500 text-white px-5 py-2 rounded-xl hover:bg-teal-600 transition'>
        Book Now
      </button>

      </div>

      

    </div>
  );
}

export default Therapistcard



