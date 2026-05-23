import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

const mockFavArtists = ['Kendrick Lamar', 'J. Cole', 'JID', 'Dr. Dre', 'Eminem']

const mockFavSongs = [
  { id: 3, title: 'Euphoria', artist: 'Kendrick Lamar', genre: 'RAP' },
  { id: 5, title: 'Still D.R.E.', artist: 'Dr. Dre ft. Snoop Dogg', genre: 'HIP-HOP' },
  { id: 6, title: 'All Eyez on Me', artist: '2Pac', genre: 'RAP' },
]

const mockCommentHistory = [
  { id: 1, song: 'Euphoria', text: 'This track hits different at 3am. Pure genius.', time: '2h ago', votes: 42 },
  { id: 2, song: 'Still D.R.E.', text: 'The beat on this is timeless. Dre never misses.', time: '1d ago', votes: 28 },
  { id: 3, song: 'Too Many Nights', text: 'Metro and Don Toliver are built different.', time: '3d ago', votes: 15 },
]

function Profile() {
  const { user } = useAuth()
  const [heroFullscreen, setHeroFullscreen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [username, setUsername] = useState(user?.username || 'testuser')
  const [bio, setBio] = useState('Music is my religion. Hip-hop is my prayer.')
  const [activeTab, setActiveTab] = useState('songs')

  return (
    <div className='min-h-screen' style={{ background: '#131316' }}>
      <Navbar />

      {/* Hero Screen Background */}
      <div className='relative pt-16 overflow-hidden' style={{ minHeight: '40vh' }}>
        {/* Animated background — low opacity hero */}
        <div className='absolute inset-0 cursor-pointer'
          onClick={() => setHeroFullscreen(true)}
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,133,0.06) 0%, rgba(0,0,0,0) 50%, rgba(0,255,133,0.04) 100%)',
          }}>
          {/* Abstract circles mimicking hero screen */}
          <div className='absolute' style={{
            width: '600px', height: '600px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,255,133,0.08) 0%, transparent 70%)',
            top: '-200px', right: '-100px',
          }} />
          <div className='absolute' style={{
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,255,133,0.05) 0%, transparent 70%)',
            bottom: '-100px', left: '10%',
          }} />
          <div className='absolute bottom-4 right-8 text-xs px-3 py-1 rounded-full'
            style={{ background: 'rgba(0,255,133,0.1)', color: '#00FF85', fontFamily: 'Hanken Grotesk' }}>
            Click to expand Hero Screen
          </div>
        </div>

        {/* Profile Info */}
        <div className='relative px-8 py-16 mt-4 max-w-7xl mx-auto'>
          <div className='flex items-start gap-8'>

            {/* Avatar */}
            <div className='relative cursor-pointer group flex-shrink-0'>
              <div className='w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 group-hover:scale-105'
                style={{
                  background: 'linear-gradient(135deg, rgba(0,255,133,0.3), rgba(0,255,133,0.1))',
                  border: '2px solid rgba(0,255,133,0.4)',
                  color: '#00FF85',
                  fontFamily: 'Syne',
                }}>
                {username[0].toUpperCase()}
              </div>
              <div className='absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'
                style={{ background: 'rgba(0,0,0,0.6)' }}>
                <span className='text-xs text-white' style={{ fontFamily: 'Hanken Grotesk' }}>Change</span>
              </div>
            </div>

            {/* User Info */}
            <div className='flex-1'>
              <div className='flex items-center gap-4 mb-2'>
                {editing ? (
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='text-2xl font-bold bg-transparent text-white border-b outline-none pb-1'
                    style={{ borderColor: '#00FF85', fontFamily: 'Syne', minWidth: '200px' }}
                    autoFocus
                  />
                ) : (
                  <h1 className='text-2xl font-bold text-white' style={{ fontFamily: 'Syne' }}>
                    {username}
                  </h1>
                )}

                {/* Plan badge */}
                <span className='px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider'
                  style={{
                    background: user?.plan === 'paid' ? 'rgba(0,255,133,0.15)' : 'rgba(255,255,255,0.08)',
                    color: user?.plan === 'paid' ? '#00FF85' : 'rgba(255,255,255,0.5)',
                    border: user?.plan === 'paid' ? '1px solid rgba(0,255,133,0.3)' : '1px solid rgba(255,255,255,0.1)',
                    fontFamily: 'Hanken Grotesk',
                  }}>
                  {user?.plan === 'paid' ? '⭐ Pro' : 'Free'}
                </span>

                {/* Edit button */}
                <button
                  onClick={() => setEditing(!editing)}
                  className='px-4 py-1 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105'
                  style={{
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: editing ? '#00FF85' : 'rgba(255,255,255,0.6)',
                    borderColor: editing ? 'rgba(0,255,133,0.4)' : 'rgba(255,255,255,0.2)',
                    fontFamily: 'Hanken Grotesk',
                  }}>
                  {editing ? '✓ Save' : 'Edit Profile'}
                </button>
              </div>

              {/* Bio */}
              {editing ? (
                <input
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className='w-full bg-transparent text-sm outline-none border-b pb-1'
                  style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', fontFamily: 'Hanken Grotesk' }}
                />
              ) : (
                <p className='text-sm' style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Hanken Grotesk' }}>
                  {bio}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='px-8 max-w-7xl mx-auto pb-16'>

        {/* Favourite Artists */}
        <div className='mb-10'>
          <p className='text-xs font-semibold tracking-widest uppercase mb-4'
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
            Favourite Artists
          </p>
          <div className='flex flex-wrap gap-2'>
            {mockFavArtists.map((artist) => (
              <span key={artist}
                className='px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 cursor-pointer'
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'Hanken Grotesk',
                }}>
                🎤 {artist}
              </span>
            ))}
            {editing && (
              <button className='px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105'
                style={{
                  background: 'rgba(0,255,133,0.08)',
                  color: '#00FF85',
                  border: '1px solid rgba(0,255,133,0.2)',
                  fontFamily: 'Hanken Grotesk',
                }}>
                + Add Artist
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className='flex items-center gap-2 mb-6'>
          {['songs', 'comments'].map((tab) => (
            <button key={tab}
              onClick={() => setActiveTab(tab)}
              className='px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200'
              style={{
                background: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.06)',
                color: activeTab === tab ? '#000' : 'rgba(255,255,255,0.6)',
                fontFamily: 'Hanken Grotesk',
              }}>
              {tab === 'songs' ? 'Favourite Songs' : 'Comment History'}
            </button>
          ))}
        </div>

        {/* Favourite Songs Tab */}
        {activeTab === 'songs' && (
          <div className='space-y-3 animate-fadeInUp'>
            {mockFavSongs.map((song) => (
              <div key={song.id}
                className='flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.01] cursor-pointer'
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className='w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0'
                  style={{ background: 'linear-gradient(135deg, #1a1a1d, #2a2a2d)' }}>
                  🎵
                </div>
                <div className='flex-1'>
                  <p className='text-white text-sm font-semibold' style={{ fontFamily: 'Syne' }}>
                    {song.title}
                  </p>
                  <p className='text-xs' style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Hanken Grotesk' }}>
                    {song.artist}
                  </p>
                </div>
                <span className='px-2 py-1 rounded text-xs font-bold'
                  style={{ background: 'rgba(0,255,133,0.1)', color: '#00FF85', fontFamily: 'Hanken Grotesk' }}>
                  {song.genre}
                </span>
                {editing && (
                  <button className='text-xs ml-2 transition-colors hover:text-red-400'
                    style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Hanken Grotesk' }}>
                    ✕
                  </button>
                )}
              </div>
            ))}
            {editing && (
              <button className='w-full p-4 rounded-xl text-sm transition-all duration-200 hover:scale-[1.01]'
                style={{
                  background: 'rgba(0,255,133,0.04)',
                  border: '1px dashed rgba(0,255,133,0.2)',
                  color: '#00FF85',
                  fontFamily: 'Hanken Grotesk',
                }}>
                + Add Song
              </button>
            )}
          </div>
        )}

        {/* Comment History Tab */}
        {activeTab === 'comments' && (
          <div className='space-y-3 animate-fadeInUp'>
            {mockCommentHistory.map((comment) => (
              <div key={comment.id}
                className='p-4 rounded-xl transition-all duration-200 hover:scale-[1.01]'
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-xs font-semibold'
                    style={{ color: '#00FF85', fontFamily: 'Hanken Grotesk' }}>
                    On "{comment.song}"
                  </span>
                  <div className='flex items-center gap-3'>
                    <span className='text-xs' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                      ▲ {comment.votes}
                    </span>
                    <span className='text-xs' style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Hanken Grotesk' }}>
                      {comment.time}
                    </span>
                  </div>
                </div>
                <p className='text-sm' style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Hanken Grotesk' }}>
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Subscription Card */}
        <div className='mt-10 p-6 rounded-2xl'
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-white font-semibold mb-1' style={{ fontFamily: 'Syne' }}>
                {user?.plan === 'paid' ? 'Pro Plan Active' : 'Free Plan'}
              </p>
              <p className='text-sm' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                {user?.plan === 'paid'
                  ? 'You have access to Hero Screens and all premium features'
                  : 'Upgrade to Pro to unlock Hero Screens and premium features'}
              </p>
            </div>
            {user?.plan !== 'paid' && (
              <button className='px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105 flex-shrink-0'
                style={{ background: '#00FF85', color: '#000', fontFamily: 'Hanken Grotesk' }}>
                Upgrade to Pro
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Hero Screen Fullscreen Modal */}
      {heroFullscreen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center animate-fadeIn'
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={() => setHeroFullscreen(false)}>
          <div className='text-center'>
            <div className='w-64 h-64 rounded-full mx-auto mb-8 flex items-center justify-center'
              style={{
                background: 'radial-gradient(circle, rgba(0,255,133,0.3) 0%, transparent 70%)',
                border: '1px solid rgba(0,255,133,0.3)',
              }}>
              <span className='text-8xl'>🎵</span>
            </div>
            <h2 className='text-white text-4xl font-black uppercase mb-4' style={{ fontFamily: 'Syne' }}>
              {username}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Hanken Grotesk' }}>
              {user?.plan === 'paid' ? 'Pro Member' : 'Upgrade to customize your Hero Screen'}
            </p>
            <p className='text-xs mt-8' style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Hanken Grotesk' }}>
              Click anywhere to close
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

export default Profile