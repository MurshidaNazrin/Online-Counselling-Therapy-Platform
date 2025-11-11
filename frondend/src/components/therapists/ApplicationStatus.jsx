import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function ApplicationStatus() {
  const [application, setApplication] = useState({
    status: "under_review",
    submittedAt: "2025-11-05T10:30:00z",
    reviewedAt: null,
    adminNotes: "",
  });


  // In real app, fetch from backend:
  useEffect(() => {
    // Example API call
    // fetch('/api/therapist/application-status')
    //   .then(res => res.json())
    //   .then(data => setApplication(data))
  }, []);

  const renderStatusIcon = () => {
    const baseClasses = "p-2 rounded-full flex items-center justify-center shadow-inner";


    switch (application.status) {
      case "approved":
        return (
          <div className={`${baseClasses} bg-green-100 animate-bounceOnce`}>
            <CheckCircle className="text-green-600" size={26} />
          </div>
        );
      case "rejected":
        return (
          <div className={`${baseClasses} bg-red-100 animate-shake`}>
            <XCircle className="text-red-600" size={26} />
          </div>
        );
      case "under_review":
        return (
          <div className={`${baseClasses} bg-yellow-100 animate-pulseSlow`}>
            <AlertCircle className="text-yellow-600" size={26} />
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} bg-blue-100 animate-spinSlow`}>
            <Clock className="text-blue-600" size={26} />
          </div>
        );
    }
  };

  const formattedDate = new Date(application.submittedAt).toLocaleDateString();

  return (
         <div className="bg-gradient-to-br from-white via-gray-50 to-teal-50 rounded-xl shadow-md border border-gray-200 p-5 transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b pb-3 mb-3">
        {renderStatusIcon()}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Application Status</h2>
          <p className="text-xs text-gray-500">Keep track of your progress</p>
        </div>
      </div>

      {/* Status Info */}
      <div className="text-sm space-y-2 text-gray-700">
        <p className="flex justify-between">
          <span className="font-medium text-gray-600">Current Status:</span>
          <span
            className={`capitalize font-semibold px-2 py-0.5 rounded-full ${
              application.status === "approved"
                ? "bg-green-100 text-green-700"
                : application.status === "rejected"
                ? "bg-red-100 text-red-700"
                : application.status === "under_review"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {application.status.replace("_", " ")}
          </span>
        </p>

        <p className="flex justify-between text-gray-600">
          <span className="font-medium">Submitted On:</span>
          <span>{formattedDate}</span>
        </p>

        {application.adminNotes && (
          <div className="bg-gray-50 border rounded-lg p-3 text-sm italic text-gray-600">
            “{application.adminNotes}”
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t flex flex-col items-center space-y-3">
        {application.status === "rejected" ? (
          <>
            <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition shadow-md">
              Resubmit Application
            </button>
            <Link
              to="/support"
              className="flex items-center text-teal-700 hover:underline text-sm"
            >
              <Mail size={16} className="mr-1" /> Contact Support
            </Link>
          </>
        ) : (
          <Link
            to="/support"
            className="flex items-center text-teal-700 hover:underline text-sm"
          >
            <Mail size={16} className="mr-1" /> Contact Support
          </Link>
        )}
      </div>

      {/* Subtext */}
      <p className="text-xs text-gray-400 text-center mt-3">
        We’ll notify you once your application is reviewed.
      </p>
    </div>
  );

}

export default ApplicationStatus