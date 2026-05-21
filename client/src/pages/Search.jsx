import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const mockSongs = [
  { id: 1, title: 'Too Many Nights', artist: 'Metro Boomin ft. Don Toliver', genre: 'TRAP' },
  { id: 2, title: 'Superman', artist: 'Eminem ft. Dina Rae', genre: 'RAP' },
  { id: 3, title: 'Euphoria', artist: 'Kendrick Lamar', genre: 'RAP' },
  { id: 4, title: "Can't Punk Me", artist: 'JID', genre: 'HIP-HOP' },
  { id: 5, title: 'Still D.R.E.', artist: 'Dr. Dre ft. Snoop Dogg', genre: 'HIP-HOP' },
  { id: 6, title: 'All Eyez on Me', artist: '2Pac', genre: 'RAP' },
]

const mockArtists = ['Kendrick Lamar', 'Drake', 'Eminem', 'J. Cole', '2Pac', 'JID', 'Metro Boomin', 'Dr. Dre']
const mockGenres = ['Hip-Hop', 'Rap', 'Trap', 'R&B', 'Drill', 'Jazz', 'Afrobeats', 'Pop', 'Rock', 'Electronic']
const mockProfiles = [
  { username: 'kenny_waves', comments: 142 },
  { username: 'rap_god_99', comments: 89 },
  { username: 'trap_senate', comments: 234 },
  { username: 'vinyl_digger', comments: 67 },
]
const recentSearches = ['Kendrick Lamar', 'Euphoria', 'Trap music', 'JID']

function Search() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()

  const isTyping = query.trim().length > 0

  const filteredSongs = mockSongs.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.artist.toLowerCase().includes(query.toLowerCase())
  )
  const filteredArtists = mockArtists.filter(a =>
    a.toLowerCase().includes(query.toLowerCase())
  )
  const filteredGenres = mockGenres.filter(g =>
    g.toLowerCase().includes(query.toLowerCase())
  )
  const filteredProfiles = mockProfiles.filter(p =>
    p.username.toLowerCase().includes(query.toLowerCase())
  )

  const hasResults = filteredSongs.length > 0 || filteredArtists.length > 0 ||
    filteredGenres.length > 0 || filteredProfiles.length > 0

  return (
    <div className='min-h-screen' style={{ background: '#131316' }}>
      <Navbar />

      <div className='pt-24 px-8 max-w-3xl mx-auto'>

        {/* Search Bar */}
        <div className='relative mb-8'>
          <div className='absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-all duration-300'
            style={{ color: focused ? '#00FF85' : 'rgba(255,255,255,0.4)' }}>
            ⌕
          </div>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder='Search songs, artists, genres, profiles...'
            className='w-full pl-12 pr-6 py-4 rounded-2xl text-white outline-none transition-all duration-300'
            style={{
              background: focused ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
              border: focused ? '1px solid rgba(0,255,133,0.5)' : '1px solid rgba(255,255,255,0.08)',
              fontFamily: 'Hanken Grotesk',
              fontSize: '16px',
              boxShadow: focused ? '0 0 30px rgba(0,255,133,0.1)' : 'none',
              transform: focused ? 'scale(1.01)' : 'scale(1)',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className='absolute right-4 top-1/2 -translate-y-1/2 text-sm transition-all duration-200 hover:scale-125'
              style={{ color: 'rgba(255,255,255,0.4)' }}>
              ✕
            </button>
          )}
        </div>

        {/* Recent Searches */}
        {focused && !isTyping && (
          <div className='animate-fadeInUp mb-8'>
            <p className='text-xs font-semibold tracking-widest uppercase mb-4'
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
              Recent Searches
            </p>
            <div className='flex flex-wrap gap-2'>
              {recentSearches.map((s, i) => (
                <button key={s}
                  onClick={() => setQuery(s)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 animate-fadeInUp stagger-${i + 1}`}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontFamily: 'Hanken Grotesk',
                  }}>
                  🕐 {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {isTyping && (
          <div className='space-y-8 animate-fadeIn'>

            {/* Songs */}
            {filteredSongs.length > 0 && (
              <div className='animate-fadeInUp'>
                <p className='text-xs font-semibold tracking-widest uppercase mb-4'
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                  Songs
                </p>
                <div className='space-y-2'>
                  {filteredSongs.map((song, i) => (
                    <div key={song.id}
                      onClick={() => navigate(`/song/${song.id}`)}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-green-500/30 animate-fadeInUp stagger-${Math.min(i + 1, 4)}`}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}>
                      <div className='w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg'
                        style={{ background: 'linear-gradient(135deg, #1a1a1d, #2a2a2d)' }}>
                        🎵
                      </div>
                      <div className='flex-1'>
                        <p className='text-white text-sm font-semibold'
                          style={{ fontFamily: 'Syne' }}>{song.title}</p>
                        <p className='text-xs' style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Hanken Grotesk' }}>
                          {song.artist}
                        </p>
                      </div>
                      <span className='px-2 py-1 rounded text-xs font-bold'
                        style={{ background: 'rgba(0,255,133,0.1)', color: '#00FF85', fontFamily: 'Hanken Grotesk' }}>
                        {song.genre}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Artists */}
            {filteredArtists.length > 0 && (
              <div className='animate-fadeInUp stagger-2'>
                <p className='text-xs font-semibold tracking-widest uppercase mb-4'
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                  Artists
                </p>
                <div className='flex flex-wrap gap-2'>
                  {filteredArtists.map((artist, i) => (
                    <button key={artist}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 animate-fadeInUp stagger-${Math.min(i + 1, 4)}`}
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        color: 'rgba(255,255,255,0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontFamily: 'Hanken Grotesk',
                      }}>
                      🎤 {artist}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Genres */}
            {filteredGenres.length > 0 && (
              <div className='animate-fadeInUp stagger-3'>
                <p className='text-xs font-semibold tracking-widest uppercase mb-4'
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                  Genres
                </p>
                <div className='flex flex-wrap gap-2'>
                  {filteredGenres.map((genre, i) => (
                    <button key={genre}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 animate-fadeInUp stagger-${Math.min(i + 1, 4)}`}
                      style={{
                        background: 'rgba(0,255,133,0.08)',
                        color: '#00FF85',
                        border: '1px solid rgba(0,255,133,0.2)',
                        fontFamily: 'Hanken Grotesk',
                      }}>
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Profiles */}
            {filteredProfiles.length > 0 && (
              <div className='animate-fadeInUp stagger-4'>
                <p className='text-xs font-semibold tracking-widest uppercase mb-4'
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                  Profiles
                </p>
                <div className='space-y-2'>
                  {filteredProfiles.map((profile, i) => (
                    <div key={profile.username}
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] animate-fadeInUp stagger-${Math.min(i + 1, 4)}`}
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className='w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold'
                        style={{ background: 'rgba(0,255,133,0.15)', color: '#00FF85', fontFamily: 'Syne' }}>
                        {profile.username[0].toUpperCase()}
                      </div>
                      <div className='flex-1'>
                        <p className='text-white text-sm font-semibold'
                          style={{ fontFamily: 'Hanken Grotesk' }}>@{profile.username}</p>
                        <p className='text-xs' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                          {profile.comments} signals
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No results */}
            {!hasResults && (
              <div className='text-center py-16 animate-fadeInUp'>
                <p className='text-4xl mb-4'>🔍</p>
                <p className='text-white font-semibold mb-2' style={{ fontFamily: 'Syne' }}>
                  No results found
                </p>
                <p className='text-sm' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                  Try searching for something else
                </p>
              </div>
            )}
          </div>
        )}

        {/* Default state */}
        {!focused && !isTyping && (
          <div className='text-center py-16 animate-fadeInUp'>
            <div className='text-5xl mb-4 animate-pulse-green inline-block'>⌕</div>
            <p className='text-white font-semibold mb-2' style={{ fontFamily: 'Syne' }}>
              Find your frequency
            </p>
            <p className='text-sm' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
              Search for songs, artists, genres or profiles
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Search