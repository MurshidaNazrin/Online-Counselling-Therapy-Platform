import React, { useState } from 'react';
import Navbar from './subcomponents/AdminNavbar';
import Sidebar from "./subcomponents/AdminSidebar";
import Card from './ui/card';

const AdminLogs = () => {
    const [list,setList] = useState([
  { id: 1, actor: "Admin Asha", action: "Approved therapist Dr. John Doe", time: "2 hours ago" },
  { id: 2, actor: "Therapist Sara", action: "Updated availability", time: "1 day ago" },
]);
  return (
     <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Activity Logs" />
        <div className="p-6">
          <Card className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-3">Recent Activities</h3>
            <ul className="divide-y">
              {list.map(l => (
                <li key={l.id} className="py-3 flex justify-between items-start">
                  <div>
                    <div className="font-medium">{l.actor}</div>
                    <div className="text-sm text-gray-600">{l.action}</div>
                  </div>
                  <div className="text-sm text-gray-500">{l.time}</div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminLogs
