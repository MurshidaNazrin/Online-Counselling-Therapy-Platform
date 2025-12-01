
import React, { useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { ampmTo24, timeToMinutes } from '../../../../Backend/utils/time';

const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const minutes = ["00", "15", "30", "45"];
const periods = ["AM", "PM"];

function AddSlotForm({ day, onAdded }) {
    const [start, setStart] = useState({ hour: "09", minute: "00", period: "AM" });
    const [end, setEnd] = useState({ hour: "10", minute: "00", period: "AM" });
    const [loading, setLoading] = useState(false);

    function merge(obj) {
        return `${obj.hour}:${obj.minute} ${obj.period}`;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const today = new Date().toISOString().split("T")[0];

        if( day < today) {
            toast.error("You cannot add slots for past dates");
            return;
        }

        const startStr = merge(start);
        const endStr = merge(end);

        const start24 = ampmTo24(startStr);
        const end24 = ampmTo24(endStr);

        // if (!start24 || !end24) {
        //     toast.error("Invalid time");
        //     return;
        // }

        if (timeToMinutes(start24) >= timeToMinutes(end24)) {
            toast.warning("Start time must be earlier than end time");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:3000/api/set-session",
                { date: day,  
                slots: [
                    {
                        startTime: start24,
                        endTime: end24,
                    }
                ]},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success("Slot added successfully ✔");

            onAdded();
        } catch (err) {
            console.error(err);
            toast.error("Could not save availability");
        } finally {
            setLoading(false);
        }
    }

    const dropdownClass =
        "border border-teal-400 rounded px-3 py-2 text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white hover:bg-gray-100 transition";

    const labelClass = "block text-sm font-semibold text-teal-700 mb-1";

    return (
        <form onSubmit={handleSubmit}
         className="space-y-6 bg-gray-300 p-6 rounded-xl shadow-lg flex flex-col items-center ">

            {/* START TIME */}
            <div>
                <label className={labelClass}>Start</label>
                <div className="flex gap-2 text-center">
                    <select
                        value={start.hour}
                        onChange={e => setStart({ ...start, hour: e.target.value })}
                        className={dropdownClass}
                    >
                        {hours.map(h => <option key={h}>{h}</option>)}
                    </select>

                    <select
                        value={start.minute}
                        onChange={e => setStart({ ...start, minute: e.target.value })}
                        className={dropdownClass}
                    >
                        {minutes.map((m) => (
                            <option key={m}>{m}</option>
                        ))}
                    </select>

                    <select
                        value={start.period}
                        onChange={e => setStart({ ...start, period: e.target.value })}
                        className={dropdownClass}
                    >
                        {periods.map((p) => (
                            <option key={p}>{p}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* END TIME */}
            <div>
                <label className={labelClass}>End</label>
                <div className="flex gap-3">
                    <select
                        value={end.hour}
                        onChange={e => setEnd({ ...end, hour: e.target.value })}
                        className={dropdownClass}
                    >
                        {hours.map(h => <option key={h}>{h}</option>)}
                    </select>

                    <select
                        value={end.minute}
                        onChange={e => setEnd({ ...end, minute: e.target.value })}
                        className={dropdownClass}
                    >
                        {minutes.map(m => <option key={m}>{m}</option>)}
                    </select>

                    <select
                        value={end.period}
                        onChange={e => setEnd({ ...end, period: e.target.value })}
                        className={dropdownClass}
                    >
                        {periods.map(p => <option key={p}>{p}</option>)}
                    </select>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-50 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-bold py-3 rounded-lg shadow-md transition"
            >
                {loading ? "Saving..." : "Add Slot"}
            </button>
        </form>
    );
}

export default AddSlotForm;
