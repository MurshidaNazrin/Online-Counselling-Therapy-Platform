import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './SprAdmnSidebar'
import Navbar from './SprAdmnNavbar';

function EditAdmin() {
    const {adminId} = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "admin",
    });

    const [loading, setLoading] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    // ======fetch admin ======
    const fetchAdmin = async () => {
        try{
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:3000/api/getadmin/${adminId}`, {
                headers: { Authorization: `Bearer ${token}`}
            });

            setForm({
                name: res.data.name,
                email: res.data.email,
                role: res.data.role
            })
        }catch(err){
          toast.error("Failed to load admin");
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmin();
    }, []);


    // =====update admin data =======
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem("token");

            await axios.put(`http://localhost:3000/api/updateadmin/${adminId}`, form,{
                headers: { Authorization: `Bearer ${token}`}
            });

            toast.success("Admin updated successfully!");
            navigate("/manage-admins");
        }catch(err){
            toast.error("Failed to update admin");
        }
    };

    if(loading) {
        return <p className='text-center mt-10'>Loading....</p>
    }
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 md:ml-64">
                <Navbar title="Edit Admin" />

                <div className="flex justify-center items-center mt-10">
                    <form action=""
                        onSubmit={handleSubmit}
                        className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'
                    >
                        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                            Edit Admin
                        </h2>

                        <label htmlFor="" className="block mb-2 text-gray-600">Name</label>
                        <input type="text"
                            name="name"
                              value={form.name}
                              onChange={handleChange}
                            required
                            className='w-full p-2 border rounded mb-4' />

                        <label htmlFor="" className="block mb-2 text-gray-600">Email</label>
                        <input type="email"
                            name="email"
                              value={form.email}
                              onChange={handleChange}
                            required
                            className='w-full p-2 border rounded mb-4' />

                        <label htmlFor="" className="block mb-2 text-gray-600">Role</label>
                        <select
                            name="role"
                              value={form.role}
                              onChange={handleChange}
                            required
                            className='w-full p-2 border rounded mb-4'>
                            <option value="admin">Admin</option>
                            <option value="superadmin">SuperAdmin</option>
                        </select>

                        <button type="submit"
                            className='w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700'
                        >
                            Update Admin
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditAdmin
