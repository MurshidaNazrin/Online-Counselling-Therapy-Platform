import React, { useState } from 'react';
import Sidebar from "../components/subcomponents/SprAdmnSidebar";
import Navbar from '../components/subcomponents/SprAdmnNavbar';

function PlatformSettings() {
    const [settings, setSettings] = useState({
    sessionDuration: 45,
    pricePerSession: 50,
    cancellationPolicy: "24 hours before session",
    emailService: "SendGrid",
    paymentGateway: "Stripe",
  });

   const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Platform settings updated successfully!");
  };

  return (
    <div className='flex h-screen bg-gray-50'>
        <Sidebar />
      <div className='flex-1 flex flex-col md:ml-64'>
        <Navbar title="Platform Settings" />
        <div className='p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl'>
            <h3 className='text-xl font-semibold mb-6'>Global Configuration</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
                 <div>
              <label className="block text-gray-700 font-medium mb-2">Session Duration (minutes)</label>
              <input
                type="number"
                name="sessionDuration"
                value={settings.sessionDuration}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

                        <div>
              <label className="block text-gray-700 font-medium mb-2">Price Per Session ($)</label>
              <input
                type="number"
                name="pricePerSession"
                value={settings.pricePerSession}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Cancellation Policy</label>
              <input
                type="text"
                name="cancellationPolicy"
                value={settings.cancellationPolicy}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

 <div>
              <label className="block text-gray-700 font-medium mb-2">Email Service</label>
              <select
                name="emailService"
                value={settings.emailService}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option>SendGrid</option>
                <option>Mailgun</option>
                <option>Amazon SES</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Payment Gateway</label>
              <select
                name="paymentGateway"
                value={settings.paymentGateway}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option>Stripe</option>
                <option>Razorpay</option>
                <option>PayPal</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save Settings
            </button>
            </form>
        </div>
    </div>  
    </div>
  )
}

export default PlatformSettings
