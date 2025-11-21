import React from 'react'

function Sidebar({ icon, label, danger }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-teal-100 transition
        ${danger ? "text-red-500 font-semibold hover:bg-red-50" : "text-teal-700"}`}
    >
      {icon} <span>{label}</span>
    </div>
  );
}

export default Sidebar
