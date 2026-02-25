import React, { useState } from 'react'
import { MapPin, Home, Briefcase } from 'lucide-react'

const LocationSearchPanel = () => {
  const [selectedDestination, setSelectedDestination] = useState(null)

  const locations = [
    { id: 1, icon: Home, title: "123 Main Street", description: "Home - Apartment", distance: "2.5 km" },
    { id: 2, icon: Briefcase, title: "Tech Park, Downtown", description: "Work - Office", distance: "5.2 km" },
    { id: 3, icon: MapPin, title: "City Mall", description: "Shopping Center", distance: "3.8 km" },
    { id: 4, icon: MapPin, title: "Central Station", description: "Train Station", distance: "4.1 km" },
    { id: 5, icon: MapPin, title: "Airport Terminal", description: "International Airport", distance: "15.3 km" },
    { id: 6, icon: MapPin, title: "Hospital Street", description: "Medical Center", distance: "6.7 km" },
  ]

  return (
    <div className="bg-white rounded-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Popular Locations</h3>
        <p className="text-sm text-gray-500 mt-1">Select a location or search for more</p>
      </div>

      {/* Locations List */}
      <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
        {locations.map((location) => {
          const IconComponent = location.icon
          const isSelected = selectedDestination?.id === location.id
          return (
            <div
              key={location.id}
              onClick={() => setSelectedDestination(isSelected ? null : location)}
              className={`p-4 cursor-pointer transition-colors duration-200 flex items-start gap-4 ${
                isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-black' : 'bg-gray-100'
                }`}>
                  <IconComponent size={20} className={isSelected ? 'text-white' : 'text-gray-600'} />
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">{location.title}</h4>
                <p className="text-xs text-gray-500 mt-1 truncate">{location.description}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-xs font-medium text-gray-600">{location.distance}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Ride Selection Panel — shown only after selecting a destination */}
      {selectedDestination && (
        <div className="border-t border-gray-200 p-4">
          {/* "Find a trip" heading */}
          <h3 className="text-base font-bold text-gray-900 mb-3">Find a trip</h3>

          {/* Compact ride card */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            {/* Car image */}
            <img
              src="https://imgs.search.brave.com/R07NOa-U7Lwih24MpqYbMiVjDcCcFnpWYFJnve3XdtI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NTkyLzUzNS9zbWFs/bC9tb2Rlcm4tY2Fy/LWlzb2xhdGVkLW9u/LWJhY2tncm91bmQt/M2QtcmVuZGVyaW5n/LWlsbHVzdHJhdGlv/bi1wbmcucG5n"
              alt="UberGo"
              className="w-14 h-14 object-contain flex-shrink-0"
            />

            {/* Ride details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-900">UberGo</span>
                <span className="text-xs text-gray-500">👤 4</span>
              </div>
              <p className="text-xs text-gray-500">2 mins away</p>
              <p className="text-xs text-gray-400">Affordable, compact rides</p>
            </div>

            {/* Price */}
            <div className="flex-shrink-0 text-right">
              <span className="text-sm font-bold text-gray-900">₹193.20</span>
            </div>
          </div>

          {/* Book button */}
          <button className="w-full mt-3 bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 transition-colors">
            Request UberGo
          </button>
        </div>
      )}
    </div>
  )
}

export default LocationSearchPanel