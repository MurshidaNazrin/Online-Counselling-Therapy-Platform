import React from 'react';
import { NavLink } from "react-router-dom";
import { Home, Users, Calendar, FileText, DollarSign, BookOpen, Settings, List } from "lucide-react";

export default function AdminSidebar() {
    const items = [
        { to: "/", label: "Dashboard", icon: <Home /> },
        { to: "/therapists", label: "Manage Therapists", icon: <Users /> },
        { to: "/sessions", label: "Sessions", icon: <Calendar /> },
        { to: "/reports", label: "Reports", icon: <FileText /> },
        { to: "/payments", label: "Payments", icon: <DollarSign /> },
        { to: "/content", label: "Content Manager", icon: <BookOpen /> },
        { to: "/settings", label: "Settings", icon: <Settings /> },
        { to: "/logs", label: "Logs", icon: <List /> },
    ];
    return (
        <aside className='w-64 bg-white border-r hidden md:block'>
            <div className="p-4 text-center font-bold text-teal-600 text-xl">Admin Panel</div>
            <nav className="p-2 space-y-1">
                {items.map((i) => (
                    <NavLink
                        to={i.to}
                        key={i.to}
                        className={({ isActive }) => `flex items-center gap-3 rounded-md text-gray-700 hover:bg-gray-50 ${isActive ? "bg-teal-50 text-teal-600" : ""}`
                        }>
                        <div className="w-5 h-5">{i.icon}</div>
                        <span className="text-sm">{i.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}
