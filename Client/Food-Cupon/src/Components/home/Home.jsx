import React, { useState } from "react";
import Navbar from "./NavBar"; // import the separate Navbar

export default function Home() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="flex h-screen font-sans text-gray-800 bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Use the Navbar component */}
      <Navbar />

      <main className="flex-1 flex flex-col items-center gap-10 py-10">
        <h1 className="text-3xl font-semibold text-purple-700">Scanner</h1>
        {!showScanner ? (
          <button
            onClick={() => setShowScanner(true)}
            className="px-8 py-3 text-lg border rounded-lg shadow-md bg-purple-500 text-white hover:bg-purple-600 transition"
          >
            Start Scan
          </button>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="w-72 h-72 border-2 border-dashed rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-200 to-pink-400 shadow-lg text-white font-semibold text-lg">
              🔍 Scanner Active...
            </div>
            <button
              onClick={() => setShowScanner(false)}
              className="px-4 py-2 border rounded bg-purple-300 text-white hover:bg-purple-400 transition"
            >
              Back
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
