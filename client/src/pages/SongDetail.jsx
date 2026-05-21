import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useState } from 'react'

const mockSongs = [
  { id: 1, title: 'Too Many Nights', artist: 'Metro Boomin ft. Don Toliver', genre: 'TRAP', votes: 1240, comments: 89, year: '2022', spotifyUrl: 'https://open.spotify.com/track/2tGqHHgGZhgDrHkaDPDCFv' },
  { id: 2, title: 'Superman', artist: 'Eminem ft. Dina Rae', genre: 'RAP', votes: 891, comments: 124, year: '2002', spotifyUrl: 'https://open.spotify.com/track/7zzMBrzn5dMOHLQeXtNSaO' },
  { id: 3, title: 'Euphoria', artist: 'Kendrick Lamar', genre: 'RAP', votes: 1567, comments: 213, year: '2024', spotifyUrl: 'https://open.spotify.com/track/6LbSs9CSWK7sPNBwJtlmpT' },
  { id: 4, title: "Can't Punk Me", artist: 'JID', genre: 'HIP-HOP', votes: 432, comments: 67, year: '2022', spotifyUrl: 'https://open.spotify.com/track/3ee8Jmje8o58CHK7nXiGiT' },
  { id: 5, title: 'Still D.R.E.', artist: 'Dr. Dre ft. Snoop Dogg', genre: 'HIP-HOP', votes: 2341, comments: 178, year: '1999', spotifyUrl: 'https://open.spotify.com/track/6HZILIRieu8S0iqY8kIKhj' },
  { id: 6, title: 'All Eyez on Me', artist: '2Pac', genre: 'RAP', votes: 3102, comments: 445, year: '1996', spotifyUrl: 'https://open.spotify.com/track/5oJZgYMbBjFHPbpEhQlmPb' },
]

const mockComments = [
  { id: 1, username: 'kenny_waves', text: 'This track hits different at 3am. The production is absolutely insane.', votes: 342, time: '2h ago' },
  { id: 2, username: 'rap_god_99', text: 'Easily one of the best songs this decade. No debate.', votes: 218, time: '5h ago' },
  { id: 3, username: 'trap_senate', text: 'The beat switch at the bridge is pure genius. Repeat x100.', votes: 189, time: '1d ago' },
  { id: 4, username: 'vinyl_digger', text: 'Been on repeat for 3 days straight. My neighbors hate me lol.', votes: 97, time: '2d ago' },
]

function SongDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const [filter, setFilter] = useState('top')
  const [comments, setComments] = useState(mockComments)

  const song = mockSongs.find(s => s.id === parseInt(id))

  if (!song) {
    return (
      <div className='min-h-screen flex items-center justify-center' style={{ background: '#131316' }}>
        <div className='text-center'>
          <p className='text-white text-2xl mb-4'>Song not found</p>
          <button onClick={() => navigate('/')}
            style={{ color: '#00FF85' }}>
            Go back home
          </button>
        </div>
      </div>
    )
  }

  const handleComment = () => {
    if (!comment.trim()) return
    const newComment = {
      id: comments.length + 1,
      username: 'testuser',
      text: comment,
      votes: 0,
      time: 'just now'
    }
    setComments([newComment, ...comments])
    setComment('')
  }

  return (
    <div className='min-h-screen' style={{ background: '#131316' }}>
      <Navbar />

      {/* Hero Section */}
      <div className='relative pt-16 overflow-hidden' style={{ minHeight: '45vh' }}>
        {/* Faded background */}
        <div className='absolute inset-0 flex items-center justify-center opacity-10'>
          <span style={{ fontSize: '400px' }}>🎵</span>
        </div>
        <div className='absolute inset-0' style={{
          background: 'linear-gradient(to bottom, rgba(19,19,22,0.7) 0%, rgba(19,19,22,0.95) 100%)'
        }} />

        <div className='relative px-8 py-16 max-w-7xl mx-auto flex items-center justify-between gap-12'>
          {/* Left - Song Info */}
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-4'>
              <span className='px-3 py-1 rounded-full text-xs font-bold tracking-widest'
                style={{ background: 'rgba(0,255,133,0.15)', color: '#00FF85', fontFamily: 'Hanken Grotesk' }}>
                {song.genre}
              </span>
              <span className='text-xs' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                {song.year}
              </span>
            </div>

            <h1 className='font-black uppercase leading-none mb-3'
              style={{ fontFamily: 'Syne', fontSize: 'clamp(28px, 4vw, 52px)', color: '#fff', letterSpacing: '-0.03em' }}>
              {song.title}
            </h1>

            <p className='text-lg mb-6' style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Hanken Grotesk' }}>
              {song.artist}
            </p>

            <div className='flex items-center gap-4'>
              {/* Votes */}
              <div className='flex items-center gap-2 px-4 py-2 rounded-full'
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <button className='text-sm font-bold transition-colors hover:text-green-400'
                  style={{ color: '#00FF85' }}>▲</button>
                <span className='text-white text-sm font-semibold'
                  style={{ fontFamily: 'Hanken Grotesk' }}>{song.votes}</span>
                <button className='text-sm font-bold transition-colors'
                  style={{ color: 'rgba(255,255,255,0.4)' }}>▼</button>
              </div>

              {/* Spotify Button */}
              <a href={song.spotifyUrl} target='_blank' rel='noreferrer'
                className='flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105'
                style={{ background: '#1DB954', color: '#fff', fontFamily: 'Hanken Grotesk' }}>
                ▶ Listen on Spotify
              </a>

              {/* Comment count */}
              <div className='flex items-center gap-2 text-sm'
                style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                💬 {comments.length} signals
              </div>
            </div>
          </div>

          {/* Right - Album Art */}
          <div className='hidden md:block flex-shrink-0'>
            <div className='w-56 h-56 rounded-2xl flex items-center justify-center relative overflow-hidden'
              style={{ background: 'linear-gradient(135deg, #1a1a1d, #2a2a2d)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className='text-7xl'>🎵</span>
              <div className='absolute inset-0' style={{
                background: 'linear-gradient(135deg, rgba(0,255,133,0.1), transparent)'
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className='px-8 max-w-7xl mx-auto pb-16'>

        {/* Section Header */}
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-white font-bold text-xl'
            style={{ fontFamily: 'Syne' }}>
            Transmission Log
          </h2>
          <span className='text-sm' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
            {comments.length} signals
          </span>
        </div>

        {/* Comment Input */}
        <div className='p-4 rounded-2xl mb-6'
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add to the frequency...'
            rows={3}
            className='w-full bg-transparent text-white resize-none outline-none text-sm mb-3'
            style={{ fontFamily: 'Hanken Grotesk', color: 'rgba(255,255,255,0.8)' }}
          />
          <div className='flex justify-end'>
            <button
              onClick={handleComment}
              className='px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105'
              style={{ background: '#00FF85', color: '#000', fontFamily: 'Hanken Grotesk' }}>
              BROADCAST
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className='flex items-center gap-2 mb-6'>
          {['top', 'new', 'controversial'].map((f) => (
            <button key={f}
              onClick={() => setFilter(f)}
              className='px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200'
              style={{
                background: filter === f ? '#fff' : 'rgba(255,255,255,0.06)',
                color: filter === f ? '#000' : 'rgba(255,255,255,0.6)',
                fontFamily: 'Hanken Grotesk',
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Comments List */}
        <div className='space-y-4'>
          {comments.map((c) => (
            <div key={c.id} className='p-4 rounded-2xl'
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className='flex items-start gap-4'>
                {/* Vote Column */}
                <div className='flex flex-col items-center gap-1 pt-1'>
                  <button className='text-xs transition-colors hover:text-green-400'
                    style={{ color: 'rgba(255,255,255,0.5)' }}>▲</button>
                  <span className='text-xs font-bold'
                    style={{ color: '#00FF85', fontFamily: 'Hanken Grotesk' }}>{c.votes}</span>
                  <button className='text-xs transition-colors'
                    style={{ color: 'rgba(255,255,255,0.3)' }}>▼</button>
                </div>

                {/* Comment Content */}
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <button className='text-sm font-semibold hover:underline'
                      style={{ color: '#00FF85', fontFamily: 'Hanken Grotesk' }}>
                      @{c.username}
                    </button>
                    <span className='text-xs' style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Hanken Grotesk' }}>
                      {c.time}
                    </span>
                  </div>
                  <p className='text-sm leading-relaxed mb-3'
                    style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Hanken Grotesk' }}>
                    {c.text}
                  </p>
                  <div className='flex items-center gap-4'>
                    <button className='text-xs transition-colors hover:text-white'
                      style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                      Reply
                    </button>
                    <button className='text-xs transition-colors hover:text-white'
                      style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                      Share
                    </button>
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

export default SongDetail