import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Settings, Shield, Activity, BarChart } from "lucide-react";

function SprAdmnSidebar() {
    const location = useLocation();

    const navItems = [
        {path:"/superadmin-dashboard", label: "Dashboard", icon: <LayoutDashboard />},
        {path:"/manage-admins", label: "Admins", icon: <Users />},
        {path:"/analytics", label: "Analytics", icon: <BarChart />},
        {path:"/settings", label: "Settings", icon: <Settings />},
        {path:"/security", label: "Security", icon: <Shield />},
        {path:"/logs", label: "Logs", icon: <Activity />},
    ]
    return (
        <div className='w-64 bg-white shadow-xl border-r p-4 hidden md:block h-screen fixed'>
            <h2 className='text-2xl font-bold text-teal-600 mb-6 text-center'>SuperAdmin</h2>
            <nav className='space-y-3'>
                {navItems.map((item, index) => (
                    <Link key={index}
                          to={item.path}
                          className={`flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 ${
                            location.pathname === item.path ? "bg-teal-100 text-teal-600" : "text-gray-700"
                          }`}>
                            {item.icon} 
                            <span>{item.label}</span>
                          </Link>
                ))}
            </nav>
        </div>
    )
}

export default SprAdmnSidebar
