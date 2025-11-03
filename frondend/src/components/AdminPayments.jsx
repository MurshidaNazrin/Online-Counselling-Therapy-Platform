import React, { useState } from 'react';
import Navbar from './subcomponents/AdminNavbar';
import Sidebar from "./subcomponents/AdminSidebar";
import Table from "./subcomponents/AdminTable";

function AdminPayments() {
    const [list, setList] = useState([
        { id: 1, therapist: "Sara Khan", amount: 120, date: "2025-10-25", status: "paid" },
        { id: 2, therapist: "Dr. John Doe", amount: 80, date: "2025-10-27", status: "pending" },
    ]);

    const markPaid = (id) => setList(prev => prev.map(p => p.id === id ? { ...p, status: "paid" } : p));

    const columns = [
        { key: "id", title: "#" },
        { key: "therapist", title: "Therapist" },
        { key: "amount", title: "Amount" },
        { key: "date", title: "Date" },
        { key: "status", title: "Status" },
    ];
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar title="Payments" />
                <div className="p-6">
                    <div className="mb-4 flex justify-between">
                        <h2 className="text-lg font-semibold">Payouts & Transactions</h2>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <Table
                            columns={columns}
                            data={list}
                            actions={(row) => (
                                <div className="flex gap-2 justify-end">
                                    {row.status === "pending" && <button onClick={() => markPaid(row.id)} className="px-2 py-1 text-sm bg-green-50 text-green-600 rounded">Mark Paid</button>}
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPayments
