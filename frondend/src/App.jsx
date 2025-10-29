import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import Index from "./components/Index";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OTPverification from './components/OTPverification';

import TpstLogin from './components/TpstLogin';
import TpstSignup from './components/TpstSignup';
import TpstOTP from './components/TpstOTP';
import Tpstindex from './components/Tpstindex';

import PrivateRoute from './components/subcomponents/PrivateRoute';
import AdminLogin from './components/AdminLogin';
import SuperadminDashboard from './components/SuperadminDashboard';
import ManageAdmin from './components/ManageAdmin';
import Analytics from './components/Analytics';
import AdminDashboard from './components/AdminDashboard';



function App() {


  return (
    <>
      <BrowserRouter>
        <Toaster position='top-center' />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/verify-otp' element={<OTPverification />} />


          <Route path='/therapist-login' element={<TpstLogin />} />
          <Route path='/therapist-signup' element={<TpstSignup />} />
          <Route path='/therapist-otp' element={<TpstOTP />} />
          <Route path='/therapist-Home' element={<Tpstindex />} />

          {/* ======Admin Routes======== */}
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/superadmin-dashboard' element={<PrivateRoute allowedRole="superadmin"><SuperadminDashboard /></PrivateRoute> } />
          <Route path='/manage-admins' element={<PrivateRoute allowedRole="superadmin"><ManageAdmin /></PrivateRoute> } />
          <Route path='/analytics' element={<PrivateRoute allowedRole="superadmin"><Analytics /></PrivateRoute> } />
          <Route path='/admin-dashboard' element={<PrivateRoute allowedRole="admin"><AdminDashboard /></PrivateRoute> } />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
