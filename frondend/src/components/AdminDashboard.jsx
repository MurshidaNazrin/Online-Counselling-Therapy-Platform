import React from 'react';
import Navbar from './subcomponents/AdminNavbar';
import Sidebar from "./subcomponents/AdminSidebar";
import Card from "./ui/card";
import { Users, Calendar, FileText, DollarSign } from "lucide-react";
import { Link } from 'react-router-dom';
// import {link} from "react-router-dom";

function AdminDashboard() {

  const admins = [
    { id: 1, name: "Asha Patel", email: "asha@platform.com", role: "Moderator" },
  ];

  const therapists = [
    { id: 1, name: "Dr. John Doe", email: "john@therapist.com", status: "pending", license: "LIC123", rating: 4.6 },
    { id: 2, name: "Sara Khan", email: "sara@therapist.com", status: "approved", license: "LIC987", rating: 4.9 },
    { id: 3, name: "Rahul Mehra", email: "rahul@therapist.com", status: "suspended", license: "LIC555", rating: 4.2 },
  ];

  const reports = [
    { id: 1, type: "user_report", reporter: "Emily", target: "Rahul Mehra", reason: "Inappropriate behavior", status: "open" },
    { id: 2, type: "session_report", reporter: "Arjun", target: "Session 102", reason: "Dropped call", status: "resolved" },
  ];

  const payments = [
    { id: 1, therapist: "Sara Khan", amount: 120, date: "2025-10-25", status: "paid" },
    { id: 2, therapist: "Dr. John Doe", amount: 80, date: "2025-10-27", status: "pending" },
  ];

  const sessions = [
    { id: 101, client: "Emily", therapist: "Sara Khan", date: "2025-10-29 10:00", type: "video", status: "completed" },
    { id: 102, client: "Arjun", therapist: "Dr. John Doe", date: "2025-10-30 13:00", type: "chat", status: "upcoming" },
    { id: 103, client: "Maya", therapist: "Rahul Mehra", date: "2025-10-31 09:00", type: "audio", status: "cancelled" },
  ];

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <Navbar title="Admin Dashboard" />

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className='flex items-center justify-between'>
              <div>
                <div className="text-sm text-gray-500">Therapists</div>
                <div className="text-2xl font-semibold">{therapists.length}</div>
              </div>

              <Users size={36} className='text-teal-500' />
            </Card>

            <Card className='flex items-center justify-between'>
              <div>
                <div className="text-sm text-gray-500">Sessions</div>
                <div className="text-2xl font-semibold">{sessions.length}</div>
              </div>

              <Calendar size={36} className='text-green-500' />
            </Card>

            <Card className='flex items-center justify-between'>
              <div>
                <div className="text-sm text-gray-500">Open Reports</div>
                <div className="text-2xl font-semibold">{reports.filter(r => r.status === "open").length}</div>
              </div>

              <FileText size={36} className='text-yellow-500' />
            </Card>

            <Card className='flex items-center justify-between'>
              <div>
                <div className="text-sm text-gray-500">Pending Payouts</div>
                <div className="text-2xl font-semibold">{payments.filter(p => p.status === "pending").length}</div>
              </div>

              <DollarSign size={36} className='text-red-500' />
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold mb-3">Recent Sessions</h3>
              <ul className="space-y-2 text-sm">
                {sessions.slice(0, 5).map(s => (
                  <li key={s.id} className="flex justify-between">
                    <div>
                      <div className="font-medium">{s.client} — {s.therapist}</div>
                      <div className="text-xs text-gray-500">{s.date} • {s.type}</div>
                    </div>
                    <div className={`text-sm ${s.status === 'completed' ? 'text-green-600' : s.status === 'upcoming' ? 'text-blue-600' : 'text-red-600'}`}>{s.status}</div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-3">Recent Reports</h3>
              <ul className="space-y-2 text-sm">
                {reports.slice(0, 5).map(r => (
                  <li key={r.id} className="flex justify-between">
                    <div>
                      <div className="font-medium">{r.reporter} → {r.target}</div>
                      <div className="text-xs text-gray-500">{r.reason}</div>
                    </div>
                    <div className={`text-sm ${r.status === 'open' ? 'text-yellow-600' : 'text-green-600'}`}>{r.status}</div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="flex gap-3">
            <Link to="/therapists" className='px-4 py-2 bg-blue-600 text-white rounded'>Manage Therapists</Link>
            <Link to="/reports" className="px-4 py-2 bg-yellow-600 text-white rounded">View Reports</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
