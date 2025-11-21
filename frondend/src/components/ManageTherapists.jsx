import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp, Ban, RefreshCcw, Check, X } from "lucide-react";
import AdminLayout from "./subcomponents/AdminLayouts";

function ManageTherapists() {
    const [therapists, setTherapists] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const [notes, setNotes] = useState("");
    const containerRef = useRef(null);

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

    useEffect(() => {
        function handleClickOutside(e){
            if(expanded && containerRef.current && !containerRef.current.contains(e.target)){
              setExpanded(null);
              setNotes("");
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return ()=>document.removeEventListener("mousedown", handleClickOutside);
    }, [expanded]);



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
            setExpanded(null);
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
                                            <td className="p-4 flex gap-3 items-center">
                                                <img src={t.profileImage} alt="profileimage" className="h-12 w-12 rounded-full object-cover" />
                                                <span className="font-medium">{t.name}</span>

                                            </td>
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
                                                <td colSpan="4" className="p-6">
                                                    <div ref={containerRef} className="bg-white rounded-2xl shadow-md p-6 md:p-10 grid md:grid-cols-3 gap-8 items-start">

                                                        {/* LEFT SECTION - profile image + basic info */}
                                                        <div className="flex flex-col items-center text-center space-y-3">

                                                            <img
                                                                src={t.profileImage}
                                                                alt="profile"
                                                                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-teal-200"
                                                            />

                                                            <h2 className="text-lg font-semibold text-gray-800">
                                                                {t.name}
                                                            </h2>

                                                            <p className="text-sm text-gray-500">
                                                                {t.profession || "N/A"}
                                                            </p>

                                                            {t.certificate && (
                                                                <a
                                                                    href={t.certificate}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-medium"
                                                                >
                                                                    View Certificate
                                                                </a>
                                                            )}

                                                            <div className="flex gap-3 mt-4">
                                                                <button
                                                                    onClick={() => updateStatus(t._id, "approved")}
                                                                    className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition"
                                                                >
                                                                    <Check size={16} />
                                                                </button>

                                                                <button
                                                                    onClick={() => updateStatus(t._id, "rejected")}
                                                                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 transition"
                                                                >
                                                                    <X size={16} />
                                                                </button>

                                                                <button
                                                                    onClick={() => toggleAccount(t._id, !t.isActive)}
                                                                    className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-lg text-sm hover:bg-gray-800 transition"
                                                                >
                                                                    {t.isActive ? <Ban size={16} /> : <RefreshCcw size={16} />}
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* RIGHT SECTION */}
                                                        <div className="md:col-span-2 space-y-6">
                                                            <div>
                                                                <h3 className="text-gray-700 font-semibold mb-2">
                                                                    Personal Information
                                                                </h3>

                                                                <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                                                                    <p>
                                                                        <span className="font-medium text-gray-800">Email:</span>{" "}
                                                                        {t.email}
                                                                    </p>
                                                                    <p>
                                                                        <span className="font-medium text-gray-800">Experience:</span>{" "}
                                                                        {t.experience ? `${t.experience} years` : "N/A"}
                                                                    </p>
                                                                    <p>
                                                                        <span className="font-medium text-gray-800">Qualification:</span>{" "}
                                                                        {t.qualifications || "N/A"}
                                                                    </p>
                                                                    <p>
                                                                        <span className="font-medium text-gray-800">Specialization:</span>{" "}
                                                                        {Array.isArray(t.specialization)
                                                                            ? t.specialization.join(", ")
                                                                            : t.specialization || "N/A"}
                                                                    </p>
                                                                    <p>
                                                                        <span className="font-medium text-gray-800">Gender:</span>{" "}
                                                                        {t.gender || "N/A"}
                                                                    </p>
                                                                    <p>
                                                                        <span className="font-medium text-gray-800">Phone:</span>{" "}
                                                                        {t.phone || "N/A"}
                                                                    </p>
                                                                    <p>
                                                                        <span className="font-medium text-gray-800">Languages:</span>{" "}
                                                                        {Array.isArray(t.languages)
                                                                            ? t.languages.join(", ")
                                                                            : t.languages || "N/A"}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {t.bio && (
                                                                <div>
                                                                    <h3 className="text-gray-700 font-semibold mb-2">About</h3>
                                                                    <p className="text-gray-600 text-sm leading-relaxed">{t.bio}</p>
                                                                </div>
                                                            )}

                                                            {/* NOTES */}
                                                            <div>
                                                                <h3 className="text-gray-700 font-semibold mb-2">Admin Notes</h3>
                                                                <textarea
                                                                    className="w-full border p-3 rounded-lg mt-2 shadow-sm"
                                                                    rows="3"
                                                                    placeholder="Write notes..."
                                                                    value={notes}
                                                                    onChange={(e) => setNotes(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
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
                                <div className="mt-4 bg-white rounded-2xl shadow-md p-5 space-y-6 border">

                                    {/* PROFILE IMAGE + BASIC INFO */}
                                    <div className="flex flex-col items-center text-center space-y-3">
                                        <img
                                            src={t.profileImage || "/default.jpg"}
                                            alt="profile"
                                            className="w-28 h-28 rounded-full object-cover border-4 border-teal-200"
                                        />

                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {t.name}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {t.profession || "N/A"}
                                        </p>

                                        {t.certificate && (
                                            <a
                                                href={t.certificate}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 font-medium"
                                            >
                                                View Certificate
                                            </a>
                                        )}
                                    </div>

                                    {/* PERSONAL INFO */}
                                    <div>
                                        <h3 className="text-gray-700 font-semibold mb-2">
                                            Personal Information
                                        </h3>

                                        <div className="grid grid-cols-1 gap-2 text-sm text-gray-600">
                                            <p>
                                                <span className="font-medium text-gray-800">Email:</span>{" "}
                                                {t.email}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800">Experience:</span>{" "}
                                                {t.experience ? `${t.experience} years` : "N/A"}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800">Qualification:</span>{" "}
                                                {t.qualifications || "N/A"}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800">Specialization:</span>{" "}
                                                {Array.isArray(t.specialization)
                                                    ? t.specialization.join(", ")
                                                    : t.specialization || "N/A"}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800">Gender:</span>{" "}
                                                {t.gender || "N/A"}
                                            </p>

                                            <p>
                                                <span className="font-medium text-gray-800">Phone:</span>{" "}
                                                {t.phone || "N/A"}
                                            </p>

                                            <p>
                                                <span className="font-medium text-gray-800">Languages:</span>{" "}
                                                {Array.isArray(t.languages)
                                                    ? t.languages.join(", ")
                                                    : t.languages || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* BIO */}
                                    {t.bio && (
                                        <div>
                                            <h3 className="text-gray-700 font-semibold mb-2">About</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {t.bio}
                                            </p>
                                        </div>
                                    )}

                                    {/* NOTES */}
                                    <div>
                                        <h3 className="text-gray-700 font-semibold mb-2">Admin Notes</h3>
                                        <textarea
                                            rows="3"
                                            className="w-full border p-3 rounded-lg shadow-sm"
                                            placeholder="Write notes..."
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                        />
                                    </div>

                                    {/* ACTION BUTTONS */}
                                    <div className="grid grid-cols-3 gap-2 pt-2">
                                        <button
                                            onClick={() => updateStatus(t._id, "approved")}
                                            className="bg-green-600 text-white rounded-lg py-2 text-sm"
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={() => updateStatus(t._id, "rejected")}
                                            className="bg-red-600 text-white rounded-lg py-2 text-sm"
                                        >
                                            Reject
                                        </button>

                                        <button
                                            onClick={() => toggleAccount(t._id, !t.isActive)}
                                            className="bg-black text-white rounded-lg py-2 text-sm"
                                        >
                                            {t.isActive ? "Disable" : "Enable"}
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>

    );
}

export default ManageTherapists;
