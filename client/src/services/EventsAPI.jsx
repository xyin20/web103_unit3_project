const parseResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.error || 'Unable to complete request')
    }

    return response.json()
}

const EventsAPI = {
    getAllEvents: async () => {
        const response = await fetch('/api/events')

        return parseResponse(response)
    },

    getEventById: async (id) => {
        const response = await fetch(`/api/events/${id}`)

        return parseResponse(response)
    }
}

export default EventsAPI
