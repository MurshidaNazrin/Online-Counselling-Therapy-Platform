

// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import {  ChevronDown, ChevronUp, Check, X, Ban, RefreshCcw } from "lucide-react";
// import Navbar from './subcomponents/AdminNavbar';
// import Sidebar from "./subcomponents/AdminSidebar";


// function ManageTherapists() {
//     const [therapists, setTherapists] = useState([]);
//     const [filter, setFilter] = useState("all");
//     const [loading, setLoading] = useState(false);
//     const [selected, setSelected] = useState(null);
//     const [notes, setNotes] = useState("");

//     async function fetchTherapists() {
//         try {
//             setLoading(true);
//             const token = localStorage.getItem("token");

//             const query = filter === "all" ? "" : `?status=${filter}`;
//             const res = await axios.get(`http://localhost:3000/api/therapists${query}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );


//             setTherapists(res.data.data || []);
//         } catch (err) {
//             console.error("Fetch error:", err);
//         } finally {
//             setLoading(false);
//         }
//     }
//     useEffect(() => {
//         fetchTherapists();
//     }, [filter]);



//     async function updateStatus(id, status) {
//         try {
//             const token = localStorage.getItem("token");

//             await axios.put(`http://localhost:3000/api/therapist-status/${id}`,
//                 { isApproved: status, adminNotes: notes },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             fetchTherapists();
//             setSelected(null);
//             setNotes("");
//         } catch (err) {
//             console.error("Status update error", err);
//         }
//     }



//     async function toggleAccount(id, action) {
//         try {
//             const token = localStorage.getItem("token");

//             await axios.put(`http://localhost:3000/api/therapist-active/${id}`,
//                 { isActive: action },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             fetchTherapists();
//         } catch (err) {
//             console.error("Account toggle error", err);
//         }
//     }


//     return (
//         <div className='p-4 md:p-6 max-w-7xl mx-auto'>

//             {/* Header */}
//             <div className='flex flex-col sm:flex-row justify-between items-start sm:justify-between sm:items-center gap-4 mb-6'>
//                 <h1 className='text-xl sm:text-2xl font-semibold tracking-tight'>Manage Therapists</h1>


//                 <select
//                     className='border px-4 py-2 rounded-md w-full sm:w-fit'
//                     value={filter}
//                     onChange={(e) => setFilter(e.target.value)}>

//                     <option value="all">All</option>
//                     <option value="pending">Pending</option>
//                     <option value="approved">Approved</option>
//                     <option value="rejected">Rejected</option>
//                 </select>
//             </div>

//             {/* Loading */}
//             {loading && <p className='text-center py-6 text-gray-600'>Loading.....</p>}

//             {/* responsive Table-cards */}
//             <div className="hidden md:block overflow-x-auto rounded-lg shadow bg-white">
//                 <table className="min-w-full">
//                     <thead>
//                         <tr className="bg-gray text-left text-sm text-gray-70">
//                             <th className="p-4">Name</th>
//                             <th className="p-4">Email</th>
//                             <th className="p-4">Status</th>
//                             <th className="p-4">Active</th>
//                             <th className="p-4">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {therapists.map((t) => (
//                             <tr key={t._id} 
//                             onClick={()=>setSelected(t)}
//                             className={`border-t cursor-pointer transition ${t.isActive ? "" : "opacity-50 bg-gray-200"}`}>
//                                 <td className="p-4">{t.name}</td>
//                                 <td className="p-4 brak-all">{t.email}</td>
//                                 <td className="p-4 capitalize">{t.isApproved}</td>
//                                 <td className="p-4">{t.isActive ? "Active" : "Disabled"}</td>
//                                 <td className="p-4 flex gap-4 items-center">
//                                     <button
//                                         onClick={() => toggleAccount(t._id, !t.isActive)}
//                                         className="text-red-600"
//                                     >
//                                         {t.isActive ? <Ban size={20} /> : <RefreshCcw size={20} />}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>


//             {/* mobile */}
//             <div className="md:hidden grid gap-4">
//                 {therapists.map((t) => (
//                     <div key={t._id}
//                         onClick={()=> setSelected(t)}
//                         className={`bg-white p-4 rounded-xl shadow space-y-2 cursor-pointer transition ${t.isActive ? "" : "opacity-50 bg-gray-200"}`}>
//                         <p className="font-semibold text-lg">{t.name}</p>
//                         <p className='text-sm break-all' >{t.email}</p>

