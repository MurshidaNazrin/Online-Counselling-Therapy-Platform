import React, { useEffect, useState } from 'react';
import axios from "axios";
import Select from "react-select";

function TpstProfile() {
  const [profile, setProfile] = useState({
    profileImage: "",
    profession: "",
    qualifications: "",
    specialization: [],
    experience: 0,
    certificate: "",
    bio: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const specializationOptions = [
    {value: "Anxiety",label: "Anxiety"},
    {value: "Depression",label: "Depression"},
    {value: "Trauma",label: "Trauma"},
    {value: "Child Therapy",label: "Child Therapy"},
    {value: "Couples Counseling",label: "Couples Counseling"},
    {value: "CBT",label: "CBT"},
    {value: "Grief Counseling",label: "Grief Counseling"},
  ];

  //  ============fetch therapist profile============
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get('http://localhost:3000/api/therapist-profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.therapist);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMessage("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  //  ===============Handle Input Changes ================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  //===============multiple select================
  const handleSpecializationChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((opt) => opt.value);
    setProfile({ ...profile, specialization: selectedValues });
  };

  // profile image


  // update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const updatedProfile = {
        ...profile,
        experience: Number(profile.experience),
      };
      const res = await axios.put('http://localhost:3000/api/therapist-createprofile', updatedProfile,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "Profile updated successfully");
    } catch (err) {
      console.error("Update error:".err);
      setMessage(err.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete Account

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4 sm:px-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-6 sm:p-10'>
        <h2 className='text-3xl font-extrabold text-center text-blue-700 mb-6'>Proffessional Details</h2>

        {message && (
          <p className="text-center text-blue-600 font-medium mb-4 animate-fade">{message}</p>
        )}
        <form action=""
          onSubmit={handleSubmit}
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
              disabled
              className='w-full border p-2 rounded-lg bg-gray-100 cursor-not-allowed'
              placeholder='Your full name'
            />
          </div>

          {/* profession */}
          <div>
            <label htmlFor="" className='block font-semibold mb-1 text-gray-700'>Profession</label>
            <select name="profession"
             value={profile.profession || ""}
             onChange={handleChange}
             className='w-full border p-2 rounded-lg ' >
              <option value="">Select Profession</option>
              <option value="Psychiatrist">Psychiatrist</option>
              <option value="Psychologist">Psychologist</option>
              <option value="Licensed Professional Counsellor">Licensed Professional Counsellor</option>
              <option value="Licensed Social Worker">Licensed Social Worker</option>
              <option value="Licensed Marriage and Family Therapist">Licensed Marriage and Family Therapist</option>
              <option value="Psychiatric Nurse">Psychiatric Nurse</option>
             </select>
          </div>

          {/* Experience */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">Experience (Years)</label>
            <input type="number" name='experience' value={profile.experience || ""}
              onChange={handleChange}
              className='w-full border p-2 rounded-lg'
              min="0"
            />
       </div>  

       {/* Qualification */}
       <div>
          <label className="block font-semibold mb-1 text-gray-700">Qualification</label>
            <input type="text" name='qualifications' value={profile.qualifications || ""}
              onChange={handleChange}
              className='w-full border p-2 rounded-lg'
              placeholder='e.g.,M.Sc Psychology'
            />
       </div>  

        {/* Certificate */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700"> Certificate (URL) </label>
            <input
              type="text"
              name="certificate"
              value={profile.certificate || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              placeholder="e.g., https://certificate-link.com"
            />
          </div>

          {/* specialization */}
          <div className='md:col-span-2 mb-4'>
            <label className="block font-semibold mb-1 text-gray-700">Specialization</label>
            <Select
                isMulti
                name="specialization" 
                options={specializationOptions}
                value={specializationOptions.filter((opt)=>
                    profile.specialization.includes(opt.value)
                  )}
                onChange={handleSpecializationChange}
                className='basic-multi-select'
                classNamePrefix="select"
                placeholder="Select Your specialization.."
                />
          </div>

          {/* Bio */}
          <div className='md:col-span-2'>
            <label className='block font-semibold mb-1 text-gray-700'>Bio</label>
            <textarea name="bio" 
               value={profile.bio || ""}
               className='w-full border p-2 rounded-lg h-32'
               placeholder='Write about Yourself, Your approach, and Your experinec...'></textarea>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <button
                type='submit'
                disabled={loading}
                className='flex-1 bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-500'>
                  {loading ? "Updating" : "Save Profile"}</button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default TpstProfile
