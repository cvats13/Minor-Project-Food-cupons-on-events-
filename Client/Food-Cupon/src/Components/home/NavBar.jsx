import React from "react";

const Navbar = () => {
  const navItems = ["Home", "Logs", "Import Area", "Schedule", "Settings", "Logout"];

  return (
    <aside className="w-64 p-5 bg-gradient-to-b from-blue-200 to-blue-400 text-white rounded-r-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Geekroom</h2>
      <nav className="flex flex-col gap-3">
        {navItems.map(item => (
          <button
            key={item}
            className="border border-white rounded p-2 hover:bg-white hover:text-blue-600 transition text-left"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Navbar;
