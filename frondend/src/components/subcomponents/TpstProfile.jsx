import React, { useEffect, useState } from 'react';
import axios from "axios";
import Select from "react-select";
import {CheckCircle, AlertCircle} from "lucide-react";

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

  const [certificateFile, setCertificateFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false);

  const specializationOptions = [
    { value: "Anxiety", label: "Anxiety" },
    { value: "Depression", label: "Depression" },
    { value: "Trauma", label: "Trauma" },
    { value: "Child Therapy", label: "Child Therapy" },
    { value: "Couples Counseling", label: "Couples Counseling" },
    { value: "CBT", label: "CBT" },
    { value: "Grief Counseling", label: "Grief Counseling" },
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
        setIsError(true);
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, profileImage: file });
  };

  // certificate
  const handleCertificateFile = (e) => {
    setCertificateFile(e.target.files[0]);
  }


  // update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // append all fields
      formData.append("profession", profile.profession);
      formData.append("qualifications", profile.qualifications);
      formData.append("experience", profile.experience);
      // formData.append("certificate", profile.certificate);
      formData.append("bio", profile.bio);
      formData.append("specialization", JSON.stringify(profile.specialization));

      if (profile.profileImage instanceof File) {
        formData.append("profileImage", profile.profileImage);
      }

      if (certificateFile) {
        formData.append("certificate", certificateFile);
      } else if (profile.certificate && typeof profile.certificate === 'string') {
        formData.append("certificate", profile.certificate);
      }

      // send multipart/form-data request



      // const updatedProfile = {
      //   ...profile,
      //   experience: Number(profile.experience),
      // };
      const res = await axios.put('http://localhost:3000/api/therapist-createprofile', formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message || "Profile updated successfully");
      setIsError(false);
    } catch (err) {
      console.error("Update error:", err);
      setMessage(err.response?.data?.message || "Profile update failed");
      setIsError(true)
    } finally {
      setLoading(false);
      setTimeout(()=>setMessage(""),4000);
    }
  };

  // Delete Account

  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-100 via-white to-blue-100 py-10 px-4 sm:px-8'>
      <div className='absolute inset-0 backdrop-blur-lg bg-white/30 z-0'></div>
      {/* message box */}
     
        {message && (
          <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 backdrop-blur-md border ${
          isError ? "bg-red-100/80 border-red-400 text-red-700"
                  : "bg-green-100/80 border-green-400 text-green-700"
          }animate-fadeIn`}>
            {isError ? <AlertCircle /> : <CheckCircle />}
          <p className="font-medium">{message}</p>
          </div>
        )}

      <div className='max-w-4xl mx-auto backdrop-blur-md bg-white/70 shadow-xl border border-white/30 rounded-3xl p-6 sm:p-10 transition-all hover:shadow-2xl'>
        <h2 className='text-4xl font-extrabold text-center text-teal-700 mb-8 drop-shadow-sm'>Proffessional Details</h2>

        <form action=""
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-8'>

          {/* profile image */}
          <div>
            <label className='block font-semibold mb-2 text-gray-700'>Profile Image</label>
            <div className='border-2 border-dashed border-teal-300 rounded-xl p-4 text-center bg-teal-50/40 hover:bg-teal-100 transition'>
            <input type="file"
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
              id='profileImageInput' />
              <label htmlFor="profileImageInput" className='cursor-pointer text-sm text-teal-700 font-medium'>
                {profile.profileImage ? "Change Image" : "Upload Image"}
              </label>


            {profile.profileImage && (
              <img
                src={
                  typeof profile.profileImage === "string"
                    ? profile.profileImage
                    : URL.createObjectURL(profile.profileImage)
                }
                alt="Profile Preview"
                className="w-24 h-24 rounded-full mt-3 object-cover shadow-md"
              />
            )}
           </div> 
          </div>



          {/* name */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Full Name</label>
            <input type="text" name='name' value={profile.name || ""}
              onChange={handleChange}
              className='w-full border p-3 rounded-lg'
              placeholder='Your full name'
            />
          </div>



          {/* Email */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Email</label>
            <input type="email" name='email' value={profile.email || ""}
              disabled
              className='w-full border p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed'
              placeholder='Your full name'
            />
          </div>



          {/* profession */}
          <div>
            <label htmlFor="" className='block font-semibold mb-1 text-gray-700'>Profession</label>
            <select name="profession"
              value={profile.profession || ""}
              onChange={handleChange}
              className='w-full border p-3 rounded-lg ' >
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
              className='w-full border p-3 rounded-lg'
              min="0"
            />
          </div>



          {/* Qualification */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Qualification</label>
            <input type="text" name='qualifications' value={profile.qualifications || ""}
              onChange={handleChange}
              className='w-full border p-3 rounded-lg'
              placeholder='e.g.,M.Sc Psychology'
            />
          </div>



          {/* Certificate */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700"> Certificate (Upload File or Enter URL) </label>
            <input
              type="file"
              accept='.pdf,image/*'
              name="certificate"
              onChange={handleCertificateFile}
              className="w-full border p-3 rounded-lg"
            // placeholder="e.g., https://certificate-link.com"
            />
            <input
              type="text"
              name="certificate"
              value={profile.certificate || ""}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              placeholder="Or paste certificate URL"
            />
          </div>



          {/* specialization */}
          <div className='md:col-span-2 mb-4'>
            <label className="block font-semibold mb-1 text-gray-700">Specialization</label>
            <Select
              isMulti
              name="specialization"
              options={specializationOptions}
              value={specializationOptions.filter((opt) =>
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
              onChange={handleChange}
              className='w-full border p-3 rounded-lg h-32'
              placeholder='Write about Yourself, Your approach, and Your experinec...'></textarea>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <button
              type='submit'
              disabled={loading}
              className='flex-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold px-5 py-3 rounded-lg hover:scale-105 transition-transform duration-300'>
              {loading ? "Updating" : "Save Profile"}</button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default TpstProfile
