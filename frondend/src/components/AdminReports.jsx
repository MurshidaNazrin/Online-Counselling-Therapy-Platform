import React, { useState } from 'react';
import Navbar from './subcomponents/AdminNavbar';
import Sidebar from "./subcomponents/AdminSidebar";
import Table from "./subcomponents/AdminTable";

function AdminReports() {
    const [list, setList] = useState([
        { id: 1, type: "user_report", reporter: "Emily", target: "Rahul Mehra", reason: "Inappropriate behavior", status: "open" },
        { id: 2, type: "session_report", reporter: "Arjun", target: "Session 102", reason: "Dropped call", status: "resolved" },
    ]);

    const resolve = (id) => setList(prev => prev.map(r => r.id === id ? { ...r, status: "resolved" } : r));
    const escalate = (id) => setList(prev => prev.map(r => r.id === id ? { ...r, status: "escalated" } : r));

    const columns = [
        { key: "id", title: "#" },
        { key: "reporter", title: "Reporter" },
        { key: "target", title: "Target" },
        { key: "reason", title: "Reason" },
        { key: "status", title: "Status" },
    ];
    return (
        <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Reports & Moderation" />
        <div className="p-6">
          <div className="mb-4 flex justify-between">
            <h2 className="text-lg font-semibold">Reported Items</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <Table
              columns={columns}
              data={list}
              actions={(row) => (
                <div className="flex gap-2 justify-end">
                  <button onClick={() => resolve(row.id)} className="px-2 py-1 text-sm bg-green-50 text-green-600 rounded">Resolve</button>
                  <button onClick={() => escalate(row.id)} className="px-2 py-1 text-sm bg-red-50 text-red-600 rounded">Escalate</button>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
    )
}

export default AdminReports
