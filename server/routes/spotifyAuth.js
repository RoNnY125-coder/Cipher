import express from 'express'
import {
  spotifyLogin,
  spotifyCallback,
  getTopTracks,
} from '../controllers/spotifyAuthController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/login', protect, spotifyLogin)
router.get('/callback', spotifyCallback)
router.get('/top-tracks', protect, getTopTracks)

export default router