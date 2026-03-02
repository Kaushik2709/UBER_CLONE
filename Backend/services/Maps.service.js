import axios from "axios";

export const getAddressCoordinate = async (address) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`)
        if (response.data && response.data.length > 0) {
            return {
                ltd: response.data[0].lat,
                lng: response.data[0].lon
            }
        }
        throw new Error("Address not found")
    } catch (error) {
        console.error("Error fetching coordinates:", error.message)
        throw error
    }
}

export const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required")
    }

    try {
        // First get coordinates for both origin and destination
        const originCoords = await getAddressCoordinate(origin)
        const destCoords = await getAddressCoordinate(destination)

        // Using OSRM public API for distance and duration
        const url = `http://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}?overview=false`

        const response = await axios.get(url)

        if (response.data && response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0]
            return {
                distance: {
                    text: `${(route.distance / 1000).toFixed(1)} km`,
                    value: route.distance
                },
                duration: {
                    text: `${Math.round(route.duration / 60)} mins`,
                    value: route.duration
                },
                status: "OK"
            }
        }
        throw new Error("Unable to calculate distance and time")
    } catch (error) {
        console.error("Error in getDistanceTime:", error.message)
        throw error
    }
}

export const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error("Input is required")
    }

    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&limit=5&addressdetails=1`)

        if (response.data) {
            return response.data.map(item => ({
                description: item.display_name,
                place_id: item.place_id,
                structured_formatting: {
                    main_text: item.display_name.split(',')[0],
                    secondary_text: item.display_name.split(',').slice(1).join(',').trim()
                }
            }))
        }
        return []
    } catch (error) {
        console.error("Error in getAutoCompleteSuggestions:", error.message)
        throw error
    }
}