// import React, { useEffect, useState } from "react";
// import Sidebar from './client/Sidebar';
// import Navbar from "./client/Navbar";

// function Home() {
//   const [user, setUser] = useState({});
//   const [therapists, setTherapists] = useState([]);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 ml-60 pt-20 px-6">
//         <Navbar user={user} />
//         <h2 className="text-2xl font-bold mb-4">Available Therapists</h2>
//       </div>

//     </div>
//   )
// }

// export default Home


import { useState } from 'react';
import Sidebar from './client/Sidebar';
import DashboardCard from './client/DashboardCard';
import Therapistcard from './client/Therapistcard';
import { Menu, X, User, Calendar, MessageCircle, Heart, LogOut, Section } from "lucide-react";

function Home() {
  const [open, setOpen] = useState(false);
  const [therapists, setTherapists] = useState([]);

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 min-h-screen bg-white shadow-xl z-50 transform transition-transform duration-300 
        ${open ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-64"}`}
      >

        <div className="p-6 border-b border-white shadow-md">
          <img src="logo1 - Copy.png" alt="" className='h-22 w-32' />
        </div>

        <nav className="mt-6 space-y-1 px-4">
          <Sidebar icon={<User />} label="Profile" />
          <Sidebar icon={<Calendar />} label="Sessions" />
          <Sidebar icon={<MessageCircle />} label="Messages" />
          <Sidebar icon={<Heart />} label="Saved Therapists" />
          <Sidebar icon={<LogOut />} label="Logout" danger />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile top bar */}
        <header className='lg:hidden flex items-center justify-between px-4 py-3 bg-white shadow'>
          <h2 className="text-xl font-bold text-teal-700">Dashboard</h2>
          <button onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </header>

        {/* Mobile search + profile */}
        <div className="lg:hidden mt-4 px-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 p-3 rounded-xl border border-gray-300 shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <img
              src="https://via.placeholder.com/50"
              alt="profile"
              className="h-12 w-12 rounded-full object-cover shadow"
            />
          </div>
        </div>

          <main className="p-6">
            {/* top navbar */}
            <nav className="hidden lg:flex items-center justify-between bg-white p-4 rounded-xl shadow-md mb-6">
              <h2 className="text-2xl font-bold text-teal-700">Dashboard</h2>

              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder='Search...'
                  className='hidden lg:block p-2 w-72 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500'
                />

                <img
                  src="https://via.placeholder.com/50"
                  alt="profile"
                  className="h-12 w-12 rounded-full object-cover shadow"
                />
              </div>
            </nav>



            {/* Quick cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <DashboardCard
                title="Upcoming Sessions"
                value="3 Sessions"
                icon={<Calendar className='text-teal-500' />}
              />

              <DashboardCard
                title="Messages"
                value="12 new"
                icon={<MessageCircle className='text-teal-500' />}
              />

              <DashboardCard
                title="Saved Therapists"
                value="5"
                icon={<Heart className='text-teal-500' />}
              />
            </section>


            {/* Recent therapists */}
            <section className='mt-10'>
              <h3 className="text-xl font-semibold mb-4">Recently viewed Therapists</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                     {therapists.length === 0 ? (
            <p className="text-gray-500">No recently viewed therapists.</p>
        ) : (
            therapists.map((t) => <TherapistCard key={t._id} therapist={t} />)
        )}
                {/* {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className='p-4 bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer'
                  >
                    <div className='flex items-center gap-4'>
                      <img
                        src=""
                        alt="therapist"
                        className='h-16 w-16 rounded-full object-cover'
                      />
                      <div>
                        <h4 className="font-semibold text-lg">Therapist name</h4>
                        <p className="text-sm text-gray-500">psychologist, experience</p>
                      </div>
                    </div>
                    <button
                      className="mt-4 bg-teal-500 text-white w-full py-2 rounded-xl hover:bg-teal-600"
                    >
                      Book Now
                    </button>
                  </div>
                ))} */}

                {therapists.map((t)=>(
                  <Therapistcard key={t._id} therapist={t} />
                ))}
              </div>
            </section>

          </main>
        </div>
      </div>
      )
}

      export default Home
