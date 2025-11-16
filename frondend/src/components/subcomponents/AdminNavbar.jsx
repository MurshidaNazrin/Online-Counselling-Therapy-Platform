// import React from 'react';
// import { Bell, User, LogOut } from "lucide-react";
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// function AdminNavbar({ title = "Admin" }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     try {
//       localStorage.removeItem("token");
//       navigate('/');
//       toast.success("Logout Successfully...!");
//     } catch (err) {
//       toast.error("Logout Failed1!");
//       console.error(err);
//     }

//   }
//   return (
//     <div className="flex items-center justify-between bg-white p-4 shadow-sm sticky top-0 z-40 md:ml-64 transition-all">
//       <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

//       <div className="flex items-center gap-3">
//         <button className="p-2 rounded hover:bg-gray-100">
//           <Bell size={18} />
//         </button>

//         <div className="flex items-center gap-2 border px-3 py-1 rounded-lg bg-gray-50">
//           <User size={18} />
//           <span className="hidden sm:inline">Admin</span>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-1"
//         >
//           <LogOut size={18} />
//           <span className="hidden sm:inline">Logout</span>
//         </button>
//       </div>
//     </div>
  
//   )
// }

// export default AdminNavbar


import React from "react";
import { Bell, User, LogOut, Menu } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar({ title = "Admin", onToggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
      toast.success("Logout Successfully!");
    } catch (err) {
      toast.error("Logout Failed!");
      console.error(err);
    }
  };

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between bg-white p-4 shadow">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={onToggleSidebar}
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-4">
        <button title="Notifications" className="p-2 rounded hover:bg-gray-100">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-2">
          <User size={18} />
          <span className="hidden sm:inline text-sm">Admin</span>
        </div>

        <button
          onClick={handleLogout}
          title="Logout"
          className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
