import React from 'react'

function DashboardCard({ title, value, icon }) {
  return (
    <div className='bg-white p-5 rounded-2xl shadow hover:shadow-md transition flex items-center gap-5'>
      <div className="bg-gray-100 p-4 rounded-xl">{icon}</div>
      <div>
        <p className="text-teal-500">{title}</p>
        <h3 className="text-xl font-bold text-gray-700">{value}</h3>
      </div>
    </div>
  )
}

export default DashboardCard
