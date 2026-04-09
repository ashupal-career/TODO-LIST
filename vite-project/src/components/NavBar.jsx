import React from "react";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/20 border-b border-white/20 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-white tracking-wide cursor-pointer">
          ✨ iTask
        </div>

        {/* Menu */}
        <ul className="flex gap-6  from-violet-600 font-medium">
          <li className="cursor-pointer relative group">
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>

          <li className="cursor-pointer relative group">
            Your Tasks
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default NavBar;