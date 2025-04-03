import React, { useState } from "react";
import { useAdmin } from "../context-api/admincontext";
import { Settings, Menu } from "lucide-react";

const Header = () => {
  const { isAdmin, toggleAdminMode } = useAdmin();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-4 px-6 flex justify-between items-center shadow-lg relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-400"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 15}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Logo and title section with animation */}
      <div className="flex items-center space-x-3 z-10">
        <div className="bg-blue-600 p-2 rounded-lg rotate-12 transform transition-transform duration-300 hover:rotate-0">
          <Settings className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
            Profile Manager
          </h1>
          <div className="h-0.5 w-0 bg-blue-400 transition-all duration-700 group-hover:w-full" />
        </div>
      </div>

      {/* Navigation links with hover effects */}
      <div className="hidden md:flex items-center space-x-6 z-10">
        <a
          href="#dashboard"
          className="relative group px-2 py-1 transition-all duration-300 hover:text-blue-300"
        >
          Dashboard
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a
          href="#profiles"
          className="relative group px-2 py-1 transition-all duration-300 hover:text-blue-300"
        >
          Profiles
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a
          href="#settings"
          className="relative group px-2 py-1 transition-all duration-300 hover:text-blue-300"
        >
          Settings
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      {/* Admin toggle button with pulse animation */}
      <button
        onClick={toggleAdminMode}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative px-4 py-2 rounded-md font-medium transition-all duration-500 z-10
          ${isAdmin 
            ? "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900" 
            : "bg-gradient-to-r from-blue-600 to-indigo-800 hover:from-blue-700 hover:to-indigo-900"
          } overflow-hidden`}
      >
        <span className="relative z-10 flex items-center gap-2">
          {isAdmin ? (
            <>
              Exit Admin Mode
              <span className={`w-2 h-2 rounded-full bg-red-300 ${isHovered ? "animate-ping" : ""}`}></span>
            </>
          ) : (
            <>
              Enter Admin Mode
              <span className={`w-2 h-2 rounded-full bg-green-300 ${isHovered ? "animate-ping" : ""}`}></span>
            </>
          )}
        </span>
        <span className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform translate-y-full transition-transform duration-500 hover:translate-y-0"></span>
      </button>

      {/* Mobile menu toggle */}
      <button className="md:hidden z-10">
        <Menu className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;