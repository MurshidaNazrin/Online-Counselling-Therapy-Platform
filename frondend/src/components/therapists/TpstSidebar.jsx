import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, Users, MessageSquare, Calendar, DollarSign, Settings, LogOut, Menu, X } from "lucide-react";
import toast from "react-hot-toast";


// ==============change all responsive design======================

function TpstSidebar({ onToggle }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // detect screensize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState);
  };

  // ============Logout+++===============
  const handleLogout = () => {
      try {
    localStorage.removeItem("token");
    navigate('/');
    toast.success("Logout Successfully..!");
  } catch (error) {
    console.error("Logout failed:", error);
  }

  }
  return (
    <>
    <div
      className={`${isMobile
        ? `fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`
        : `${isOpen ? "w-64" : "w-20"} bg-white shadow-lg h-screen p-5 flex flex-col justify-between transition-all duration-300 fixed left-0 top-0 z-40`
        }`}
    >
      {/* Top */}
      <div>
        <div className="flex items-center justify-between mb-8">
          {isOpen && !isMobile && (<h1 className="text-xl font-bold text-teal-600">MindLink</h1>)}
          <button onClick={toggleSidebar}>
            {isMobile ? (
              <X className="text-teal-600" size={26} />
            ) : (
              <Menu className="text-teal-600" size={22} />
            )}
          </button>
        </div>

        {/* Menu Links */}
        <ul className="space-y-4 text-gray-700 font-medium">
          <li>
            <Link to="/therapist-home" className="flex items-center space-x-3 hover:text-teal-600">
              <LayoutDashboard size={20} />
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/therapist-clients" className="flex items-center space-x-3 hover:text-teal-600">
              <Users size={20} />
              {isOpen && <span>Clients</span>}
            </Link>
          </li>
          <li>
            <Link to="/therapist-messages" className="flex items-center space-x-3 hover:text-teal-600">
              <MessageSquare size={20} />
              {isOpen && <span>Messages</span>}
            </Link>
          </li>
          <li>
            <Link to="/therapist-availability" className="flex items-center space-x-3 hover:text-teal-600">
              <Calendar size={20} />
              {isOpen && <span>Schedule</span>}
            </Link>
          </li>
          <li>
            <Link to="/therapist-earnings" className="flex items-center space-x-3 hover:text-teal-600">
              <DollarSign size={20} />
              {isOpen && <span>Earnings</span>}
            </Link>
          </li>
          <li>
            <Link to="/therapist-settings" className="flex items-center space-x-3 hover:text-teal-600">
              <Settings size={20} />
              {isOpen && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-red-500 hover:text-red-600"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Close main sidebar div */}
    </div>

{/* Mobile overlay */ }
  {
    isMobile && isOpen && (
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black bg-opacity-10 z-30"
      ></div>
    )
  }
    </>
  );
}

export default TpstSidebar
