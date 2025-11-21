// import React from 'react';
// import { NavLink } from "react-router-dom";
// import { Home, Users, Calendar, FileText, DollarSign, BookOpen, Settings, List } from "lucide-react";

// // export default function AdminSidebar() {
// //     const items = [
// //         { to: "/admin-dashboard", label: "Dashboard", icon: <Home /> },
// //         { to: "/manage-therapists", label: "Manage Therapists", icon: <Users /> },
// //         { to: "/admin-session", label: "Sessions", icon: <Calendar /> },
// //         { to: "/admin-report", label: "Reports", icon: <FileText /> },
// //         { to: "/admin-payments", label: "Payments", icon: <DollarSign /> },
// //         { to: "/admin-content", label: "Content Manager", icon: <BookOpen /> },
// //         { to: "/admin-settings", label: "Settings", icon: <Settings /> },
// //         { to: "/admin-logs", label: "Logs", icon: <List /> },
// //     ];
// //     return (
// //         <aside className='w-64 bg-white border-r hidden md:block'>
// //             <div className="p-4 text-center font-bold text-teal-600 text-xl">Admin Panel</div>
// //             <nav className="p-2 space-y-1">
// //                 {items.map((i) => (
// //                     <NavLink
// //                         to={i.to}
// //                         key={i.to}
// //                         className={({ isActive }) => `flex items-center gap-3 rounded-md text-gray-700 hover:bg-gray-50 ${isActive ? "bg-teal-50 text-teal-600" : ""}`
// //                         }>
// //                         <div className="w-5 h-5">{i.icon}</div>
// //                         <span className="text-sm">{i.label}</span>
// //                     </NavLink>
// //                 ))}
// //             </nav>
// //         </aside>
// //     )
// // }

// export default function AdminSidebar() {
//   const items = [
//     { to: "/admin-dashboard", label: "Dashboard", icon: <Home /> },
//     { to: "/manage-therapists", label: "Manage Therapists", icon: <Users /> },
//     { to: "/admin-session", label: "Sessions", icon: <Calendar /> },
//     { to: "/admin-report", label: "Reports", icon: <FileText /> },
//     { to: "/admin-payments", label: "Payments", icon: <DollarSign /> },
//     { to: "/admin-content", label: "Content Manager", icon: <BookOpen /> },
//     { to: "/admin-settings", label: "Settings", icon: <Settings /> },
//     { to: "/admin-logs", label: "Logs", icon: <List /> },
//   ];

//   return (
//     <aside className="w-64 fixed left-0 top-0 h-screen bg-white border-r shadow-sm">
//       <div className="p-4 text-center font-bold text-teal-600 text-xl border-b">
//         Admin Panel
//       </div>

//       <nav className="p-2 space-y-1">
//         {items.map((i) => (
//           <NavLink
//             to={i.to}
//             key={i.to}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 ${
//                 isActive ? "bg-teal-50 text-teal-600 font-semibold" : ""
//               }`
//             }
//           >
//             <div className="w-5 h-5">{i.icon}</div>
//             <span className="text-sm">{i.label}</span>
//           </NavLink>
//         ))}
//       </nav>
//     </aside>
//   );
// }


import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  FileText,
  DollarSign,
  BookOpen,
  Settings,
  List,
  X
} from "lucide-react";

export default function AdminSidebar({ isOpen, onClose }) {
  const items = [
    { to: "/admin-dashboard", label: "Dashboard", icon: <Home /> },
    { to: "/manage-therapists", label: "Manage Therapists", icon: <Users /> },
    { to: "/admin-session", label: "Sessions", icon: <Calendar /> },
    { to: "/admin-report", label: "Reports", icon: <FileText /> },
    { to: "/admin-payments", label: "Payments", icon: <DollarSign /> },
    { to: "/admin-content", label: "Content Manager", icon: <BookOpen /> },
    { to: "/admin-settings", label: "Settings", icon: <Settings /> },
    { to: "/admin-logs", label: "Logs", icon: <List /> },
  ];

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`top-0 left-0 z-50 h-screen w-64 bg-white border-r shadow-sm 
        md:sticky md:translate-x-0 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
         md:top-0 md:translate-x-0 md:static`}
      >
        <div className="p-4 flex items-center justify-between md:justify-center border-b">
          <span className="font-bold text-teal-600 text-xl">Admin Panel</span>
          <button className="md:hidden" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {items.map((i) => (
            <NavLink
              to={i.to}
              key={i.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm 
                ${isActive ? "bg-teal-50 text-teal-600 font-medium" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              <div className="w-5 h-5">{i.icon}</div>
              <span>{i.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}


