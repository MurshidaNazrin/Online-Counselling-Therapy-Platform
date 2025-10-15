import React from 'react'
import Navbar from './subcomponents/Navbar'
import Herosection from './subcomponents/Herosection'
import Howitworks from './subcomponents/Howitworks';
import Courses from './subcomponents/Courses';
import Reviews from './subcomponents/Reviews';
import Footer from './subcomponents/Footer';
import OTPverification from './OTPverification';


function Index() {
  return (
    <div>
      < Navbar />
      <Herosection />
      <Courses />
      <Howitworks />
      <Reviews />
      <Footer />
      <OTPverification />
    </div>
  )
}

export default Index