//                         <div className="flex justify-between text-sm">
//                             <span>Status: {t.isApproved}</span>
//                             <span>Active: {t.isActive ? "Yes" : "No"}</span>
//                         </div>

//                         <div className="flex gap-4 mt-2">
//                             <button
//                                 onClick={() => toggleAccount(t._id, !t.isActive)}
//                                 className='text-red-600 flex items-center gap-1'>

//                                 {t.isActive ? (
//                                     <>
//                                         <Ban size={18} /> Disable
//                                     </>
//                                 ) : (
//                                     <>
//                                         <RefreshCcw size={18} /> Enable
//                                     </>
//                                 )}

//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Modal */}
//             {selected && (
//                 <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
//                     <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-lg max-h[90vh] overflow-y-auto">
//                         <h2 className="text-xl font-semibold mb-2">{selected.name}</h2>

//                         <p className="mb-1"><b>Email:</b>{selected.email}</p>
//                         <p className="mb-1"><b>Proffession:</b>{selected.proffession}</p>
//                         <p className="mb-1"><b>Experience:</b>{selected.experience}</p>
//                         <p className="mb-1"><b>Experience:</b>{selected.certificate}</p>
//                         {/* add qualification, specialization,certificate, bio */}

//                         <textarea
//                             className="w-full border p-3 rounded-md mt-4"
//                             rows="3"
//                             placeholder="Admin Notes..."
//                             value={notes}
//                             onChange={(e) => setNotes(e.target.value)}
//                         />

//                         <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
//                             <button
//                                 onClick={() => updateStatus(selected._id, "approved")}
//                                 className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg flex items-center justify-center gap-2"
//                             >
//                                 <Check size={18} /> Approve
//                             </button>

//                             <button
//                                 onClick={() => updateStatus(selected._id, "rejected")}
//                                 className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg flex items-center justify-center gap-2"
//                             >
//                                 <X size={18} /> Reject
//                             </button>

//                             <button
//                                 onClick={() => setSelected(null)}
//                                 className="flex-1 px-4 py-2 border rounded-lg"
//                             >
//                                 Close
//                             </button>
//                         </div>

//                     </div>
//                 </div>
//             )}


//         </div>
//     )
// }

// export default ManageTherapists








import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, Ban, RefreshCcw, Check, X } from "lucide-react";
import AdminLayout from "./subcomponents/AdminLayouts";

