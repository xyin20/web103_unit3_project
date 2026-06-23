import { pool } from '../config/database.js'

const eventQuery = `
    SELECT
        events.id,
        events.location_id,
        events.title,
        TO_CHAR(events.date, 'YYYY-MM-DD') AS date,
        TO_CHAR(events.time, 'HH24:MI') AS time,
        events.image,
        locations.name AS location_name
    FROM events
    JOIN locations ON events.location_id = locations.id
`

export const getEvents = async (_, res) => {
    try {
        const results = await pool.query(`${eventQuery} ORDER BY events.date, events.time`)

        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query(`${eventQuery} WHERE events.id = $1`, [id])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        res.status(200).json(results.rows[0])
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getEventsByLocationId = async (req, res) => {
    try {
        const { id } = req.params
        const results = await pool.query(
            `${eventQuery} WHERE events.location_id = $1 ORDER BY events.date, events.time`,
            [id]
        )

        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
