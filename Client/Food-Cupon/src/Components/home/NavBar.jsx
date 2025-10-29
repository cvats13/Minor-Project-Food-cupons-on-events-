import React from "react";
import { Pizza, Home, Upload, FileText, Calendar, Settings, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 text-purple-600 font-bold text-2xl">
        <Pizza className="text-orange-500" />
        Hackathon FoodPass
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
        <a href="#" className="flex items-center gap-1 hover:text-purple-600 transition">
          <Home size={18} /> Home
        </a>
        <a href="#" className="flex items-center gap-1 hover:text-purple-600 transition">
          <Upload size={18} /> Import
        </a>
        <a href="#" className="flex items-center gap-1 hover:text-purple-600 transition">
          <FileText size={18} /> Logs
        </a>
        <a href="#" className="flex items-center gap-1 hover:text-purple-600 transition">
          <Calendar size={18} /> Schedule
        </a>
        <a href="#" className="flex items-center gap-1 hover:text-purple-600 transition">
          <Settings size={18} /> Settings
        </a>
      </div>

      {/* Admin/Login Button */}
      <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
        <User size={16} />
        Admin Login
      </button>
    </nav>
  );
}
