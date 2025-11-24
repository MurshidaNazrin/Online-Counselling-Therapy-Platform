import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { HiMiniPencil } from "react-icons/hi2";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  // ================= LOAD PROFILE =================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserProfile(res.data.user);

        // set editable form
        setForm({
          name: res.data.user?.name || "",
          email: res.data.user?.email || "",
        });
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };

    loadProfile();
  }, []);

  // ================= SAVE UPDATE =================
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:3000/api/edit-profile",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Profile updated");

      setUserProfile(res.data.user);
      setEditMode(false);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // ================= CANCEL EDIT =================
  const handleCancel = () => {
    if (!userProfile) return;

    setForm({
      name: userProfile?.name || "",
      email: userProfile?.email || "",
    });

    setEditMode(false);
  };

  // ================= DELETE ACCOUNT =================
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:3000/api/delete-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Account deleted");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (!userProfile) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-6">
        <div className="flex-1">
          {/* NAME */}
          {editMode ? (
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
            />
          ) : (
            <h2 className="text-2xl font-bold">{userProfile?.name}</h2>
          )}

          {/* EMAIL */}
          {editMode ? (
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <p className="text-gray-600">{userProfile?.email}</p>
          )}

          {/* BUTTONS */}
          <div className="mt-4 flex gap-4">
            {!editMode ? (
              <>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  onClick={() => setEditMode(true)}
                >
                  <HiMiniPencil size={18} />
                  Edit
                </button>

                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={handleDelete}
                >
                  <MdDelete size={18} />
                  Delete Account
                </button>
              </>
            ) : (
              <>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  onClick={handleSave}
                >
                  <Check size={18} />
                  Save
                </button>

                <button
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  onClick={handleCancel}
                >
                  <X size={18} />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
