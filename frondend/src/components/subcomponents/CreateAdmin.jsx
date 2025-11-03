import React, { useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";

function CreateAdmin() {
  const [form, setForm] = useState({
    name : "",
    email : "",
    password: "",
    role: "admin", 
  });

const handleChange = (e) => {
  setForm({...form, [e.target.name]: e.target.value});
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    const token = localStorage.getItem("token");


    const res = await axios.post("http://localhost:3000/api/admin-create", form,
      { headers: {Authorization: `Bearer ${token}`}}
    );

    toast.success("Admin created successfully!");
    setForm({name: "", email: "", password: "", role: "admin"});

  }catch(err){
    if(err.response?.status === 409) {
      toast.error("Admin already exists!");
    } else {
      toast.error("Something went wrong!");
    }
  }
};


  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form action=""
      className='bg-white p-8 rounded-xl shadow-md w-full max-w-md'
      onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Create New Admin
        </h2>

        <div className="mb-4">
          <label htmlFor="" className="block text-gray-600 mb-2">Name</label>
          <input type="text" 
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  required
                  className='w-full border rounded p-2'
                  placeholder='Enter admin name'/>
        </div>

         <div className="mb-4">
          <label htmlFor="" className="block text-gray-600 mb-2">Email</label>
          <input type="email" 
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  required
                  className='w-full border rounded p-2'
                  placeholder='admin@example.com'/>
        </div>

        <div className="mb-4">
          <label htmlFor="" className="block text-gray-600 mb-2">Password</label>
          <input type="password" 
                  name='password'
                  value={form.password}
                  onChange={handleChange}
                  required
                  className='w-full border rounded p-2'
                  placeholder='Enter Password'/>
        </div>

        {/* <div className="mb-4">
          <label htmlFor="" className="block text-gray-600 mb-2">Role</label>
          <input type="text" 
                  name='role'
                  // value={}
                  // onChange={}
                  required
                  className='w-full border rounded p-2'
                  placeholder='role'/>
        </div> */}

        <button type="submit"
                className='w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition'>Create Admin</button>
      </form>
    </div>
  )
}

export default CreateAdmin
