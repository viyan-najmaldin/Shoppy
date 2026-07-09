   import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";

const AccountProfile = () => {

    const fileInputRef = useRef(null);
     const [profileImage, setProfileImage] = useState(
    "https://placehold.co/150x150"
  );
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save profile information here
    console.log("Profile saved!");
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-300 p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-8">Profile Information</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-slate-300"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:scale-105 transition"
            >
              <FaCamera />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-slate-500 text-sm">
              Click the camera icon to change your profile photo.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label for='fname' className="block mb-2 font-medium">First Name</label>
            <input
              id="fname"
              type="text"
              defaultValue="John"
              className="w-full border border-slate-300 outline-none focus:ring-1 focus:ring-cyan-500 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label for='lname' className="block mb-2 font-medium">Last Name</label>
            <input
              id="lname"
              type="text"
              defaultValue="Doe"
              className="w-full border border-slate-300 outline-none focus:ring-1 focus:ring-cyan-500 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label for="email" className="block mb-2 font-medium">Email</label>
            <input
              id="email"
              type="email"
              defaultValue="john@example.com"
              className="w-full border border-slate-300 outline-none focus:ring-1 focus:ring-cyan-500 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label for='phone' className="block mb-2 outline-none focus:ring- focus:ring-cyan-500 font-medium">Phone</label>
            <input
              id="phone"
              type="text"
              defaultValue="+964 750 123 4567"
              className="w-full border border-slate-300 rounded-lg outline-none focus:ring-1 focus:ring-cyan-500 px-4 py-3"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-[#003049] text-white rounded-lg hover:bg-gradient-to-r from-cyan-700 to-cyan-500 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  
  )
}

export default AccountProfile
