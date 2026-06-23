import React from 'react'
import '../css/Event.css'

const getDateTime = (date, time) => {
    if (!date || !time) {
        return null
    }

    const normalizedTime = time.length === 5 ? `${time}:00` : time
    const eventDate = new Date(`${date}T${normalizedTime}`)

    return Number.isNaN(eventDate.getTime()) ? null : eventDate
}

const formatDate = (date) => {
    const eventDate = getDateTime(date, '00:00')

    if (!eventDate) {
        return date
    }

    return eventDate.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}

const formatTime = (time) => {
    const eventDate = getDateTime('2026-01-01', time)

    if (!eventDate) {
        return time
    }

    return eventDate.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: '2-digit'
    })
}

const getRemaining = (date, time) => {
    const eventDate = getDateTime(date, time)

    if (!eventDate) {
        return { text: '', isPast: false }
    }

    const diff = eventDate.getTime() - Date.now()

    if (diff <= 0) {
        return { text: 'Event has started', isPast: true }
    }

    const totalMinutes = Math.floor(diff / 60000)
    const days = Math.floor(totalMinutes / 1440)
    const hours = Math.floor((totalMinutes % 1440) / 60)
    const minutes = totalMinutes % 60

    if (days > 0) {
        return { text: `${days}d ${hours}h remaining`, isPast: false }
    }

    if (hours > 0) {
        return { text: `${hours}h ${minutes}m remaining`, isPast: false }
    }

    return { text: `${minutes}m remaining`, isPast: false }
}

const Event = ({ title, date, time, image, locationName }) => {
    const remaining = getRemaining(date, time)

    return (
        <article className='event-information'>
            <img src={image} alt={title} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{title}</h3>
                    {locationName && <p>{locationName}</p>}
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {formatDate(date)} <br /> {formatTime(time)}</p>
                    <p className={remaining.isPast ? 'negative-time-remaining' : ''}>{remaining.text}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
