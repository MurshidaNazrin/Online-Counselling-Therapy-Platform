import React from 'react';
import { Bell, User, LogOut } from "lucide-react";

function AdminNavbar({title = "Admin"}) {
    return (
      <div className='flex items-center justify-between bg-white p-4 shadow-sm'>
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
       <div className="flex items-center gap-3">
        <button title='Notifications' className='p-2 rounded hover:bg-gray-100'>
            <Bell size={18}/>
        </button>
        <div className="flex items-center gap-2">
            <User size={18}/>
            <span className='hidden sm:inline'>Admin</span>
        </div>

        <button title='Logout' className='ml-3 px-3 py-1 bg-red-500 text-white rounded'>Logout</button>
        </div> 
      </div>
    )
}

export default AdminNavbar
