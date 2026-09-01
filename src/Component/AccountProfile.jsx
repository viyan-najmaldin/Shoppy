import { useRef, useState,  useEffect  } from "react";
import { FaCamera } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  FaHeart,
  FaCartShopping,
  FaStar,
  FaLocationDot,
} from "react-icons/fa6";


const AccountProfile = () => {

    const { currentUser, logout } = useAuth();
    const [userData, setUserData] = useState(null);

useEffect(() => {
  const getUserData = async () => {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setUserData(userSnap.data());
    }
  };

  getUserData();
}, [currentUser]);
    const navigate = useNavigate();
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

  const handleLogout = async () => {
  try {
    await logout();
    navigate("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};
  return (
    <>
    <button
            onClick={() => navigate(-1)}
            className="text-cyan-700 hover:text-cyan-900 m-5 mx-10"
          >
            ← Back 
          </button>
    <div className="sm:mx-10 mx-5 mb-10 bg-slate-50 rounded-2xl shadow min-h-100 border border-slate-300 p-6 lg:p-8 mb-8">
     <div className="flex justify-between">
          <div></div>
      <button
          onClick={handleLogout}
          className="font-semibold text-red-500 px-6 py-3 sm:text-sm text-xs -mr-5 rounded-lg hover:text-red-700 transition"
        >
          <span className="pb-2 pt-1 px-2 bg-red-300/50 rounded-3xl"><FaSignOutAlt className="inline"/></span> Logout 
         
      </button>
     </div>
  
      <form onSubmit={handleSubmit}>
        <div className="flex items-center sm:-mt-10 gap-6 mb-8">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="sm:w-28 sm:h-28  rounded-full object-cover border-2 border-slate-300"
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
            <h3 className="text-2xl font-semibold">{currentUser?.displayName}</h3>
            <p className="text-slate-500 text-sm">
              Click the camera icon to change your profile photo.
            </p>
          </div>
        </div>

 <div className="flex flex-col sm:flex-row w-full gap-5 justify-between">

   
     <div className="w-full  bg-white border border-slate-300 rounded-xl p-4 px-6  shadow-sm">
      <h2 className="text-2xl my-5 font-bold ">Profile Information</h2>
      <div className="flex">        
            <div className="grid h-50">
                <h1 className="text-slate-500 mr-5">Full Name: </h1>
                <h1 className="text-slate-500 mr-5">Email: </h1>
                <h1 className="text-slate-500 mr-5">Phone Number: </h1>
                <h1 className="text-slate-500 mr-5">Address: </h1>
               </div> 
               <div className="grid">
                <h1 className=" mr-5">{userData?.fullName || currentUser?.displayName}</h1> 
                <h1 className=" mr-5">{currentUser?.email}</h1> 
                <h1 className=" mr-5">{userData?.phone || "Not provided"}</h1> 
                <h1 className=" mr-5">{userData ? `${userData.street}, ${userData.city}, Iraq` : "Not provided"}</h1> 
           </div>
     </div>
     <Link to='/useraddress' className="text-blue-500 underline">Edit</Link>
   </div>
    
         

    <div className=" grid w-full grid-cols-2 text-center justify-center  gap-2">
    <Link to="/favorites"  className="w-full py-10 group flex flex-col items-center justify-center hover:bg-red-400 hover:text-white transition bg-red-200 rounded-xl">
  <FaHeart className="text-2xl text-red-500 group-hover:text-white transition" />
  <h1 className="font-semibold text-sm mt-2">  Favorites </h1>
  <p className="text-sm text-slate-500 group-hover:text-white mt-1">  Your Favorites list</p>
</Link>



<Link
  to="/cart"
  className="w-full py-10 group flex flex-col items-center justify-center hover:bg-blue-400 hover:text-white transition bg-blue-200 rounded-xl">
  <FaCartShopping className="text-2xl text-blue-600 group-hover:text-white transition" />
  <h1 className="font-semibold text-sm mt-2"> Orders</h1>
  <p className="text-sm text-slate-500 group-hover:text-white mt-1"> Your orders list </p>
</Link>


<Link
  // to=""
  className="w-full py-10 group flex flex-col items-center justify-center hover:bg-purple-400 hover:text-white transition bg-purple-200 rounded-xl">
  <FaStar className="text-2xl text-purple-600 group-hover:text-white transition" />
  <h1 className="font-semibold text-sm mt-2">  Points</h1>
  <p className="text-sm text-slate-500 group-hover:text-white mt-1">Your reward points</p>
</Link>


<Link
  to="/useraddress"
  className="w-full py-10 group flex flex-col items-center justify-center hover:bg-orange-400 hover:text-white transition bg-orange-200 rounded-xl">
  <FaLocationDot className="text-2xl text-orange-600 group-hover:text-white transition" />
  <h1 className="font-semibold text-sm mt-2">    Address </h1>
  <p className="text-sm text-slate-500 group-hover:text-white mt-1">  Manage your address</p>
</Link>

    </div>
</div>
      
      </form>
    </div>
  </>
  )
}

export default AccountProfile
