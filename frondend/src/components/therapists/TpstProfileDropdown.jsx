import React, { useState, useRef, useEffect } from 'react';
import { User, Edit, Trash2 } from "lucide-react";

function TpstProfileDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    return (
        <div ref={dropdownRef} className='relative'>
            {/* profile button */}
            <button
                onClick={() => setOpen(!open)}
                className='flex items-center gap-2 cursor-pointer '>
                <div className='p-2  hover:text-teal-200 transition'>
                    <User size={22} className='text-teal-600' />
                    <span className="text-gray-700 font-medium hidden sm:block">Therapist</span>
                </div>
            </button>


            {/* dropdown */}
            {open && (
                <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-100 shadow-lg rounded-xl p-4 z-50 animate-fadeIn">
                    {/* Profile info */}
                    <div className="flex items-center space-x-4 border-b pb-3">
                        <img src="" alt="profile image" className='h-12 w-12 rounded-full object-cover' />

                        <div>
                            <p className='text-gray-800 font-semibold text-sm md:text-base'>
                                Dr.Jane Smith
                            </p>
                            <p className='text-gray-500 text-xs md:text-sm'>
                                Therapist(proffession)
                            </p>
                        </div>
                    </div>

                    {/*Details  */}
                    <div className='mt-3 text-gray-700 text-sm space-y-1'>
                        <p>
                            <span className='font-medium'>Email:</span>{" "}Jane.smith@gmail.com
                        </p>

                        <p>
                            <span className='font-medium'>Phone:</span>
                            +91 984647937039
                        </p>


                        <p>
                            <span className="font-medium">Experience:</span> 5 years
                        </p>
                    </div>

                    {/*  */}
                    <div className="flex justify-between md:justify-end items-center mt-4 gap-3">
                        <button className='text-teal-600 hover:text-teal-700 flex items-center gap-1 text-sm font-medium'>
                            <Edit size={18} />
                        </button>

                        <button className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-medium">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TpstProfileDropdown
