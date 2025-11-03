import React, { useState } from 'react';
import Navbar from './subcomponents/AdminNavbar';
import Sidebar from "./subcomponents/AdminSidebar";
import Table from "./subcomponents/AdminTable";

function AdminSession() {
    const [list, setList] = useState([
        { id: 101, client: "Emily", therapist: "Sara Khan", date: "2025-10-29 10:00", type: "video", status: "completed" },
        { id: 102, client: "Arjun", therapist: "Dr. John Doe", date: "2025-10-30 13:00", type: "chat", status: "upcoming" },
        { id: 103, client: "Maya", therapist: "Rahul Mehra", date: "2025-10-31 09:00", type: "audio", status: "cancelled" },
    ]);

    const cancel = (id) => setList(prev => prev.map(s => s.id === id ? {...s, status: "cancelled"} : s));
    const reassign = (id) => setList(prev => prev.map(s => s.id === id ? {...s, therapist: "Reassigned Therapist"} : s));

     const columns = [
    { key: "id", title: "#" },
    { key: "client", title: "Client" },
    { key: "therapist", title: "Therapist" },
    { key: "date", title: "Date" },
    { key: "type", title: "Type" },
    { key: "status", title: "Status" },
  ];
    return (
          <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Sessions" />
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">All Sessions</h2>
            <div className="text-sm text-gray-500">You can cancel or reassign sessions here.</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <Table
              columns={columns}
              data={list}
              actions={(row) => (
                <div className="flex gap-2 justify-end">
                  <button onClick={() => reassign(row.id)} className="px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded">Reassign</button>
                  <button onClick={() => cancel(row.id)} className="px-2 py-1 text-sm bg-red-50 text-red-600 rounded">Cancel</button>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>     
    )
}

export default AdminSession
