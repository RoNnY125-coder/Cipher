import axios from 'axios'
import getSpotifyToken from '../config/spotify.js'

export const searchSpotify = async (req, res) => {
  try {
    const { q } = req.query

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' })
    }

    const token = await getSpotifyToken()

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        q,
        type: 'track',
        limit: 10,
      },
    })

    const tracks = response.data.tracks.items.map((track) => ({
      spotifyId: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      album: track.album.name,
      albumArt: track.album.images[0]?.url,
      releaseDate: track.album.release_date,
      previewUrl: track.preview_url,
      spotifyUrl: track.external_urls.spotify,
    }))

    res.json({ tracks })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getTrack = async (req, res) => {
  try {
    const { id } = req.params

    const token = await getSpotifyToken()

    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    const track = response.data

    res.json({
      spotifyId: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      album: track.album.name,
      albumArt: track.album.images[0]?.url,
      releaseDate: track.album.release_date,
      previewUrl: track.preview_url,
      spotifyUrl: track.external_urls.spotify,
      durationMs: track.duration_ms,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}