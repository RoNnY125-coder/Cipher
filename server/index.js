import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import protect from './middleware/authMiddleware.js'
import spotifyRoutes from './routes/spotify.js'
import getSpotifyToken from './config/spotify.js'
import spotifyAuthRoutes from './routes/spotifyAuth.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/hello', (req, res) => {
  res.json({ message: 'hello world' })
})

// Routes
app.use('/api/auth', authRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Cipher API is Running' })
})

// Protected test route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, you are authorized` })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Cipher server running on port ${PORT}`)
})

app.use('/api/spotify', spotifyRoutes)

app.get('/api/spotify/token-test', async (req, res) => {
  try {
    const token = await getSpotifyToken()
    res.json({ token: token.substring(0, 20) + '...' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.use('/api/spotify-auth', spotifyAuthRoutes)