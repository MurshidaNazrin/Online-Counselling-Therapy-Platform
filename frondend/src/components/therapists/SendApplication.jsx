import React, { useEffect, useState, useRef } from 'react';
import { Clock, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from "react-router-dom";
import ApplicationStatus from './ApplicationStatus';


function SendApplication() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClick = () => {
        setDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);



    return (
        <div className="relative" ref={dropdownRef}>
            <ul className='flex flex-col md:flex-row md:space-x-6 font-medium text-teal-600'>
                {/* Application Menu */}
                <li>
                    <button
                        onClick={handleClick}
                        className='hover:text-teal-700 flex items-center space-x-2'>
                        <Clock size={18} />
                        <span> Application Status</span>
                        {
                            dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        }
                    </button>
                </li>

                {/* Contact */}
                <li>
                    <Link
                        to="/support"
                        className="hover:text-teal-700 flex items-center space-x-2"
                    >
                        <Info size={18} />
                        <span>Contact Support</span>
                    </Link>
                </li>
            </ul>

            {/* Dropdown - Visible only if applied */}
            {dropdownOpen && (
                <div className='absolute bg-white shadow-xl rounded-xl mt-2 w-[22rem] sm:w-[26rem] border border-gray-200 z-30 p-4'>
                    <div className='max-h-[70vh] overflow-y-auto'>
                        <ApplicationStatus />
                    </div>
                </div>
            )}
        </div>
    )
}

export default SendApplication
