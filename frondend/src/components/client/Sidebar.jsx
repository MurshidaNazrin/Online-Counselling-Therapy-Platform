import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar({ icon, label, path, danger, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
       onClick();
       return;
    }

    if(path) {
      navigate(path)
    }
}

  return (
    <button
      onClick={handleClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-left font-medium hover:bg-teal-100 transition
        ${danger ? "text-red-500 font-semibold hover:bg-red-50" : "text-teal-700"}`}
    >
      {icon} <span>{label}</span>
    </button>
  );
}

export default Sidebar
