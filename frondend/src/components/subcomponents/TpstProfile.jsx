import React,{useEffect,useState} from 'react';
import axios from "axios";

function TpstProfile() {
   const [profile, setProfile] = useState({
    profileImage: "",
    profession: "",
    qualifications: "",
    specialization: [],
    experience:0,
    certificate: "",
    bio:""
   });
   const [message, setMessage] = useState("");
   const [loading,setLoading] = useState(false);

  //  ============fetch therapist profile============
  useEffect(()=>{
    const fetchProfile = async ()=>{
    try{
       const token = localStorage.getItem("token");
       const res = await axios.get('http://localhost:3000/api/therapist-profile',{
          headers: {Authorization: `Bearer ${token}`},
       });
       setProfile(res.data.therapist);
    }catch(err){
      console.error("Error fetching profile:",err);
      setMessage("Failed to load profile");
       }
    };
    fetchProfile();  
  }, []);

  //  ===============Handle Input Changes ================
  const handleChange = (e) => {
    const {name, value} = e.target;
    setProfile({...profile, [name]: value});
  };

  


  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4 sm:px-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-6 sm:p-10'>
         <h2 className='text-3xl font-extrabold text-center text-blue-700 mb-6'>Proffessional Details</h2>

         {message && (
          <p className="text-center text-blue-600 font-medium mb-4 animate-fade">{message}</p>
         )}
         <form action="" 
        //  onSubmit={handleSubmit}
         className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* profile image */}
          {/* name */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Full Name</label>
            <input type="text" name='name' value={profile.name || ""}
              onChange={handleChange} 
              className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400'
              placeholder='Your full name'
              /> 
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Email</label>
             <input type="email" name='email' value={profile.email || ""}
              onChange={handleChange} 
              disabled
              className='w-full border p-2 rounded-lg bg-gray-100 cursor-not-allowed'
              placeholder='Your full name'
              /> 
          </div>
         </form>
      </div>
     
    </div>
  )
}

export default TpstProfile
 