const parseResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.error || 'Unable to complete request')
    }

    return response.json()
}

const LocationsAPI = {
    getAllLocations: async () => {
        const response = await fetch('/api/locations')

        return parseResponse(response)
    },

    getLocationById: async (id) => {
        const response = await fetch(`/api/locations/${id}`)

        return parseResponse(response)
    },

    getEventsByLocationId: async (id) => {
        const response = await fetch(`/api/locations/${id}/events`)

        return parseResponse(response)
    }
}

export default LocationsAPI
