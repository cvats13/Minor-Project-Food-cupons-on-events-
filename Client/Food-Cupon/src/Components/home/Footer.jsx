import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-purple-700 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-4">
        {/* College Info */}
        <div className="font-semibold text-lg">
          © 2025 Hackathon FoodPass | JIMS College
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Support</a>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-yellow-300 transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