function ManageTherapists() {
    const [therapists, setTherapists] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const [notes, setNotes] = useState("");

    function statusBadge(status) {
        const base = "px-3 py-1 rounded-full text-xs font-semibold";

        switch (status) {
            case "approved":
                return <span className={base + " bg-green-100 text-green-700"}>Approved</span>;
            case "rejected":
                return <span className={base + " bg-red-100 text-red-700"}>Rejected</span>;
            default:
                return <span className={base + " bg-orange-100 text-orange-700"}>Pending</span>;
        }
    }

    async function fetchTherapists() {
        setLoading(true);
        const token = localStorage.getItem("token");

        try {
            const query = filter === "all" ? "" : `?status=${filter}`;
            const res = await axios.get(`http://localhost:3000/api/therapists${query}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setTherapists(res.data.data || []);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTherapists();
    }, [filter]);



    async function updateStatus(id, status) {
        try {
            const token = localStorage.getItem("token");

            await axios.put(`http://localhost:3000/api/therapist-status/${id}`,
                { isApproved: status, adminNotes: notes },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchTherapists();
            setSelected(null);
            setNotes("");
        } catch (err) {
            console.error("Status update error", err);
        }
    }

    async function toggleAccount(id, action) {
        try {
            const token = localStorage.getItem("token");

            await axios.put(`http://localhost:3000/api/therapist-active/${id}`,
                { isActive: action },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchTherapists();
        } catch (err) {
            console.error("Account toggle error", err);
        }
    }

    return (
        <AdminLayout title="Manage Therapists">
            <div className="p-4 md:p-6 ">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Manage Therapists</h1>

                    <select
                        className="border px-4 py-2 rounded-lg shadow-sm bg-white"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {loading && <p className="text-center py-6 text-gray-600">Loading...</p>}

                {/* Desktop Table */}
                <div className="hidden md:block bg-white rounded-xl shadow border overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-blue-100 text-left text-sm text-teal-700">
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Status</th>
                                {/* <th className="p-4">Active</th> */}
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {therapists.map((t) => {
                                const isOpen = expanded === t._id;

                                return (
                                    <React.Fragment key={t._id}>

                                        {/* MAIN ROW */}
                                        <tr
                                            onClick={() => setExpanded(isOpen ? null : t._id)}
                                            className={`cursor-pointer border-t transition-all ${!t.isActive ? "bg-gray-100 opacity-70" : "hover:bg-gray-50 bg-white"
                                                }`}
                                        >
                                            <td className="p-4 font-medium">{t.name}</td>
                                            <td className="p-4 break-all">{t.email}</td>
                                            <td className="p-4">{statusBadge(t.isApproved)}</td>
                                            {/* <td className="p-4">{t.isActive ? "Active" : "Disabled"}</td> */}

                                            <td className="p-4 flex items-center gap-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleAccount(t._id, !t.isActive);
                                                    }}
                                                    className="text-red-600"
                                                >
                                                    {t.isActive ? <Ban size={18} /> : <RefreshCcw size={18} />}
                                                </button>
                                            </td>
                                        </tr>

                                        {/* EXPANDED DETAILS */}
                                        {isOpen && (
                                            <tr className="bg-gray-50 border-t">
                                                <td colSpan="4" className="p-6 space-y-3">
                                                    <div className="grid md:grid-cols gap-4">
                                                        <p><b>Profession:</b> {t.profession || "—"}</p>
                                                        <p><b>Experience:</b> {t.experience || "—"} years</p>
                                                        <p><b>Qualifications:</b> {t.qualifications || "—"}</p>
                                                        <p><b>Specialization:</b> {t.specialization || "—"}</p>
                                                        <p><b>Phone:</b> {t.phone || "—"}</p>
                                                        <p><b>Gender:</b> {t.gender || "—"}</p>
                                                        <p><b>Languages:</b> {t.languages || "—"}</p>
                                                        <p><b>Status:</b> {t.isApproved}</p>
                                                    </div>

                                                    <p><b>Bio:</b>{t.bio || "-"}</p>

                                                    {t.certificate && (
                                                        <p>
                                                            <b>Certificate:</b>{" "}
                                                            <a
                                                                href={t.certificate}
                                                                target="_blank"
                                                                className="text-blue-600 underline"
                                                            >
                                                                View Certificate
                                                            </a>
                                                        </p>
                                                    )}


                                                    <textarea
                                                        className="w-full border p-3 rounded-lg mt-2 shadow-sm"
                                                        rows="3"
                                                        placeholder="Admin Notes..."
                                                        value={notes}
                                                        onClick={(e) => e.stopPropagation()}
                                                        onChange={(e) => setNotes(e.target.value)}
                                                    />

                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updateStatus(t._id, "approved");
                                                            }}
                                                            className="px-4 py-2 bg-green-600 text-white rounded-lg"
                                                        >
                                                            Approve
                                                        </button>

                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updateStatus(t._id, "rejected");
                                                            }}
                                                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>

                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden grid gap-4">
                    {therapists.map((t) => (
                        <div
                            key={t._id}
                            className={`rounded-xl p-4 shadow border transition ${!t.isActive ? "bg-gray-100 opacity-70" : "bg-white"
                                }`}
                        >
                            <div
                                className="flex justify-between items-center"
                                onClick={() => setExpanded(expanded === t._id ? null : t._id)}
                            >
                                <div>
                                    <p className="font-semibold text-lg">{t.name}</p>
                                    <p className="text-sm text-gray-600">{t.email}</p>
                                </div>
                                {expanded === t._id ? (
                                    <ChevronUp size={22} className="text-blue-600" />
                                ) : (
                                    <ChevronDown size={22} className="text-blue-600" />
                                )}
                            </div>

                            {expanded === t._id && (
                                <div className="mt-3 space-y-3">
                                    <p><b>Status:</b> {statusBadge(t.isApproved)}</p>
                                    <p><b>Profession:</b> {t.profession || "—"}</p>

                                    <textarea
                                        rows="3"
                                        className="w-full border p-3 rounded-lg"
                                        placeholder="Admin Notes..."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => updateStatus(t._id, "approved")}
                                            className="flex-1 bg-green-600 text-white rounded-lg py-2"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(t._id, "rejected")}
                                            className="flex-1 bg-red-600 text-white rounded-lg py-2"
                                        >
                                            Reject
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => toggleAccount(t._id, !t.isActive)}
                                        className="w-full bg-black text-white rounded-lg py-2 mt-1"
                                    >
                                        {t.isActive ? "Disable Account" : "Enable Account"}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
        // </div>
    );
}

export default ManageTherapists;
