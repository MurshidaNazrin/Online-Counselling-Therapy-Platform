import React, { useState } from 'react';
import Navbar from './subcomponents/AdminNavbar';
import Sidebar from "./subcomponents/AdminSidebar";
import Table from "./subcomponents/AdminTable";

export default function AdminContentManager() {
    const [list, setList] = useState([
  { id: 1, title: "Coping with Anxiety", type: "article", status: "published" },
  { id: 2, title: "Mindfulness Exercises", type: "video", status: "draft" },
]);
  
  const publish = (id) => setList(prev => prev.map(c => c.id === id ? { ...c, status: "published" } : c));
  const unpublish = (id) => setList(prev => prev.map(c => c.id === id ? { ...c, status: "draft" } : c));

  
  const columns = [
    { key: "id", title: "#" },
    { key: "title", title: "Title" },
    { key: "type", title: "Type" },
    { key: "status", title: "Status" },
  ];
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Content Manager" />
        <div className="p-6">
          <div className="mb-4 flex justify-between">
            <h2 className="text-lg font-semibold">Content Library</h2>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">Create Content</button>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <Table
              columns={columns}
              data={list}
              actions={(row) => (
                <div className="flex gap-2 justify-end">
                  {row.status !== "published" ? <button onClick={() => publish(row.id)} className="px-2 py-1 text-sm bg-green-50 text-green-600 rounded">Publish</button> : <button onClick={() => unpublish(row.id)} className="px-2 py-1 text-sm bg-yellow-50 text-yellow-600 rounded">Unpublish</button>}
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
