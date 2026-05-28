import axios from 'axios'
import User from '../models/User.js'

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = 'http://127.0.0.1:5173/callback'

const scopes = [
  'user-top-read',
  'user-read-recently-played',
  'user-library-read',
  'user-read-email',
  'user-read-private',
].join(' ')

// Step 1 — redirect user to Spotify login
export const spotifyLogin = (req, res) => {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: scopes,
    state: req.user._id.toString(),
  })

  res.json({
    url: `https://accounts.spotify.com/authorize?${params.toString()}`
  })
}

// Step 2 — handle callback and exchange code for token
export const spotifyCallback = async (req, res) => {
  try {
    const { code, state } = req.query

    if (!code) {
      return res.status(400).json({ message: 'No code provided' })
    }

    // Exchange code for tokens
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
          ).toString('base64')}`,
        },
      }
    )

    const { access_token, refresh_token } = tokenResponse.data

    // Save tokens to user in MongoDB
    await User.findByIdAndUpdate(state, {
      spotifyAccessToken: access_token,
      spotifyRefreshToken: refresh_token,
      spotifyConnected: true,
    })

    // Redirect back to frontend
    res.redirect('http://127.0.0.1:5173/profile?spotify=connected')

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Step 3 — get user's top tracks from Spotify
export const getTopTracks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (!user.spotifyConnected) {
      return res.status(400).json({ message: 'Spotify not connected' })
    }

    const response = await axios.get(
      'https://api.spotify.com/v1/me/top/tracks?limit=10',
      {
        headers: { Authorization: `Bearer ${user.spotifyAccessToken}` },
      }
    )

    const tracks = response.data.items.map((track) => ({
      spotifyId: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      album: track.album.name,
      albumArt: track.album.images[0]?.url,
      spotifyUrl: track.external_urls.spotify,
    }))

    res.json({ tracks })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}