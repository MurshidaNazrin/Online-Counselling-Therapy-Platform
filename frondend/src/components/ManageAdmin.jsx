import React, { useState } from 'react';
import Sidebar from "../components/subcomponents/SprAdmnSidebar";
import Navbar from '../components/subcomponents/SprAdmnNavbar';
import { Pencil, Trash} from "lucide-react";


function ManageAdmin() {
      const [admins] = useState([
    { id: 1, name: "John Doe", email: "john@therapy.com", role: "Admin" },
    { id: 2, name: "Sara Khan", email: "sara@therapy.com", role: "Moderator" },
  ]);
  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar/>
      <div className='flex-1 flex flex-col md:ml-64'>
        <Navbar title="Manage Admins" />
        <div className='p-6'>
            <h3 className='text-xl font-semibold mb-4'>Admin List</h3>
            <div className='bg-white rounded-lg shadow overflow-x-auto'>
                <table className='w-full text-left'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className="p-3">#</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                      {admins.map((admin) => (
                        <tr key={admin.id} className='border-t hover:bg-gray-50'>
                            <td className="p-3">{admin.id}</td>
                            <td className="p-3">{admin.name}</td>
                            <td className="p-3">{admin.email}</td>
                            <td className="p-3">{admin.role}</td>
                            <td className="p-3 text-right space-x-2">
                                <button className='p-2 text-teal-600 hover:bg-teal-100 rounded'><Pencil size={16} /></button>
                                <button className='p-2 text-teal-600 hover:bg-teal-100 rounded'><Trash size={16} /></button>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ManageAdmin
