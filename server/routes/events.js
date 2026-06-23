import express from 'express'
import { getEventById, getEvents } from '../controllers/events.js'

const router = express.Router()

router.get('/events', getEvents)
router.get('/events/:id', getEventById)

export default router
