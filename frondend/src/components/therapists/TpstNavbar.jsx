import React, { useState } from 'react';
import { Bell, MessageSquare, Calendar, DollarSign, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import TpstProfileDropdown from './TpstProfileDropdown';

function tpstNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <nav className='w-full bg-white shadow-md px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50'>

            {/* Logo */}
            <div className='flex items-center'>
                <img src="/logo2 copy.png" alt="logo" className='h-18 w-19 object-contain' />
            </div>

            {/* Menu */}
            <ul className="hidden md:flex space-x-6 font-medium text-teal-600">
                <li><Link to="/therapist-dashboard" className="hover:text-teal-700">Dashboard</Link></li>
                <li><Link to="/therapist-clients" className="hover:text-teal-700">Clients</Link></li>
                <li><Link to="/therapist-messages" className="hover:text-teal-700">Messages</Link></li>
                <li><Link to="/therapist-earnings" className="hover:text-teal-700">Earnings</Link></li>
                <li><Link to="/therapist-availability" className="hover:text-teal-700">Availability</Link></li>
            </ul>

            {/* Icons + Profile */}
            <div className="hidden md:flex items-center space-x-5">
                <Bell className="curser-pointer" size={20} />
                <MessageSquare className="curser-pointer" size={20} />
                <Calendar className="curser-pointer" size={20} />
                <DollarSign className="curser-pointer" size={20} />



                {/* Profile */}
                <div className="flex items-center space-x-2 cursor-pointer">
                    {/* <User size={22} className='text-gray-700' />
                    <span className=" text-gray-700">Therapist</span> */}
                    <TpstProfileDropdown />
                </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button className='md:hidden text-gray-700'
                onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-5 flex flex-col space-y-5 transform transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}>
                {/* close button */}
                <button className="self-end mb-2" onClick={() => setMenuOpen(false)}>
                    <X size={26} />
                </button>

                <Link to="/therapist-dashboard" className="text-teal-700 font-medium border-b py-2">Dashboard</Link>
                <Link to="/therapist-clients" className="text-teal-700 font-medium border-b py-2">Clients</Link>
                <Link to="/therapist-messages" className="text-teal-700 font-medium border-b py-2">Messages</Link>
                <Link to="/therapist-earnings" className="text-teal-700 font-medium border-b py-2">Earnings</Link>
                <Link to="/therapist-availability" className="text-teal-700 font-medium border-b py-2">Availability</Link>

                <div className="flex items-center space-x-2 pt-4">
                    {/* <User size={22} className='text-gray-700' />
                    <span className='font-medium text-gray-700'>Therapist</span> */}
                    <TpstProfileDropdown />
                </div>
            </div>

        </nav>
    )
}

export default tpstNavbar
