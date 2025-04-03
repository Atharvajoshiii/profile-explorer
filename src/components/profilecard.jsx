import React, { useState } from "react";
import { MapPin, Mail, Phone, Pencil, Trash, User, Star, Info } from "lucide-react";
import MapModal from "./MapModal";
import locations from '../data/locations';
import ProfileDetailModal from "./ProfileDetails";

const ProfileCard = ({ profile, isAdmin, onEdit, onDelete, onDetails }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const defaultImage = "https://via.placeholder.com/150?text=Profile";
  
  // Function to find location object based on the location string
  const findLocationCoordinates = (locationName) => {
    if (!locationName) return null;
    
    // Extract city name (assuming format like "City, State" or just "City")
    const cityPart = locationName.split(',')[0].trim();
    
    // Find the matching location from our locations array
    const matchedLocation = locations.find(loc => 
      loc.city.toLowerCase() === cityPart.toLowerCase()
    );
    
    return matchedLocation || { city: locationName }; // Return the found location or fallback
  };

  // Function to generate gradient background based on name
  const generateGradient = (name) => {
    if (!name) return "from-blue-600 to-indigo-800";
    
    // Simple hash function to get consistent colors based on name
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);
    
    const gradients = [
      "from-blue-600 to-indigo-800",
      "from-indigo-600 to-purple-800",
      "from-purple-600 to-pink-800",
      "from-blue-600 to-cyan-800",
      "from-cyan-600 to-blue-800"
    ];
    
    return gradients[hash % gradients.length];
  };
  
  return (
    <div 
      className="relative overflow-hidden rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl bg-gray-900 border border-gray-800 text-gray-100"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Card background with subtle animation */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute inset-0 bg-gradient-to-br ${generateGradient(profile.name)} opacity-30`}></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      {/* Decorative elements */}
      <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full bg-blue-600 blur-3xl opacity-20 transition-all duration-700 ${isHovering ? 'opacity-40' : 'opacity-20'}`}></div>
      <div className={`absolute -left-12 -bottom-12 w-32 h-32 rounded-full bg-indigo-600 blur-3xl opacity-20 transition-all duration-700 ${isHovering ? 'opacity-40' : 'opacity-20'}`}></div>
      
      {/* Card content */}
      <div className="p-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="relative mb-4 sm:mb-0 sm:mr-6">
            {profile.photoUrl || profile.image ? (
              <img
                src={profile.photoUrl || profile.image}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-800 shadow-lg"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
            ) : (
              <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br ${generateGradient(profile.name)}`}>
                <User className="w-12 h-12 text-white opacity-70" />
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
              <Star className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-200">
              {profile.name}
            </h2>
            <p className="flex items-center justify-center sm:justify-start text-blue-400 mt-1 text-sm">
              <MapPin size={14} className="mr-1" />
              {profile.location}
            </p>
            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
              {profile.description}
            </p>
          </div>
        </div>

        {/* Interests section */}
        {profile.interests && typeof profile.interests === 'string' && profile.interests.trim() !== '' && (
          <div className="mt-4 bg-gray-800 bg-opacity-50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-2">Interests:</p>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.split(',').map((interest, index) => (
                <span 
                  key={`interest-${index}`} 
                  className="text-xs bg-blue-900 bg-opacity-60 text-blue-200 px-2 py-1 rounded-full border border-blue-800 transition-colors hover:bg-blue-800"
                >
                  {interest.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact information */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex items-center space-x-2 text-gray-300 bg-gray-800 bg-opacity-50 rounded-lg p-2 transition-colors hover:bg-opacity-70">
            <Mail size={14} className="text-blue-400" />
            <span className="text-sm truncate">{profile.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 bg-gray-800 bg-opacity-50 rounded-lg p-2 transition-colors hover:bg-opacity-70">
            <Phone size={14} className="text-blue-400" />
            <span className="text-sm">{profile.phone}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4 justify-between">
          <button
            className="flex items-center px-3 py-1.5 bg-blue-900 bg-opacity-50 rounded-lg text-blue-300 hover:bg-opacity-70 transition-all transform hover:scale-105"
            onClick={() => setIsMapOpen(true)}
          >
            <MapPin size={14} className="mr-1.5" /> View Location
          </button>
          <button
            className="flex items-center px-3 py-1.5 bg-blue-900 bg-opacity-50 rounded-lg text-blue-300 hover:bg-opacity-70 transition-all transform hover:scale-105"
            onClick={() => setIsDetailOpen(true)}
          >
            <Info size={14} className="mr-1.5" /> Full Details
          </button>
        </div>

        {/* Admin actions */}
        {isAdmin && (
          <div className="flex justify-between mt-3 pt-3 border-t border-gray-800">
            <button
              className="flex items-center px-3 py-1.5 bg-indigo-900 bg-opacity-50 rounded-lg text-indigo-300 hover:bg-opacity-70 transition-all transform hover:scale-105"
              onClick={() => onEdit && onEdit(profile)}
            >
              <Pencil size={14} className="mr-1.5" /> Edit Profile
            </button>
            <button
              className="flex items-center px-3 py-1.5 bg-red-900 bg-opacity-50 rounded-lg text-red-300 hover:bg-opacity-70 transition-all transform hover:scale-105"
              onClick={() => onDelete && onDelete(profile)}
            >
              <Trash size={14} className="mr-1.5" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {isMapOpen && (
        <MapModal 
          location={findLocationCoordinates(profile.location)} 
          onClose={() => setIsMapOpen(false)} 
        />
      )}

      {isDetailOpen && (
        <ProfileDetailModal 
          profile={profile} 
          onClose={() => setIsDetailOpen(false)} 
        />
      )}

      {/* CSS for grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(55, 65, 81, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(55, 65, 81, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;