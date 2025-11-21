import React, {useState} from 'react';
import NotificationDropdown from './DashboardCard';

function Navbar() {
    const [open, setOpen] = useState(false);
  return (
   <nav className='flex justify-between items-center px-6 py-3 bg-white shadow-md fixed w-full z-50'>
    <div className='text-2xl font-bold'>CounselMe</div>
   </nav>
  )
}

export default Navbar
