import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/subcomponents/SprAdmnSidebar";
import Navbar from '../components/subcomponents/SprAdmnNavbar';
import { Pencil, Trash, Plus } from "lucide-react";
import axios from 'axios';


function ManageAdmin() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ===========ftech admins===============
  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:3000/api/getadmins", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setAdmins(res.data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch admin list");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);



  // ==========Delete Admin==============
  const handleDelete = async (adminId) => {
    if (!window.confirm("Are You sure you want to delete this admin?")) return;

    try{
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/deleteadmin/${adminId}`, {
        headers: { Authorization: `Bearer ${token}`}
      });

      toast.success("Admin deleted successfully!");
      setAdmins(admins.filter(admin => admin._id !== adminId));
    }catch(err){
      console.log(err);
      toast.error("Failed to delete admin");
    }
  };
  

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col md:ml-64'>
        <Navbar title="Manage Admins" />
        <div className='p-6'>
          <h3 className='text-xl font-semibold mb-4'>Admin List</h3>
          <div>
            <button className='bg-teal-600 text-white px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-teal-700'
              onClick={() => navigate('/create-admin')}><Plus size={16} /></button>
          </div>

          {loading && <p>Loading admins...</p>}
          {error && <p className='text-red-600'>{error}</p>}
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
                {admins.map((admin, index) => (
                  <tr key={admin._id} className='border-t hover:bg-gray-50'>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{admin.name}</td>
                    <td className="p-3">{admin.email}</td>
                    <td className="p-3">{admin.role}</td>
                    <td className="p-3 text-right space-x-2">
                      <button 
                      onClick={()=>navigate(`/edit-admin/${admin._id}`)}
                      className='p-2 text-teal-600 hover:bg-teal-100 rounded'>
                        <Pencil size={16} />
                      </button>


                      <button 
                      onClick={() => handleDelete(admin._id)}
                      className='p-2 text-red-600 hover:bg-red-100 rounded'>
                      <Trash size={16} />
                      </button>
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
