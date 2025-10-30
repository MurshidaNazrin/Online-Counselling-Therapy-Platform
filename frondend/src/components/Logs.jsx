import React from 'react';
import Sidebar from "../components/subcomponents/SprAdmnSidebar";
import Navbar from '../components/subcomponents/SprAdmnNavbar';

function Logs() {
    const logs = [
    { id: 1, action: "Admin 'Sara' created a new therapist", time: "2 mins ago" },
    { id: 2, action: "Therapist 'John' updated availability", time: "1 hour ago" },
    { id: 3, action: "Client 'Emily' booked a session", time: "3 hours ago" },
    { id: 4, action: "SuperAdmin updated security settings", time: "Yesterday" },
  ];
  return (
      <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-64">
        <Navbar title="Activity Logs" />
        <div className="p-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recent Platform Activities</h3>
            <ul className="divide-y divide-gray-200">
              {logs.map((log) => (
                <li key={log.id} className="py-3 flex justify-between text-gray-700">
                  <span>{log.action}</span>
                  <span className="text-sm text-gray-500">{log.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logs
