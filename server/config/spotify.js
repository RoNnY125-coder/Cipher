import axios from 'axios'

let accessToken = null
let tokenExpiry = null

const getSpotifyToken = async () => {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken
  }

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
    }
  )

  accessToken = response.data.access_token
  tokenExpiry = Date.now() + response.data.expires_in * 1000

  return accessToken
}

export default getSpotifyToken