import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function ApplicationStatus() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);


  // fetch from backend:
  useEffect(() => {
    async function fetchApplication() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/therapist-status", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        const data = await res.json();
        const statusMap = {
          pending: "pending",
          approved: "approved",
          rejected: "rejected",
        };

        setApplication({
          status: statusMap[data.status],
          submittedAt: data.submittedAt,
          reviewedAt: data.reviewedAt,
          adminNotes: data.adminNotes || "",
        });
      } catch (err) {
        console.error("Failed to fetch application status", err);
      } finally {
        setLoading(false);
      }
    }
    fetchApplication();
  }, []);

  if(loading || !application){
    return(
      <div className="p-5 text-center text-gray-500">
        Loading application status...
      </div>
    );
  }



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
      default:
        return (
          <div className={`${baseClasses} bg-yellow-100 animate-spinSlow`}>
            <Clock className="text-yellow" size={26} />
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
            className={`capitalize font-semibold px-2 py-0.5 rounded-full ${application.status === "approved"
                ? "bg-green-100 text-green-700"
                : application.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"

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