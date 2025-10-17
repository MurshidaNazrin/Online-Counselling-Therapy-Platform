import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Index from "./components/Index";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OTPverification from './components/OTPverification';
import TpstLogin from './components/TpstLogin';
import TpstSignup from './components/TpstSignup';
import TpstOTP from './components/TpstOTP';

function App() {


  return (
    <>
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Index />} />
         <Route path='/login' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/verify-otp' element={<OTPverification />} />
         <Route path='/therapist-login' element={<TpstLogin />}/>
         <Route path='/therapist-signup' element={<TpstSignup />} />
         <Route path='/therapist-otp' element={<TpstOTP />} />
       </Routes>
    </BrowserRouter>
      {/* <Signup /> */}
      
    </>
  )
}

export default App
