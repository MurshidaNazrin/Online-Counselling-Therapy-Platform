import React from 'react';
import Sidebar from '../components/subcomponents/SprAdmnSidebar';
import Navbar from '../components/subcomponents/SprAdmnNavbar';
import Card from '../components/ui/card';
import { BarChart3, Shield, Settings, Users, LineChart } from 'lucide-react';
import { Link } from "react-router-dom";

function SuperadminDashboard() {
  const stats = [
    { icon: <Users />, label: "Total Admins", Value: 12 },
    { icon: <BarChart3 />, label: "Active Therapists", Value: 245 },
    { icon: <LineChart />, label: "Monthly Revenue", Value: "₹10,4590" },
    { icon: <Shield />, label: "Reported Issues", Value: 7 },
  ];

  return (
    <div className='flex-h-screen bg-gray-100'>
      <Sidebar />

      {/* Main content */}
      <div className='flex-1 flex flex-col md:ml-64'>

        <Navbar title="SuperAdmin Dashboard" />

        {/* DAshboard */}
        <div className='p-6 spce-y-6'>
        {/* stats card */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {stats.map((item, index) => (
            <Card
              key={index}
              className='p-5 shadow-md rounded-2xl bg-white hover:shadow-xl transition-all flex items-center gap-4'>
              <div className='flex items-center gap-4'>
                <div className='p-3 bg-teal-100 text-teal-600 rounded-full text-xl'>{item.icon}</div>
                <div>
                  <h3 className='text-lg font-semibold'>{item.label}</h3>
                  <p className="text-gray-600">{item.Value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

{/* Buttons */}
        <div className='p-6 grid sm:grid-cols-2 gap-6'>
          <Link
            to="/manage-admins"
            className='bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl text-center font-medium shadow-md hover:shadow-lg transition-all'>
            Manage Admins
          </Link>

          <Link
            to="/analytics"
            className='bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-xl text-center font-medium shadow-md hover:shadow-lg transition-all'>
            View Analytics
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SuperadminDashboard


