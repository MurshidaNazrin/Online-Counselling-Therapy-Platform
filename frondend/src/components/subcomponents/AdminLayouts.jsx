import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children, title }) {
  const [sidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* RIGHT SIDE (NAV + CONTENT) */}
      <div className={`flex-1 transition-all duration-300 md:ml-0`}>

        <AdminNavbar title={title} />

        <main className="p-4 md:p-6">
          {children}
        </main>

      </div>

    </div>
  );
}




