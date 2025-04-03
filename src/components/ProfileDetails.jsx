import React, { useState, useEffect } from "react";
import { X, Mail, Phone, MapPin, Tag, Globe, Clock, Briefcase, Code, User } from "lucide-react";

const ProfileDetailModal = ({ profile, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (profile) {
      setIsVisible(true);
      setTimeout(() => setAnimateIn(true), 50);
    }
  }, [profile]);

  if (!profile) return null;

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${animateIn ? 'bg-black/70 backdrop-blur-md' : 'bg-black/0 backdrop-blur-none'}`}>
      {/* Neural network background effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/30 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_20%,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent animate-pulse delay-700"></div>
      </div>
      
      <div className={`w-full max-w-4xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-800 overflow-hidden flex flex-col md:flex-row transition-all duration-500 ${
        animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        boxShadow: "0 0 40px rgba(92, 92, 255, 0.15), 0 0 20px rgba(147, 51, 234, 0.1)"
      }}>
        {/* Top colorful border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600"></div>
        
        {/* Left Section - Photo and Basic Info */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-full opacity-10 blur-xl"></div>
          
          <div className="relative flex flex-col items-center md:items-start">
            <div className="mb-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-80 group-hover:opacity-100 transition-all duration-300 scale-110"></div>
              <img
                src={profile.photoUrl || "/api/placeholder/150/150"}
                alt={profile.name}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-gray-800 object-cover shadow-xl relative z-10 group-hover:scale-105 transition-all duration-300"
                onError={(e) => {
                  e.target.src = "/api/placeholder/150/150";
                }}
              />
            </div>
            
            <h2 className="text-2xl font-bold text-center md:text-left text-white">{profile.name}</h2>
            
            {profile.title && (
              <p className="text-purple-200 mt-2 text-center md:text-left">{profile.title}</p>
            )}
            
            <div className="flex items-center mt-3 text-blue-200">
              <MapPin size={16} className="mr-2" />
              <span>{profile.location}</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-3 w-full">
            <div className="flex items-center p-3 bg-gray-800 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-200 border border-gray-700">
              <Mail size={16} className="mr-3 text-blue-300" />
              <span className="text-gray-100 text-sm md:text-base truncate">{profile.email}</span>
            </div>
            
            <div className="flex items-center p-3 bg-gray-800 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-200 border border-gray-700">
              <Phone size={16} className="mr-3 text-blue-300" />
              <span className="text-gray-100 text-sm md:text-base">{profile.phone}</span>
            </div>
            
            {profile.website && (
              <div className="flex items-center p-3 bg-gray-800 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-200 border border-gray-700">
                <Globe size={16} className="mr-3 text-blue-300" />
                <span className="text-gray-100 text-sm md:text-base truncate">{profile.website}</span>
              </div>
            )}

            {profile.experience && (
              <div className="flex items-center p-3 bg-gray-800 bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-200 border border-gray-700">
                <Clock size={16} className="mr-3 text-blue-300" />
                <span className="text-gray-100 text-sm md:text-base">
                  {profile.experience} {Number(profile.experience) === 1 ? 'year' : 'years'} experience
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Section - Description and Details */}
        <div className="w-full md:w-3/5 p-6 relative bg-gray-800">
          <button
            className="absolute top-4 right-4 bg-gray-700 text-gray-300 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 hover:rotate-90"
            onClick={handleClose}
          >
            <X size={18} />
          </button>
          
          {/* About section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-3 pb-2 border-b border-gray-700 flex items-center">
              <span className="w-2 h-8 bg-blue-500 rounded-full mr-3"></span>
              About
            </h3>
            <p className="text-gray-300">{profile.description}</p>
          </div>
          
          {/* Skills section */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-3 pb-2 border-b border-gray-700 flex items-center">
                <span className="w-2 h-8 bg-purple-500 rounded-full mr-3"></span>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-blue-800/50 to-purple-800/50 text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-800/70 transform transition-all duration-200"
                  >
                    {typeof skill === 'object' ? skill.name : skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Interests tags */}
          {profile.interests && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Tag size={16} className="mr-2 text-purple-400" />
                <h3 className="text-lg font-semibold text-blue-300 pb-2 border-b border-gray-700 flex-1">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.interests?.split(',').map((interest, index) => (
                  interest.trim() && (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-700 hover:border-blue-500/50 hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-900/10"
                    >
                      {interest.trim()}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}
          
          {/* Experience section - Updated to handle both array and number formats */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Clock size={16} className="mr-2 text-blue-400" />
              <h3 className="text-lg font-semibold text-blue-300 pb-2 border-b border-gray-700 flex-1">Experience</h3>
            </div>
            
            {Array.isArray(profile.experience) ? (
              <div className="space-y-3">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 transition-all duration-200">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-200">{exp.role}</h4>
                      <p className="text-blue-300 text-sm">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-indigo-900 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-indigo-700">
                        {exp.years} {exp.years === 1 ? 'year' : 'years'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              profile.experience ? (
                <div className="flex items-center p-4 bg-gray-700 rounded-lg border border-gray-600 transition-all duration-200">
                  <p className="text-gray-300">
                    {profile.experience} {Number(profile.experience) === 1 ? 'year' : 'years'} of professional experience
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 italic">No experience information available</p>
              )
            )}
          </div>
          
          <div className="mt-auto pt-4">
            <button
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-blue-900/30 transform hover:-translate-y-0.5"
              onClick={handleClose}
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailModal;