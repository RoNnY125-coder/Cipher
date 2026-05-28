import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function SpotifyCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const spotify = searchParams.get('spotify')
    if (spotify === 'connected') {
      navigate('/profile?spotify=connected')
    } else {
      navigate('/profile')
    }
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center'
      style={{ background: '#131316' }}>
      <div className='text-center'>
        <div className='text-4xl mb-4'>🎵</div>
        <p className='text-white text-lg' style={{ fontFamily: 'Syne' }}>
          Connecting Spotify...
        </p>
      </div>
    </div>
  )
}

export default SpotifyCallback