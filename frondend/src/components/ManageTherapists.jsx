import React, { useState } from 'react';
import Navbar from './subcomponents/AdminNavbar';
import Sidebar from "./subcomponents/AdminSidebar";
import Table from "./subcomponents/AdminTable";
import Modal from "./subcomponents/AdminModal";

function ManageTherapists() {
    const [therapists, setTherapists] = useState([
        { id: 1, name: "Dr. John Doe", email: "john@therapist.com", status: "pending", license: "LIC123", rating: 4.6 },
        { id: 2, name: "Sara Khan", email: "sara@therapist.com", status: "approved", license: "LIC987", rating: 4.9 },
        { id: 3, name: "Rahul Mehra", email: "rahul@therapist.com", status: "suspended", license: "LIC555", rating: 4.2 },
    ]);

    const [modal, setModal] = useState({ open: false, therapist: null });

    const approve = (id) => {
        setTherapists(prev => prev.map(t => t.id === id ? { ...t, status: "approved" } : t));
    };

    const reject = (id) => {
        setTherapists(prev => prev.map(t => t.id === id ? { ...t, status: "rejected" } : t));
    };

    const suspend = (id) => {
        setTherapists(prev => prev.map(t => t.id === id ? { ...t, status: "suspended" } : t));
    };

    const columns = [
        { key: "id", title: "#" },
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "license", title: "License" },
        { key: "status", title: "Statue", render: (r) => <span className={`capitalize ${r.status === 'approved' ? 'text-green-600' : r.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>{r.status}</span> },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar title="Manage Therapists" />
                <div className="p-6">
                    <div className="mb-4 flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Therapist Applications</h2>
                        <div className='space-x-2'>
                            <button onClick={() => setTherapists(t => t.map(x => ({ ...x, status: x.status === "pending" ? "approved" : x.status })))}
                                className="px-3 py-1 bg-green-600 text-white rounded">Bulk Approve pending</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <Table
                            columns={columns}
                            data={therapists}
                            actions={(row) => (
                                <div className="flex gap-2 justify-end">
                                    <button onClick={() => setModal({ open: true, therapist: row })} className="px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded">View</button>
                                    {row.status !== "approved" && <button onClick={() => approve(row.id)} className="px-2 py-1 text-sm bg-green-50 text-green-600 rounded">Approve</button>}
                                    {row.status !== "rejected" && <button onClick={() => reject(row.id)} className="px-2 py-1 text-sm bg-red-50 text-red-600 rounded">Reject</button>}
                                    {row.status !== "suspended" && <button onClick={() => suspend(row.id)} className="px-2 py-1 text-sm bg-yellow-50 text-yellow-600 rounded">Suspend</button>}
                                </div>
                            )}
                        />
                    </div>

                </div>
            </div>

            <Modal open={modal.open} title="Therapist Details" onClose={() => setModal({ open: false, therapist: null })}>
                {modal.therapist ? (
                    <div>
                        <p className="font-medium">{modal.therapist.name}</p>
                        <p className="text-sm text-gray-600">{modal.therapist.email}</p>
                        <p className="mt-2"><strong>License:</strong> {modal.therapist.license}</p>
                        <p className="mt-2"><strong>Rating:</strong> {modal.therapist.rating}</p>
                        <div className="mt-4 flex gap-2">
                            <button onClick={() => { approve(modal.therapist.id); setModal({ open: false, therapist: null }) }} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                            <button onClick={() => { reject(modal.therapist.id); setModal({ open: false, therapist: null }) }} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
                        </div>
                    </div>
                ) : null}
            </Modal>
        </div>
    )
}

export default ManageTherapists
