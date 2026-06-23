import express from 'express'
import { getLocationById, getLocations } from '../controllers/locations.js'
import { getEventsByLocationId } from '../controllers/events.js'

const router = express.Router()

router.get('/locations', getLocations)
router.get('/locations/:id', getLocationById)
router.get('/locations/:id/events', getEventsByLocationId)

export default router
