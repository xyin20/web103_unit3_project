import React, { useEffect, useState } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const loadEvents = async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()

                if (isMounted) {
                    setEvents(eventsData)
                }
            }
            catch (requestError) {
                if (isMounted) {
                    setError(requestError.message)
                }
            }
            finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadEvents()

        return () => {
            isMounted = false
        }
    }, [])

    if (loading) {
        return <h2>Loading events...</h2>
    }

    if (error) {
        return <h2>{error}</h2>
    }

    return (
        <div className='location-events'>
            <header>
                <div className='location-info'>
                    <h2>All Events</h2>
                    <p>Upcoming community events across UnityGrid Plaza</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                            locationName={event.location_name}
                        />
                    ) : <h2>No events scheduled yet!</h2>
                }
            </main>
        </div>
    )
}

export default Events
