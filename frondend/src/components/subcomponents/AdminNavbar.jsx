import React from 'react';
import { Bell, User, LogOut } from "lucide-react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AdminNavbar({ title = "Admin" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      navigate('/');
      toast.success("Logout Successfully...!");
    } catch (err) {
      toast.error("Logout Failed1!");
      console.error(err);
    }

  }
  return (
    <div className='flex items-center justify-between bg-white p-4 shadow-sm'>
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      <div className="flex items-center gap-3">
        <button title='Notifications' className='p-2 rounded hover:bg-gray-100'>
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2">
          <User size={18} />
          <span className='hidden sm:inline'>Admin</span>
        </div>

        <button
          onClick={handleLogout}
          title='Logout'
          className='ml-3 px-3 py-1 bg-red-500 text-white rounded'>
          <LogOut /></button>
      </div>
    </div>
  )
}

export default AdminNavbar
