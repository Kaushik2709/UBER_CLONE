import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { MapPin, Search, X, ArrowLeft } from "lucide-react";

const LookingForDriver = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pickup, destination, vehicle } = location.state || {};

    const [pickupValue, setPickupValue] = useState(pickup || "");
    const [destinationValue, setDestinationValue] = useState(destination || "");
    const [editingField, setEditingField] = useState(null); // "pickup" or "destination"
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const pulseRef = useRef(null);
    const carRef = useRef(null);
    const searchPanelRef = useRef(null);
    const searchInputRef = useRef(null);

    // Redirect if no data
    useEffect(() => {
        if (!pickup && !destination && !vehicle) {
            navigate("/home");
        }
    }, [pickup, destination, vehicle, navigate]);

    // Pulse animation for the searching indicator
    useGSAP(() => {
        if (!editingField && pulseRef.current) {
            gsap.to(pulseRef.current, {
                scale: 1.4,
                opacity: 0,
                duration: 1.5,
                repeat: -1,
                ease: "power2.out",
            });
        }
    }, [editingField]);

    // Car animation
    useGSAP(() => {
        if (!editingField && carRef.current) {
            gsap.to(carRef.current, {
                x: 10,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        }
    }, [editingField]);

    // Search panel animation
    useGSAP(() => {
        if (searchPanelRef.current) {
            if (editingField) {
                gsap.to(searchPanelRef.current, {
                    height: "100%",
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                });
            } else {
                gsap.to(searchPanelRef.current, {
                    height: "0%",
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in",
                });
            }
        }
    }, [editingField]);

    // Auto-focus search input when editing
    useEffect(() => {
        if (editingField && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 400);
        }
    }, [editingField]);

    // Simulation of location search without API fetching
    useEffect(() => {
        if (!searchQuery || searchQuery.length < 3) {
            setSearchResults([]);
            return;
        }

        const staticLocations = [
            { id: 1, title: "123 Main Street", description: "Home - Apartment" },
            { id: 2, title: "Tech Park, Downtown", description: "Work - Office" },
            { id: 3, title: "City Mall", description: "Shopping Center" },
            { id: 4, title: "Central Station", description: "Train Station" },
            { id: 5, title: "Airport Terminal", description: "International Airport" },
            { id: 6, title: "Hospital Street", description: "Medical Center" },
        ];

        const debounceTimer = setTimeout(() => {
            const filteredResults = staticLocations.filter(loc =>
                loc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                loc.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredResults);
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const handleLocationSelect = (result) => {
        if (editingField === "pickup") {
            setPickupValue(result.title);
        } else if (editingField === "destination") {
            setDestinationValue(result.title);
        }
        setEditingField(null);
        setSearchQuery("");
        setSearchResults([]);
    };
    
    const handleFieldClick = (field) => {
        setEditingField(field);
        setSearchQuery(field === "pickup" ? pickupValue : destinationValue);
    };

    const closeSearch = () => {
        setEditingField(null);
        setSearchQuery("");
        setSearchResults([]);
    };

    // Vehicle image mapping
    const vehicleImages = {
        UberGo:
            "https://imgs.search.brave.com/R07NOa-U7Lwih24MpqYbMiVjDcCcFnpWYFG2HiZJFcw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NTkyLzUzNS9zbWFs/bC9tb2Rlcm4tY2Fy/LWlzb2xhdGVkLW9u/LWJhY2tncm91bmQt/M2QtcmVuZGVyaW5n/LWlsbHVzdHJhdGlv/bi1wbmcucG5n",
        Moto: "https://imgs.search.brave.com/nORSBFpd2zNGNBiKMkMCFgKEoOyDfXxHqFG2HiZJFcw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTMv/ODcxLzMwOS9zbWFs/bC9tb3RvcmN5Y2xl/LWlzb2xhdGVkLW9u/LXdoaXRlLWJhY2tn/cm91bmQtM2QtcmVu/ZGVyaW5nLWlsbHVz/dHJhdGlvbi1wbmcu/cG5n",
        "Uber Premier":
            "https://imgs.search.brave.com/Y3tHsLhvNF8LvLDaOGQFkSxEmYzpPdq-HeMdkGAD_fk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTAv/MzY4LzQ2NC9zbWFs/bC9sdXh1cnktY2Fy/LWlzb2xhdGVkLW9u/LXdoaXRlLWJhY2tn/cm91bmQtM2QtcmVu/ZGVyaW5nLWlsbHVz/dHJhdGlvbi1wbmcu/cG5n",
    };

    const vehicleName = vehicle?.name || "UberGo";
    const vehiclePrice = vehicle?.price || "";

    return (
        <div className="relative h-screen w-full bg-gray-50 overflow-hidden">
            {/* Search Overlay */}
            <div
                ref={searchPanelRef}
                className="absolute inset-0 z-50 bg-white overflow-hidden"
                style={{ height: "0%", opacity: 0 }}
            >
                <div className="flex flex-col h-full">
                    {/* Search Header */}
                    <div className="p-4 bg-white border-b border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <button
                                onClick={closeSearch}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <ArrowLeft size={20} className="text-gray-700" />
                            </button>
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingField === "pickup"
                                    ? "Set pickup location"
                                    : "Set destination"}
                            </h3>
                        </div>

                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for a location..."
                                className="w-full bg-gray-100 rounded-xl pl-10 pr-10 py-3.5 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-gray-50 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <X size={18} className="text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Search Results */}
                    <div className="flex-1 overflow-y-auto">
                        {searchResults.length === 0 && searchQuery.length >= 3 && (
                            <div className="flex flex-col items-center justify-center py-12 px-6">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <MapPin size={28} className="text-gray-400" />
                                </div>
                                <p className="text-sm text-gray-500 text-center">
                                    No locations found. Try a different search term.
                                </p>
                            </div>
                        )}

                        {searchQuery.length < 3 && searchQuery.length > 0 && (
                            <div className="flex items-center justify-center py-8">
                                <p className="text-sm text-gray-400">
                                    Type at least 3 characters to search...
                                </p>
                            </div>
                        )}

                        {searchResults.map((result) => (
                            <div
                                key={result.id}
                                onClick={() => handleLocationSelect(result)}
                                className="flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50"
                            >
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <MapPin size={18} className="text-gray-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                                        {result.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                        {result.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col h-full">
                {/* Top Bar */}
                <div className="px-4 pt-12 pb-4 bg-white">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/home")}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft size={20} className="text-gray-700" />
                        </button>
                        <h2 className="text-lg font-bold text-gray-900">Your Ride</h2>
                    </div>
                </div>

                {/* Pickup & Destination Fields */}
                <div className="px-4 pb-4 bg-white border-b border-gray-100">
                    <div className="relative flex flex-col gap-3">
                        {/* Vertical line connector */}
                        <div className="absolute left-[19px] top-[20px] w-0.5 h-[calc(100%-40px)] bg-linear-to-b from-emerald-400 to-orange-400"></div>

                        {/* Pickup */}
                        <div
                            onClick={() => handleFieldClick("pickup")}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 z-10 group-hover:bg-emerald-100 transition-colors">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 group-hover:bg-gray-100 transition-colors">
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                    Pickup
                                </p>
                                <p
                                    className={`text-sm font-medium truncate ${pickupValue ? "text-gray-900" : "text-gray-400"
                                        }`}
                                >
                                    {pickupValue || "Set pickup location"}
                                </p>
                            </div>
                        </div>

                        {/* Destination */}
                        <div
                            onClick={() => handleFieldClick("destination")}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center shrink-0 z-10 group-hover:bg-orange-100 transition-colors">
                                <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 group-hover:bg-gray-100 transition-colors">
                                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                    Destination
                                </p>
                                <p
                                    className={`text-sm font-medium truncate ${destinationValue ? "text-gray-900" : "text-gray-400"
                                        }`}
                                >
                                    {destinationValue || "Set destination"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Area Placeholder */}
                <div className="flex-1 relative bg-gray-100 overflow-hidden">
                    {/* Subtle grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(0,0,0,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)
              `,
                            backgroundSize: "40px 40px",
                        }}
                    />

                    {/* Animated "roads" */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-gray-300/50"></div>
                        <div className="absolute top-2/3 left-0 right-0 h-[2px] bg-gray-300/50"></div>
                        <div className="absolute left-1/3 top-0 bottom-0 w-[2px] bg-gray-300/50"></div>
                        <div className="absolute left-2/3 top-0 bottom-0 w-[2px] bg-gray-300/50"></div>
                    </div>

                    {/* Center Looking Animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            {/* Pulse rings */}
                            <div
                                ref={pulseRef}
                                className="absolute inset-0 w-32 h-32 -m-8 rounded-full bg-black/5"
                            ></div>
                            <div className="absolute inset-0 w-32 h-32 -m-8 rounded-full bg-black/5 animate-ping" style={{ animationDuration: '2s' }}></div>

                            {/* Vehicle Icon */}
                            <div ref={carRef} className="relative z-10">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                                    <img
                                        src={vehicleImages[vehicleName] || vehicleImages["UberGo"]}
                                        alt={vehicleName}
                                        className="w-12 h-12 object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Animated dots moving around */}
                    <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div
                        className="absolute top-[60%] left-[75%] w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                        className="absolute top-[40%] left-[85%] w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute top-[75%] left-[25%] w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                        style={{ animationDelay: "1.5s" }}
                    ></div>
                </div>

                {/* Bottom Card */}
                <div className="bg-white px-5 pt-5 pb-8 rounded-t-3xl -mt-6 relative z-10 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
                    {/* Drag indicator */}
                    <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>

                    {/* Looking for driver status */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                            <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center">
                                <img
                                    src={vehicleImages[vehicleName] || vehicleImages["UberGo"]}
                                    alt={vehicleName}
                                    className="w-10 h-10 object-contain brightness-0 invert"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-bold text-gray-900">
                                Looking for nearby drivers
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                                {vehicleName}
                                {vehiclePrice ? ` • ${vehiclePrice}` : ""}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <div className="flex gap-1">
                                <div
                                    className="w-1.5 h-1.5 bg-gray-900 rounded-full animate-bounce"
                                    style={{ animationDelay: "0ms" }}
                                ></div>
                                <div
                                    className="w-1.5 h-1.5 bg-gray-900 rounded-full animate-bounce"
                                    style={{ animationDelay: "150ms" }}
                                ></div>
                                <div
                                    className="w-1.5 h-1.5 bg-gray-900 rounded-full animate-bounce"
                                    style={{ animationDelay: "300ms" }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Cancel button */}
                    <button
                        onClick={() => navigate("/home")}
                        className="w-full py-3.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 active:scale-[0.98] transition-all"
                    >
                        Cancel Ride
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LookingForDriver;
