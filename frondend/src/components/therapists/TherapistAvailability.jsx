import  { useEffect, useState } from 'react';
import axios from "axios";
import { timeRegex, timeToMinutes, minutesToTime } from '../../../../Backend/utils/time';
import SlotList from './SlotList';
import AddSlotForm from './AddSlotForm';
import toast from "react-hot-toast";

const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function TherapistAvailability() {
    const [availability, setAvailability] = useState([]);
    const [selectedDay, setSelectedDay] = useState(Days[0]);
    const [loading, setLoading] = useState(false);
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
            toast.error(err?.response?.data.message || "failed to fetch availability");
        }finally {
             setLoading(false); }
    }

    const dayEntry = availability.find(a => a.day === selectedDay) || { slots: [] };
    return (
        <div className='p-6'>
            <h2 className="text-2xl font-semibold mb-4">Set Your availability</h2>

            <div className="flex gap-4 mb-6">
                {Days.map(d => (
                    <button
                       key={d}
                       onClick={()=> setSelectedDay(d)}
                       className={`px-3 py-1 rounded ${selectedDay === d ? "bg-slate-800 text-white" : "bg-slate-100"}`}>
                        {d.slice(0,3)}
                       </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-medium mb-3">{selectedDay} slots</h3>
                    <SlotList>

                    </SlotList>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-medium mb-3">Add slot for {selectedDay}</h3>
                    <AddSlotForm 
                       day={selectedDay}
                       token={token}
                       onAdded={fetchMyAvailability}
                    />
                </div>
            </div>
            hii
        </div>
    )
}

export default TherapistAvailability
