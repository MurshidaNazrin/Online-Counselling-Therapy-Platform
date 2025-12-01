import { useEffect, useState } from 'react';
import axios from "axios";
import { timeRegex, timeToMinutes, minutesToTime } from '../../../../Backend/utils/time';
import TpstSidebar from './TpstSidebar';
import TpstNavbar from './TpstNavbar';
import SlotList from './SlotList';
import AddSlotForm from './AddSlotForm';
import AvailabilityCalender from './AvailabilityCalender';
import toast from "react-hot-toast";

const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function TherapistAvailability() {
    const [availability, setAvailability] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(false);


    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    const token = localStorage.getItem("token");



    useEffect(() => {
        fetchMyAvailability();
    }, []);

    async function fetchMyAvailability() {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:3000/api/get-session", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAvailability(res.data.availability || []);
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "failed to fetch availability");
        } finally {
            setLoading(false);
        }
    }

    const dateKey = selectedDate.toLocaleDateString("en-CA");
    const dayEntry = availability.find(a => a.date === dateKey) || { slots: [] };




      // ======delete slot==========
  const handleDeleteSlot = async (slotId) => {
    try{
      const res = await axios.delete("http://localhost:3000/api/delete-slot", {
        headers: {
          Authorization: `Bearer ${token}`
        },
         data: {
        day: selectedDate.toLocaleDateString("en-CA"), // send "day"
        slotId
      }
     });

     toast.success("Slot deleted");

    //  update UI after deletion
     setAvailability(prev =>
      prev.map(a =>
        a.date === selectedDate.toLocaleDateString("en-CA")
          ? { ...a, slots: a.slots.filter(s => s._id !== slotId) }
          : a
      )
    );

    }catch(err){
    console.error(err);
    toast.error(err.response?.data?.message || "Delete failed");
    }
  };

    return (
        <div className='flex min-h-screen bg-gray-100'>
            {/* sidebar */}
            <TpstSidebar onToggle={setSidebarOpen} />

            <div className={`flex-1 transition-all duration-300 ${isMobile ? "ml-0" : sidebarOpen ? "ml-64" : "ml-20"
                }`}>

                <TpstNavbar />

                <div className='p-6'>
                    <h2 className="text-2xl font-semibold mb-6 text-teal-700">Manage Your availability</h2>

                  <div className="max-w-4xl mx-auto space-y-8">

                    {/* Existing Slots */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-700 mb-4">
                                Available Slots -- <span>{dateKey}</span></h3>
                            <SlotList slots={dayEntry.slots} onDelete={handleDeleteSlot}/>
                        </div>
                        
                    {/* calendar */}
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 ">
                        <h3 className="text-lg font-medium text-teal-700 mb-4">Select a Date</h3>
                        <AvailabilityCalender selectedDate={selectedDate} onSelectDate={setSelectedDate} 
                    />
                    </div>

                        

                        {/* Add Slot Form */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                            <h3 className="text-lg font-medium mb-4 text-gray-700">Add Slot</h3>
                            <AddSlotForm
                                day={dateKey}
                                onAdded={fetchMyAvailability}
                            />
                        </div>
                        </div>
                    </div>
               


            </div>
        </div>
    )
}

export default TherapistAvailability
