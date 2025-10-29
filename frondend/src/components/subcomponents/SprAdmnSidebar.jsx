import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Settings, Shield, Activity, BarChart } from "lucide-react";

function SprAdmnSidebar() {
    const location = useLocation();

    const navItems = [
        {path:"/superadmin-dashboard", label: "Dashboard", icon: <LayoutDashboard />},
    ]
    return (
        <div>

        </div>
    )
}

export default SprAdmnSidebar
