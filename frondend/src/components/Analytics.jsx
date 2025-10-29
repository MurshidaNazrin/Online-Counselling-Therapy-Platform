import React from 'react';
import Sidebar from "../components/subcomponents/SprAdmnSidebar";
import Navbar from '../components/subcomponents/SprAdmnNavbar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

function Analytics() {
    const revenueData = [
        { month: "Jan", revenue: 4200 },
        { month: "Feb", revenue: 5200 },
        { month: "Mar", revenue: 6100 },
        { month: "Apr", revenue: 8000 },
        { month: "May", revenue: 7500 },
        { month: "Jun", revenue: 8900 },
    ];

    const userData = [
        { month: "Jan", users: 120 },
        { month: "Feb", users: 180 },
        { month: "Mar", users: 250 },
        { month: "Apr", users: 320 },
        { month: "May", users: 400 },
        { month: "Jun", users: 460 },
    ];
    return (
        <div className='flex h-screen bg-gray-100'>
            <Sidebar />
            <div className="flex-1 flex flex-col md:ml-64">
                <Navbar title="Analytics Overview" />
                <div className="p-6 grid md:grid-cols-2 gap-8">
                    {/* Revenue Chart */}
                    <div className="bg-white rounded-xl shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill='#3BB2F6' radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* user Growth */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className='text-lg font-semibold mb-4'>User Growth</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={userData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analytics
