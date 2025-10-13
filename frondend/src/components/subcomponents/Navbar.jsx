import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {useNavigate} from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className=' absolute top-0 bg-white shadow-lg w-full z-50'>
            <div className='flex items-center justify-between px-6 py-2 md:px-10'>
                {/* Logo */}
                <div className='flex items-center space-x-2'>
                    <img src="logo1 - Copy.png" alt="" className='h-20 w-auto' />
                </div>

                {/* Desktop Menu */}

                <ul className='hidden md:flex space-x-8 text-indigo-900 font-medium'>
                    <li className='hover:text-indigo-600 cursor-pointer'>Home</li>
                    <li className='hover:text-indigo-600 cursor-pointer'>How it Works</li>
                    <li className='hover:text-indigo-600 cursor-pointer'>Therapists</li>
                    {/* <li className='hover:text-indigo-600 cursor-pointer'>Self Assesment</li> */}
                    <li className='hover:text-indigo-600 cursor-pointer'>Blog</li>
                    <li className='hover:text-indigo-600 cursor-pointer'>Help</li>
                </ul>


                {/* Desktop Buttons */}
                <div className='hidden md:flex space-x-4'>
                    {/* self assessmet refer from TALK TO ANGEL website */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-500 hover:text-white hover:shadow-lg hover:shadow-teal-300/50 transition duration-300">
                        {/* Analytics / Assessment Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6m4 6V7m4 10v-3m-9 3V5m12 14H4" />
                        </svg>Self Assessment</button>
                    <button
                        className='px-4 py-2 border border-teal-500 text-teal-600 rounded-lg hover:bg-teal-400 hover:text-white transition duration-300'
                        onClick={()=>{navigate('/Login')}}>Login</button>

                    <button 
                          className='px-4  py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-600 transition-duration-300'
                          onClick={()=>{navigate('/Signup')}}>  
                          Signup</button>

                </div>

                {/* Mobile menu button */}
                <div className='md:hidden flex items-center'>
                    <button onClick={() => setIsOpen(!isOpen)}
                        className='text-gray-700 hover:text-blue-600'>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>



            {/* MobileDropdown Menu */}

            {isOpen && (
                <div className='md:hidden bg-white shadow-md border-t border-gray-200'>
                    <ul className='flex flex-col space-y-4 px-6 py-4 text-indigo-900 font-medium'>
                        <li className='hover:text-indigo-600 cursor-pointer'>Home</li>
                        <li className='hover:text-indigo-600 cursor-pointer'>How it Works</li>
                        <li className='hover:text-indigo-600 cursor-pointer'>Therapists</li>
                        <li className='hover:text-indigo-600 cursor-pointer'>Blog</li>
                        <li className='hover:text-indigo-600 cursor-pointer'>Help</li>
                    </ul>
                    <div className='flex flex-col space-y-3 px-6 pb-4'>
                        <button
                            onClick={() => { navigate('/Login'); setIsOpen(false); }}
                            className='px-4 py-2 border border-teal-500 text-teal-600 rounded-lg hover:bg-teal-400 hover:text-white transition duration-300'
                        >Login</button>

                        <button 
                           onClick={()=>{navigate('/Signup'); setIsOpen(false);}}
                           className='px-4  py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-600 transition duration-300'>
                            Signup</button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
