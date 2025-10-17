import React from 'react'
import { motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom';

function Herosection() {
  const navigate = useNavigate();
  return (
    <section className='relative w-full h-screen bg-gradient-to-l from-sky-400 via-sky-300 to-cyan-200 flex flex-col-reverse md:flex-row items-center justify-center overflow-hidden px-6 md:px-16'>
      {/* image section */}
      <motion.div className='md:w-1/2 flex justify-center mt-0 md:mt-0'
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}>

        <motion.img src="Heroimg.png" alt="herosection illustration"
          className='w-full max-w-md md:max-w-xl drop-shadow-2xl'
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>

      {/* headline section */}

      <motion.div className='md:w-1/2 flex flex-col justify-center items-center md:items-center text-center md:text-left space-y-6 z-10'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <span className='text-3xl md:text-4xl text-white font-extrabold leading-tight drop-shadow-md mb-1.5'>Find Your inner calm,</span>
        <span className='text-3xl md:text-4xl text-white font-extrabold leading-tight drop-shadow-md mb-1'> Connect with Compassionate care</span>
        <p className='text-sm md:text-sm text-white/90 font-semibold max-w-lg text-center md:text-center'>
          MindLink offers accessible personalized Online Therapy for a healthier, happier You!</p>

        <div className="mt-2 flex space-x-4">
          <button className="px-6 py-3 bg-white text-sky-600 font-semibold rounded-full shadow-lg hover:bg-sky-50 hover:scale-105 focus:bg-sky-50 focus:scale-105 active:scale-95 transition-transform duration-300"
         onClick={()=>{navigate('/Login')}}>
            Get Started
          </button>
          <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full shadow-lg hover:bg-white hover:text-sky-600 transition-all duration-300">
            Learn More
          </button>
        </div>
        <p className='text-white font-semibold text-md flex-col md:flex-row items-center justify-center gap-2'>
          <span>Are You a Therapist?</span>
          <button className='px-5 py-2 bg-transparent hover:border-2 hover:border-white rounded-full semibold hover:bg-white hover:text-sky-600 transition-all duration-300 shadow-md focus:bg-white focus:text-sky-600 active:scale-95'
          onClick={()=>{navigate('/therapist-login')}}>Join with Us</button>
        </p>
      </motion.div>


      {/* Decorative blur circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-300/30 rounded-full blur-3xl"></div>



    </section>

  )
}

export default Herosection
