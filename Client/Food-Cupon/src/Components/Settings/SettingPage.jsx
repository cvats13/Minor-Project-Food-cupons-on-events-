// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle, FaPhone, FaEnvelope } from "react-icons/fa";

// export default function Setting() {
//   const navigate = useNavigate();

//   // Example user data (replace this with actual user info from backend/localStorage)
//   const user = {
//     username: "hardik_123",
//     name: "Hardik Dhawan",
//     phone: "+91 98765 43210",
//     email: "hardik@example.com",
//     avatar:
//       "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // sample avatar
//   };

//   const handleBack = () => navigate(-1);

//   const handleLogout = () => {
//     const ok = window.confirm("Are you sure you want to logout?");
//     if (!ok) return;

//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center font-sans text-gray-800">
//       {/* Top Bar */}
//       <div className="w-full max-w-3xl flex justify-between items-center p-4 mt-4">
//         <button
//           onClick={handleBack}
//           className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
//         >
//           ← Back
//         </button>

//         <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
//         <div className="w-20" /> {/* spacer for alignment */}
//       </div>

//       {/* User Profile Card */}
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 mt-6 flex flex-col items-center space-y-4">
//         <div className="relative">
//           <img
//             src={user.avatar}
//             alt="User Avatar"
//             className="w-28 h-28 rounded-full border-4 border-blue-200 shadow-md"
//           />
//           <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full">
//             <FaUserCircle size={18} />
//           </div>
//         </div>

//         <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
//         <p className="text-gray-500">@{user.username}</p>

//         <div className="mt-4 w-full text-center space-y-2">
//           <div className="flex justify-center items-center space-x-2">
//             <FaPhone className="text-blue-500" />
//             <span>{user.phone}</span>
//           </div>
//           <div className="flex justify-center items-center space-x-2">
//             <FaEnvelope className="text-blue-500" />
//             <span>{user.email}</span>
//           </div>
//         </div>

//         <button
//           onClick={handleLogout}
//           className="mt-6 px-6 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-50 transition duration-200"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Account Options */}
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 mt-8 space-y-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           Account Settings
//         </h2>

//         <div className="grid gap-3">
//           <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
//             Edit Profile
//           </button>
//           <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
//             Change Password
//           </button>
//           <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
//             Login &amp; Security
//           </button>
//         </div>

//         <hr className="my-6 border-gray-200" />

//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           Preferences
//         </h2>
//         <div className="grid gap-3">
//           <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
//             Language
//           </button>
//           <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
//             Notification Settings
//           </button>
//         </div>

//         <hr className="my-6 border-gray-200" />

//         <h2 className="text-xl font-semibold text-gray-800 mb-4">
//           Privacy & Danger Zone
//         </h2>
//         <div className="grid gap-3">
//           <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
//             Privacy Settings
//           </button>
//           <button className="text-left w-full px-4 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition">
//             Delete Account
//           </button>
//         </div>
//       </div>

//       <div className="mb-10" />
//     </div>
//   );
// }


import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/NavBar";
import Footer from "../home/Footer";
import { FaUserCircle, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Setting() {
  const navigate = useNavigate();

  // Example user data (replace this with actual user info from backend/localStorage)
  const user = {
    username: "hardik_123",
    name: "Hardik Dhawan",
    phone: "+91 98765 43210",
    email: "hardik@example.com",
    avatar:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // sample avatar
  };

  const handleBack = () => navigate(-1);

  const handleLogout = () => {
    const ok = window.confirm("Are you sure you want to logout?");
    if (!ok) return;

    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center text-center px-6 py-10">
        {/* Title */}
        <div className="flex justify-between items-center w-full max-w-4xl mb-8">
          <button
            onClick={handleBack}
            className="px-4 py-2 border rounded-lg hover:bg-purple-100 transition text-purple-700 font-semibold"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-extrabold text-purple-700">
            Settings ⚙️
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Profile Card */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8 flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-28 h-28 rounded-full border-4 border-purple-200 shadow-md"
            />
            <div className="absolute bottom-1 right-1 bg-purple-500 text-white p-1 rounded-full">
              <FaUserCircle size={18} />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>

          <div className="mt-4 w-full text-center space-y-2">
            <div className="flex justify-center items-center space-x-2">
              <FaPhone className="text-purple-500" />
              <span>{user.phone}</span>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <FaEnvelope className="text-purple-500" />
              <span>{user.email}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 px-6 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-50 transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Account Options */}
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8 mt-10 text-left">
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            Account Settings
          </h2>

          <div className="grid gap-3">
            <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-purple-50 transition">
              Edit Profile
            </button>
            <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-purple-50 transition">
              Change Password
            </button>
            <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-purple-50 transition">
              Login &amp; Security
            </button>
          </div>

          <hr className="my-6 border-gray-200" />

          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            Preferences
          </h2>
          <div className="grid gap-3">
            <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-purple-50 transition">
              Language
            </button>
            <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-purple-50 transition">
              Notification Settings
            </button>
          </div>

          <hr className="my-6 border-gray-200" />

          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            Privacy & Danger Zone
          </h2>
          <div className="grid gap-3">
            <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-purple-50 transition">
              Privacy Settings
            </button>
            <button className="text-left w-full px-4 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition">
              Delete Account
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

