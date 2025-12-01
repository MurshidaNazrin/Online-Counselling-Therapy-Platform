import React from 'react';
import axios from "axios";
import { Trash2 } from "lucide-react";


function formatTo12(time24) {
  let [h, m] = time24.split(":");
  h = parseInt(h, 10);

  const period = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  return `${String(h).padStart(2, "0")}:${m} ${period}`;
}

function SlotList({ slots, onDelete }) {
  if(!slots || slots.length === 0) {
    return <p className='text-gray-500 text-sm'>No slots added yet.</p>
  }


  return (
    <ul className="space-y-2">
      {slots.map((slot) => (
        <li
           key={slot._id}
           className='flex justify-between items-center p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-white'
        >
            <span className='text-teal-700 font-semibold tracking-wide'>
              {formatTo12(slot.startTime)} - {formatTo12(slot.endTime)}
            </span>

            {/* DELETE BUTTON */}
          <button
            onClick={() => onDelete(slot._id)}
            className="p-2 rounded-lg hover:bg-red-100 transition"
          >
            <Trash2 size={18} className="text-red-500" />
          </button> 
        </li>
      ))}
    </ul>
  );
}

export default SlotList
