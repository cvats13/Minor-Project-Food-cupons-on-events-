import React, { useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
import { QrCode, Utensils, Gift } from "lucide-react";

export default function Home() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center text-center px-6 py-10">
        {!showScanner ? (
          <>
            {/* Hero Section */}
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 mb-4">
                College Hackathon Food Coupon System 🍽️
              </h1>
              <p className="text-gray-700 text-lg mb-8">
                Welcome to the <span className="font-semibold text-purple-600">Hackathon Food Coupon Management Portal</span> — 
                a centralized system to manage food coupons digitally for hackathon participants, coordinators, and volunteers.
              </p>

              <div className="flex justify-center">
                <button
                  onClick={() => setShowScanner(true)}
                  className="px-8 py-3 text-lg rounded-lg shadow-md bg-purple-600 text-white hover:bg-purple-700 transition flex items-center gap-2"
                >
                  <QrCode size={20} />
                  Start Scan
                </button>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl">
              {[
                {
                  icon: <Utensils className="text-pink-500" size={40} />,
                  title: "Digital Meal Passes",
                  desc: "Provide digital food passes for hackathon participants.",
                },
                {
                  icon: <QrCode className="text-purple-500" size={40} />,
                  title: "QR Code Verification",
                  desc: "Quickly scan and validate coupons to ensure transparency.",
                },
                {
                  icon: <Gift className="text-yellow-500" size={40} />,
                  title: "Organized Management",
                  desc: "Simplify meal tracking for all hackathon days.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl shadow-md bg-white hover:shadow-lg transition flex flex-col items-center text-center gap-3"
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-gray-700">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Scanner Section
          <div className="flex flex-col items-center gap-6 mt-10">
            <div className="w-72 h-72 border-4 border-dashed border-purple-400 rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-300 to-pink-300 shadow-xl text-white font-bold text-lg">
              🔍 Scanner Active...
            </div>
            <button
              onClick={() => setShowScanner(false)}
              className="px-6 py-2 text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 transition"
            >
              Back
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
