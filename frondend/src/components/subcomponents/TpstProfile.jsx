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

  const [certificateFile, setCertificateFile] = useState(null);
  const [message, setMessage] = useState("");
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
    } catch (err) {
      console.error("Update error:", err);
      setMessage(err.response?.data?.message || "Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  // Delete Account

  return (
    <div className='min-h-screen bg-gradient-to-b from-teal-50 to-white py-10 px-4 sm:px-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-6 sm:p-10'>
        <h2 className='text-3xl font-extrabold text-center text-teal-700 mb-6'>Proffessional Details</h2>

        {message && (
          <p className="text-center text-teal-600 font-medium mb-4 animate-fade">{message}</p>
        )}
        <form action=""
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-6'>

          {/* profile image */}
          <div>
            <label className='block font-semibold mb-1 text-gray-700'>Profile Image</label>
            <input type="file"
              accept='image/*'
              onChange={handleImageChange}
              className='w-full border p-2 rounded-lg' />


            {profile.profileImage && (
              <img
                src={
                  typeof profile.profileImage === "string"
                    ? profile.profileImage
                    : URL.createObjectURL(profile.profileImage)
                }
                alt="Profile Preview"
                className="w-24 h-24 rounded-full mt-3 object-cover"
              />
            )}
          </div>



          {/* name */}
          <div>
            <label className="block font-semibold mb-1 text-gray-700">Full Name</label>
            <input type="text" name='name' value={profile.name || ""}
              onChange={handleChange}
              className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-teal-400'
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
            <label className="block font-semibold mb-1 text-gray-700"> Certificate (Upload File or Enter URL) </label>
            <input
              type="file"
              accept='.pdf,image/*'
              name="certificate"
              onChange={handleCertificateFile}
              className="w-full border p-2 rounded-lg"
            // placeholder="e.g., https://certificate-link.com"
            />
            <input
              type="text"
              name="certificate"
              value={profile.certificate || ""}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
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
              className='w-full border p-2 rounded-lg h-32'
              placeholder='Write about Yourself, Your approach, and Your experinec...'></textarea>
          </div>

          <div className="md:col-span-2 flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <button
              type='submit'
              disabled={loading}
              className='flex-1 bg-teal-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-teal-700 transition duration-500'>
              {loading ? "Updating" : "Save Profile"}</button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default TpstProfile
