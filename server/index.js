import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import protect from './middleware/authMiddleware.js'

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