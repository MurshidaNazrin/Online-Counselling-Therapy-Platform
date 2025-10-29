import React from 'react';
import { LogOut } from 'lucide-react';

function SprAdmnNavbar({title}) {
    const handleLogout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href ='/';
    }
    return (
        <div className='bg-white shadow-md p-4 flex justify-between items-center'>
            <div className='flex items-center gap-3'>
            <img src="/logo2 copy.png" alt="logo" className='h-18 w-19 object-contain' />
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            </div>
            <button
                onClick={handleLogout}
                className='flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition'>
                <LogOut size={18} /> Logout
            </button>
        </div>
    );
};

export default SprAdmnNavbar;
