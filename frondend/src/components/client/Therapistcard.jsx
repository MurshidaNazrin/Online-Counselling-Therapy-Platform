import React from 'react'

function Therapistcard({therapist}) {
  return (
    <div className='p-4 bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer'>
        <div className="flex items-center gap-4">
            <img 
               src="" 
               alt="" 
               className='h-16 w-16 rounded-full object-cover'
            />

            <div>
                <h4 className="font-semibold text-lg">therapist.name</h4>
                <p className="text-sm text-gray-500">
                   therapist.proffession,therapist.experienceyrs
                </p>
            </div>
        </div>

        <button
           className='mt-4 bg-teal-500 text-white w-full py-2 rounded-xl hover:bg-teal-600'>
            Book Now
        </button>
      
    </div>
  );
}

export default Therapistcard
