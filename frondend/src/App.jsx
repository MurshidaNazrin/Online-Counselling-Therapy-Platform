import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Index from "./components/Index";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OTPverification from './components/OTPverification';

function App() {


  return (
    <>
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Index />} />
         <Route path='/login' element={<Login />} />
         <Route path='/signup' element={<Signup />} />
         <Route path='/verify-otp' element={<OTPverification />} />
       </Routes>
    </BrowserRouter>
      {/* <Signup /> */}
      
    </>
  )
}

export default App
