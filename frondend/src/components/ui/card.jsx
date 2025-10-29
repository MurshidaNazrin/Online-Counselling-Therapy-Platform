import React from 'react'

function card({ children, className = ""}) {
  return (
    <div
    className={`bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  )
}

export default card
