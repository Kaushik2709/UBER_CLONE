import React, { useState } from 'react'
import { MapPin, Home, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LocationSearchPanel = ({ setPickup, setDestination, activeField, pickup, destination }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const navigate = useNavigate()

  const locations = [
    { id: 1, icon: Home, title: "123 Main Street", description: "Home - Apartment", distance: "2.5 km" },
    { id: 2, icon: Briefcase, title: "Tech Park, Downtown", description: "Work - Office", distance: "5.2 km" },
    { id: 3, icon: MapPin, title: "City Mall", description: "Shopping Center", distance: "3.8 km" },
    { id: 4, icon: MapPin, title: "Central Station", description: "Train Station", distance: "4.1 km" },
    { id: 5, icon: MapPin, title: "Airport Terminal", description: "International Airport", distance: "15.3 km" },
    { id: 6, icon: MapPin, title: "Hospital Street", description: "Medical Center", distance: "6.7 km" },
  ]

  const handleLocationClick = (location) => {
    if (activeField === "pickup") {
      setPickup(location.title)
    } else {
      setDestination(location.title)
    }
  }

  const handleRequestRide = () => {
    if (!selectedVehicle) return
    navigate('/looking-for-driver', {
      state: {
        pickup,
        destination,
        vehicle: selectedVehicle
      }
    })
  }

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
          return (
            <div
              key={location.id}
              onClick={() => handleLocationClick(location)}
              className="p-4 cursor-pointer transition-colors duration-200 flex items-start gap-4 hover:bg-gray-50"
            >
              <div className="shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                  <IconComponent size={20} className="text-gray-600" />
                </div>
              </div>
              <div className="grow min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">{location.title}</h4>
                <p className="text-xs text-gray-500 mt-1 truncate">{location.description}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs font-medium text-gray-600">{location.distance}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Ride Selection Panel — shown only if both locations are set */}
      {pickup && destination && (
        <div className="border-t border-gray-200 p-2 bg-white">
          <h3 className="text-base font-bold text-gray-900 mb-2 px-2">Find a trip</h3>

          <div className="flex flex-col gap-2">
            {[
              { id: 'ubergo', name: 'UberGo', price: '₹193.20', capacity: 4, desc: 'Affordable, compact rides', image: "https://imgs.search.brave.com/R07NOa-U7Lwih24MpqYbMiVjDcCcFnpWYFJnve3XdtI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NTkyLzUzNS9zbWFs/bC9tb2Rlcm4tY2Fy/LWlzb2xhdGVkLW9u/LWJhY2tncm91bmQt/M2QtcmVuZGVyaW5n/LWlsbHVzdHJhdGlv/bi1wbmcucG5n" },
              { id: 'moto', name: 'Moto', price: '₹85.50', capacity: 1, desc: 'Affordable motorcycle rides', image: "https://imgs.search.brave.com/nORSBFpd2zNGNBiKMkMCFgKEoOyDfXxHqFG2HiZJFcw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTMv/ODcxLzMwOS9zbWFs/bC9tb3RvcmN5Y2xl/LWlzb2xhdGVkLW9u/LWdoaXRlLWJhY2tn/cm91bmQtM2QtcmVu/ZGVyaW5nLWlsbHVzdHJhdGlvbi1wbmcu/cG5n" },
              { id: 'premier', name: 'Uber Premier', price: '₹350.75', capacity: 4, desc: 'Premium, comfortable rides', image: "https://imgs.search.brave.com/Y3tHsLhvNF8LvLDaOGQFkSxEmYzpPdq-HeMdkGAD_fk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTAv/MzY4LzQ2NC9zbWFs/bC9sdXh1cnktY2Fy/LWlzb2xhdGVkLW9u/LWdoaXRlLWJhY2tn/cm91bmQtM2QtcmVu/ZGVyaW5nLWlsbHVz/dHJhdGlvbi1wbmcu/cG5n" }
            ].map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v)}
                className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition-colors ${selectedVehicle?.id === v.id ? 'bg-gray-100 ring-1 ring-black/5' : 'bg-gray-50 hover:bg-gray-100'}`}
              >
                <img src={v.image} alt={v.name} className="w-14 h-14 object-contain shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-gray-900">{v.name}</span>
                    <span className="text-xs text-gray-500">👤 {v.capacity}</span>
                  </div>
                  <p className="text-xs text-gray-400">{v.desc}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-sm font-bold text-gray-900">{v.price}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Book button */}
          <button
            onClick={handleRequestRide}
            disabled={!selectedVehicle}
            className={`w-full mt-3 py-3 rounded-xl text-sm font-semibold transition-all ${selectedVehicle
              ? 'bg-black text-white hover:bg-gray-900 active:scale-[0.98]'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {selectedVehicle ? `Request ${selectedVehicle.name}` : 'Select a vehicle'}
          </button>
        </div>
      )}
    </div>
  )
}

export default LocationSearchPanel
