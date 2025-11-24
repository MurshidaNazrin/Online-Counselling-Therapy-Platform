
import { useState, useEffect } from 'react';
import axios from "axios";
import Sidebar from './client/Sidebar';
import DashboardCard from './client/DashboardCard';
import Therapistcard from './client/Therapistcard';
import toast from 'react-hot-toast';
import { Menu, X, User, Calendar, MessageCircle, Heart, LogOut } from "lucide-react";

function Home() {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // =====fetch client profile=====
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data.user);

        // =====fetch approved therapists=====
        const resTherapists = await axios.get("http://localhost:3000/api/fetchtherapists", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTherapists(resTherapists.data.therapists || []);
      } catch (err) {
        console.error("Profile fetch error:", err);

        // backend error message
        const msg = err.response?.data?.message ||
          "Unable to load profile. Something went wrong."

        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);




  // ===========Logout==========
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    window.location.href = "/";
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside
        className={`fixed lg:fixed top-0 left-0 min-h-screen bg-white shadow-xl z-50 transform transition-transform duration-300 
        ${open ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-64"}`}
      >

        <div className="p-6 border-b border-white shadow-md">
          <img src="logo1 - Copy.png" alt="" className='h-22 w-32' />
        </div>

        <nav className="mt-6 space-y-1 px-4">
          <Sidebar icon={<User />} label="Profile" path="/profile" />
          <Sidebar icon={<Calendar />} label="Sessions" />
          <Sidebar icon={<MessageCircle />} label="Messages" />
          <Sidebar icon={<Heart />} label="Saved Therapists" />
          <Sidebar icon={<LogOut />} label="Logout" danger onClick={handleLogout} />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 transition-all duration-300">
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

            <button>
              <img
                src={profile?.profileImage}
                alt="profile"
                className="h-12 w-12 rounded-full object-cover shadow"
              />
            </button>
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

              <button>
                <img
                  src={profile?.profileImage}
                  alt="profile"
                  className="h-12 w-12 rounded-full object-cover shadow"
                />
              </button>

              <div><span>{profile?.name}</span></div>
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


          {/*  therapists */}
          {/* <section className='mt-10'>
              <h3 className="text-xl font-semibold mb-4">Therapists</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                     {therapists.length === 0 ? (
            <p className="text-gray-500">No therapists available.</p>
        ) : (
            therapists.map((t) => <Therapistcard key={t._id} therapist={t} />)
        )}
              
              </div>
            </section> */}

          <section className='mt-10'>
            <h3 className="text-xl font-semibold mb-4">Therapists</h3>

            {loading ? (
              <p className="text-gray-500 text-center py-6">Loading therapists...</p>
            ) : therapists.length === 0 ? (
              <p className="text-gray-500">No therapists available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {therapists.map((t) => (
                  <Therapistcard key={t._id} therapist={t} />
                ))}
              </div>
            )}
          </section>

        </main>
      </div>
    </div>
  )
}

export default Home
