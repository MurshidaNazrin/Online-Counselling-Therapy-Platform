import React, { useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { timeRegex } from '../../../../Backend/utils/time';

function AddSlotForm({ day, token, onAdded }) {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!timeRegex.test(start) || !timeRegex.test(end)) {
            toast.error("Time format must be HH:MM (24h)");
            return;
        }
        if (start >= end) {
            toast.warning("Start time must be earlier than end time");
            return;
        }  

        setLoading(true);

        try {
            const token = localStorage.getItem("token")
            await axios.post("http://localhost:3000/api/set-session", {
                availability: [{ day, slots: [{ start, end }] }]
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                },
            });

             toast.success("Slot added successfully ✔");
            
            onAdded();
            setStart(""); 
            setEnd("");

        } catch (err) {
            console.error(err);
            alert("Could not save availability");
        } finally { setLoading(false); }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className='space-y-3'
        >
            <div>
                <label className='block text-sm'>Start</label>
                <input type="time" value={start} onChange={e => setStart(e.target.value)}
                    placeholder='09:00' className='w-full border p-2 rounded' />
            </div>

            <div>
                <label className='block text-sm'>End</label>
                <input value={end} onChange={e => setEnd(e.target.value)}
                    placeholder='12:00' className='w-full border p-2 rounded' />
            </div>

            <button type="submit" disabled={loading} className="px-4 py-2 bg-sky-600 text-white rounded">
                {loading ? "Saving..." : "Add slot"}
            </button>

        </form>
    );
}

export default AddSlotForm
