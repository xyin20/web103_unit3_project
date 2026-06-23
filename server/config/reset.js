import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const { pool } = await import('./database.js')

const resetDatabase = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            address TEXT NOT NULL,
            city TEXT NOT NULL,
            state TEXT NOT NULL,
            zip TEXT NOT NULL,
            image TEXT NOT NULL
        )
    `)

    await pool.query(`
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            image TEXT NOT NULL
        )
    `)

    await pool.query(`
        INSERT INTO locations (id, name, address, city, state, zip, image)
        VALUES
            (1, 'Echo Lounge', '1323 N Stemmons Fwy', 'Dallas', 'TX', '75207', 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80'),
            (2, 'House of Blues', '2200 N Lamar St', 'Dallas', 'TX', '75202', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=900&q=80'),
            (3, 'Pavilion', '1818 1st Ave', 'Dallas', 'TX', '75210', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80'),
            (4, 'American Airlines Center', '2500 Victory Ave', 'Dallas', 'TX', '75219', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80')
        ON CONFLICT (id) DO NOTHING
    `)

    await pool.query(`
        INSERT INTO events (id, location_id, title, date, time, image)
        VALUES
            (1, 1, 'Community Open Mic', '2026-07-10', '19:00', 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80'),
            (2, 1, 'Indie Night Market', '2026-07-24', '18:30', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80'),
            (3, 2, 'Blues Jam Session', '2026-08-02', '20:00', 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=900&q=80'),
            (4, 3, 'Outdoor Movie Social', '2026-08-15', '20:30', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80'),
            (5, 4, 'UnityGrid Showcase', '2026-09-05', '18:00', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80')
        ON CONFLICT (id) DO NOTHING
    `)

    await pool.query(`
        SELECT SETVAL(pg_get_serial_sequence('locations', 'id'), COALESCE((SELECT MAX(id) FROM locations), 1))
    `)

    await pool.query(`
        SELECT SETVAL(pg_get_serial_sequence('events', 'id'), COALESCE((SELECT MAX(id) FROM events), 1))
    `)
}

resetDatabase()
    .then(() => {
        console.log('Database reset complete')
    })
    .catch((error) => {
        console.error('Database reset failed:', error)
    })
    .finally(() => {
        pool.end()
    })
