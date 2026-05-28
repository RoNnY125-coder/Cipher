import express from 'express'
import { searchSpotify, getTrack } from '../controllers/spotifyController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/search', protect, searchSpotify)
router.get('/track/:id', protect, getTrack)

export default router