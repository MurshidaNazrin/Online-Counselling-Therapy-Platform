import React, { useState } from 'react';
import Navbar from './subcomponents/AdminNavbar';
import Sidebar from "./subcomponents/AdminSidebar";
import Card from './ui/card';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        sessionDuration: 45,
        cancellationPolicy: "24 hours",
        therapistCommission: 20,
        maintenanceMode: false
    });

    const handleChange = (e) => setSettings({ ...settings, [e.target.name]: e.target.value });
    const toggle = (name) => setSettings(s => ({ ...s, [name]: !s[name] }));
    return (
       <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Settings" />
        <div className="p-6">
          <Card className="max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">Platform Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Session Duration (minutes)</label>
                <input type="number" name="sessionDuration" value={settings.sessionDuration} onChange={handleChange} className="w-full p-2 border rounded mt-1" />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Cancellation Policy</label>
                <input type="text" name="cancellationPolicy" value={settings.cancellationPolicy} onChange={handleChange} className="w-full p-2 border rounded mt-1" />
              </div>

              <div>
                <label className="block text-sm text-gray-600">Therapist Commission (%)</label>
                <input type="number" name="therapistCommission" value={settings.therapistCommission} onChange={handleChange} className="w-full p-2 border rounded mt-1" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Maintenance Mode</span>
                <input type="checkbox" checked={settings.maintenanceMode} onChange={() => toggle("maintenanceMode")} className="w-5 h-5 accent-blue-600" />
              </div>

              <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Save Settings</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    )
}
