import React, { useState, useEffect } from "react";
import TpstNavbar from './TpstNavbar';
import TpstSidebar from './TpstSidebar';
import TpstProfile from '../subcomponents/TpstProfile';

function Tpstindex() { 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
    // const Token = localStorage.getItem("token");
 
    
    
  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* sidebar */}
      <TpstSidebar onToggle={setSidebarOpen} />

      <div  className={`flex-1 transition-all duration-300 ${
          isMobile ? "ml-0" : sidebarOpen ? "ml-64" : "ml-20"
        }`}>
          
       <TpstNavbar />

       <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-teal-800">Welcome, Dr. Jane Smith 👋</h2>
        <p className="text-gray-600">Here is your schedule & recent info</p>

        {/* Dashboar widget will come here next */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg text-teal-700">🗓️ Today's Appointments</h3>
            <p className="text-gray-500 text-sm mt-2">3 session scheduled</p>
          </div>

           <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg text-teal-700">💬New Messages</h3>
            <p className="text-gray-500 text-sm mt-2">2 unread Messages</p>
          </div>

           <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg text-teal-700">🪙 Earnings Overview</h3>
            <p className="text-gray-500 text-sm mt-2">₹4,200 this week</p>
          </div>
        </div>





      </div>

      </div>
      
      
      {/* add therapist home page */}

      {/* <TpstProfile /> */}

           

    </div>
  )
}

export default Tpstindex
