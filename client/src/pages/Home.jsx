import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const genres = ['All Genres', 'Hip-Hop', 'Rap', 'R&B', 'Trap', 'Drill', 'Jazz', 'Afrobeats', 'Pop', 'Rock', 'Electronic']

const mockSongs = [
  { id: 1, title: 'Too Many Nights', artist: 'Metro Boomin ft. Don Toliver', genre: 'TRAP', votes: 1240, comments: 89 },
  { id: 2, title: 'Superman', artist: 'Eminem ft. Dina Rae', genre: 'RAP', votes: 891, comments: 124 },
  { id: 3, title: 'Euphoria', artist: 'Kendrick Lamar', genre: 'RAP', votes: 1567, comments: 213 },
  { id: 4, title: "Can't Punk Me", artist: 'JID', genre: 'HIP-HOP', votes: 432, comments: 67 },
  { id: 5, title: 'Still D.R.E.', artist: 'Dr. Dre ft. Snoop Dogg', genre: 'HIP-HOP', votes: 2341, comments: 178 },
  { id: 6, title: 'All Eyez on Me', artist: '2Pac', genre: 'RAP', votes: 3102, comments: 445 },
]

function Home() {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen' style={{ background: '#131316' }}>
      <Navbar />

      {/* Hero Section */}
      <div className='relative pt-16 overflow-hidden' style={{ minHeight: '50vh' }}>
        <div className='absolute inset-0' style={{
          background: 'linear-gradient(135deg, rgba(0,255,133,0.08) 0%, transparent 60%)',
        }} />
        <div className='relative px-8 py-16 max-w-7xl mx-auto flex items-center justify-between gap-12'>

          {/* Left side - Text */}
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-2 h-2 rounded-full' style={{ background: '#00FF85' }} />
              <span className='text-xs font-semibold tracking-widest uppercase'
                style={{ color: '#00FF85', fontFamily: 'Hanken Grotesk' }}>
                Trending Now
              </span>
            </div>
            <h1 className='font-black uppercase leading-none mb-6'
              style={{ fontFamily: 'Syne', fontSize: 'clamp(32px, 4vw, 56px)', color: '#fff', letterSpacing: '-0.03em' }}>
              Mr. Morale &<br />The Big Steppers
            </h1>
            <p className='mb-6 text-sm' style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Hanken Grotesk' }}>
              Kendrick Lamar · 2022 · Hip-Hop
            </p>
            <div className='flex items-center gap-4'>
              <button className='flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105'
                style={{ background: '#00FF85', color: '#000', fontFamily: 'Hanken Grotesk' }}>
                ▶ Listen Now
              </button>
              <button className='flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200'
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontFamily: 'Hanken Grotesk' }}>
                + Save
              </button>
            </div>
          </div>

          {/* Right side - Album Art */}
          <div className='hidden md:block flex-shrink-0'>
            <div className='w-64 h-64 rounded-2xl flex items-center justify-center relative overflow-hidden'
              style={{ background: 'linear-gradient(135deg, #1a1a1d, #2a2a2d)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className='text-8xl'>🎵</span>
              <div className='absolute inset-0' style={{
                background: 'linear-gradient(135deg, rgba(0,255,133,0.1), transparent)'
              }} />
            </div>
          </div>

        </div>
      </div>

      {/* Genre Filter */}
      <div className='px-8 max-w-7xl mx-auto mb-10'>
        <div className='flex items-center gap-3 overflow-x-auto pb-2' style={{ scrollbarWidth: 'none' }}>
          {genres.map((genre, i) => (
            <button key={genre}
              className='px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200'
              style={{
                background: i === 0 ? '#fff' : 'rgba(255,255,255,0.06)',
                color: i === 0 ? '#000' : 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: 'Hanken Grotesk',
              }}>
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Song Cards Grid */}
      <div className='px-8 max-w-7xl mx-auto pb-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {mockSongs.map((song) => (
            <div key={song.id}
              onClick={() => navigate(`/song/${song.id}`)}
              className='rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]'
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>

              {/* Album Art Placeholder */}
              <div className='relative w-full aspect-square flex items-center justify-center'
                style={{ background: 'linear-gradient(135deg, #1a1a1d, #2a2a2d)' }}>
                <span className='text-6xl'>🎵</span>
                <span className='absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold tracking-widest'
                  style={{ background: 'rgba(0,0,0,0.6)', color: '#00FF85', fontFamily: 'Hanken Grotesk' }}>
                  {song.genre}
                </span>
              </div>

              {/* Card Info */}
              <div className='p-4'>
                <h3 className='font-bold text-white mb-1 truncate'
                  style={{ fontFamily: 'Syne', fontSize: '16px' }}>
                  {song.title}
                </h3>
                <p className='text-sm mb-4 truncate'
                  style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Hanken Grotesk' }}>
                  {song.artist}
                </p>

                {/* Votes and Comments */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <button className='flex items-center gap-1 text-sm transition-colors'
                      style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Hanken Grotesk' }}>
                      ▲ <span>{song.votes}</span>
                    </button>
                    <button style={{ color: 'rgba(255,255,255,0.3)' }}>▼</button>
                  </div>
                  <div className='flex items-center gap-1 text-sm'
                    style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                    💬 {song.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home