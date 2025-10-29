// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Setting() {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     navigate(-1); // go back safely
//   };

//   const handleViewLogs = () => {
//     navigate("/logs");
//   };

//   const handleLogout = () => {
//     const ok = window.confirm("Are you sure you want to logout?");
//     if (!ok) return;

//     // Remove JWT or any saved token from localStorage
//     localStorage.removeItem("authToken");

//     console.log("User logged out successfully.");
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Top action bar */}
//       <div className="p-4 flex justify-between w-full max-w-3xl mx-auto mb-4">
//         <button
//           onClick={handleBack}
//           className="px-4 py-2 border rounded hover:bg-gray-100 transition"
//         >
//           ← Back
//         </button>

//         <button
//           onClick={handleViewLogs}
//           className="px-4 py-2 border rounded hover:bg-gray-100 transition"
//         >
//           View Logs
//         </button>
//       </div>

//       {/* Main content */}
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 font-sans text-gray-800">
//         <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6 space-y-6">
//           <h1 className="text-3xl font-semibold text-gray-900 mb-4">Settings</h1>

//           {/* Account section */}
//           <section className="border-b pb-5">
//             <h2 className="text-xl font-semibold mb-3">Account Settings</h2>
//             <div className="space-y-3">
//               <button className="w-full text-left px-4 py-3 border rounded hover:bg-gray-100 transition">
//                 Edit Profile
//               </button>
//               <button className="w-full text-left px-4 py-3 border rounded hover:bg-gray-100 transition">
//                 Change Password
//               </button>
//               <button className="w-full text-left px-4 py-3 border rounded hover:bg-gray-100 transition">
//                 Login &amp; Security
//               </button>
//             </div>
//           </section>

//           {/* Preferences */}
//           <section className="border-b pb-5">
//             <h2 className="text-xl font-semibold mb-3">Preferences</h2>
//             <div className="space-y-3">
//               <button className="w-full text-left px-4 py-3 border rounded hover:bg-gray-100 transition">
//                 Language
//               </button>
//               <button className="w-full text-left px-4 py-3 border rounded hover:bg-gray-100 transition">
//                 Notification Settings
//               </button>
//             </div>
//           </section>

//           {/* Danger zone */}
//           <section>
//             <h2 className="text-xl font-semibold mb-3">Privacy &amp; Danger Zone</h2>
//             <div className="space-y-3">
//               <button className="w-full text-left px-4 py-3 border rounded hover:bg-gray-100 transition">
//                 Privacy Settings
//               </button>
//               <button className="w-full text-left px-4 py-3 border rounded text-red-600 border-red-600 hover:bg-red-50 transition">
//                 Delete Account
//               </button>
//             </div>
//           </section>

//           {/* Session / Logout */}
//           <section className="pt-5 border-t">
//             <h2 className="text-xl font-semibold mb-3">Session</h2>
//             <button
//               onClick={handleLogout}
//               className="w-full text-left px-4 py-3 border rounded text-red-600 border-red-600 hover:bg-red-50 transition"
//             >
//               Logout
//             </button>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }









import React from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col items-center font-sans text-gray-800">
      {/* Top Bar */}
      <div className="w-full max-w-3xl flex justify-between items-center p-4 mt-4">
        <button
          onClick={handleBack}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <div className="w-20" /> {/* spacer for alignment */}
      </div>

      {/* User Profile Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 mt-6 flex flex-col items-center space-y-4">
        <div className="relative">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-blue-200 shadow-md"
          />
          <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full">
            <FaUserCircle size={18} />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900">{user.name}</h2>
        <p className="text-gray-500">@{user.username}</p>

        <div className="mt-4 w-full text-center space-y-2">
          <div className="flex justify-center items-center space-x-2">
            <FaPhone className="text-blue-500" />
            <span>{user.phone}</span>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <FaEnvelope className="text-blue-500" />
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
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 mt-8 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Account Settings
        </h2>

        <div className="grid gap-3">
          <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
            Edit Profile
          </button>
          <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
            Change Password
          </button>
          <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
            Login &amp; Security
          </button>
        </div>

        <hr className="my-6 border-gray-200" />

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Preferences
        </h2>
        <div className="grid gap-3">
          <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
            Language
          </button>
          <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
            Notification Settings
          </button>
        </div>

        <hr className="my-6 border-gray-200" />

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Privacy & Danger Zone
        </h2>
        <div className="grid gap-3">
          <button className="text-left w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
            Privacy Settings
          </button>
          <button className="text-left w-full px-4 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition">
            Delete Account
          </button>
        </div>
      </div>

      <div className="mb-10" />
    </div>
  );
}
