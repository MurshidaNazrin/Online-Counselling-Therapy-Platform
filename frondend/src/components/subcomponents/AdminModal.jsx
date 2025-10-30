import React from 'react'

function AdminModal({ open, title, children, onClose }) {
    if (!open) return null;
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
            <div className="bg-white rounded-lg w-full max-w-2xl p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className='text-gray-500'>Close</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default AdminModal
