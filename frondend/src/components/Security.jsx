import React, { useState } from 'react';
import Sidebar from "../components/subcomponents/SprAdmnSidebar";
import Navbar from '../components/subcomponents/SprAdmnNavbar';

function Security() {
    const [settings, setSettings] = useState({
        enforce2FA: true,
        passwordMinLength: 8,
        dataEncryption: true,
    });

    const handleToggle = (field) => {
        setSettings({ ...settings, [field]: !settings[field] });
    };
    return (
       <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Security & Compliance" />
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-6">Security Configuration</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Enforce 2FA for all Admins</span>
              <input
                type="checkbox"
                checked={settings.enforce2FA}
                onChange={() => handleToggle("enforce2FA")}
                className="w-5 h-5 accent-blue-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Minimum Password Length</label>
              <input
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => setSettings({ ...settings, passwordMinLength: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Data Encryption Enabled</span>
              <input
                type="checkbox"
                checked={settings.dataEncryption}
                onChange={() => handleToggle("dataEncryption")}
                className="w-5 h-5 accent-blue-600"
              />
            </div>
          </div>

          <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Save Security Settings
          </button>
        </div>
      </div>
    </div>
  );
    
}

export default Security
