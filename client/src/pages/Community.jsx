import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

const mockSongs = [
  'Too Many Nights', 'Superman', 'Euphoria',
  "Can't Punk Me", 'Still D.R.E.', 'All Eyez on Me'
]

const mockPosts = [
  { id: 1, username: 'kenny_waves', song: 'Euphoria', text: 'The way Kendrick flips the beat at 2:30 is absolutely insane. Nobody does it like him.', votes: 342, time: '2h ago', replies: 12 },
  { id: 2, username: 'rap_god_99', song: 'Still D.R.E.', text: 'This beat aged like fine wine. 25 years later and it still slaps harder than anything on the charts.', votes: 218, time: '5h ago', replies: 8 },
  { id: 3, username: 'trap_senate', song: 'Too Many Nights', text: 'Metro Boomin and Don Toliver is a combo nobody expected but everybody needed.', votes: 189, time: '8h ago', replies: 5 },
  { id: 4, username: 'vinyl_digger', song: 'All Eyez on Me', text: '2Pac was speaking to the future. Every line hits different when you understand the context.', votes: 156, time: '1d ago', replies: 23 },
  { id: 5, username: 'bass_head', song: 'Superman', text: "Eminem's storytelling on this track is unmatched. The way he builds the narrative is cinematic.", votes: 134, time: '1d ago', replies: 7 },
  { id: 6, username: 'cipher_user', song: "Can't Punk Me", text: 'JID is criminally underrated. This verse should be in every rap conversation.', votes: 97, time: '2d ago', replies: 4 },
]

function Community() {
  const { user } = useAuth()
  const [filter, setFilter] = useState('all')
  const [posts, setPosts] = useState(mockPosts)
  const [newPost, setNewPost] = useState('')
  const [selectedSong, setSelectedSong] = useState(mockSongs[0])
  const [votedPosts, setVotedPosts] = useState({})

  const filters = ['all', 'top', 'new', 'trending']

  const filteredPosts = [...posts].sort((a, b) => {
    if (filter === 'top') return b.votes - a.votes
    if (filter === 'new') return a.time.localeCompare(b.time)
    return 0
  })

  const handlePost = () => {
    if (!newPost.trim()) return
    const post = {
      id: posts.length + 1,
      username: user?.username || 'testuser',
      song: selectedSong,
      text: newPost,
      votes: 0,
      time: 'just now',
      replies: 0,
    }
    setPosts([post, ...posts])
    setNewPost('')
  }

  const handleVote = (id, value) => {
    if (votedPosts[id]) return
    setPosts(posts.map(p =>
      p.id === id ? { ...p, votes: p.votes + value } : p
    ))
    setVotedPosts({ ...votedPosts, [id]: value })
  }

  return (
    <div className='min-h-screen' style={{ background: '#131316' }}>
      <Navbar />

      <div className='pt-24 px-8 max-w-3xl mx-auto pb-16'>

        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-white font-black text-3xl mb-2' style={{ fontFamily: 'Syne' }}>
            Community
          </h1>
          <p className='text-sm' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
            {posts.length} discussions happening now
          </p>
        </div>

        {/* Post Input */}
        <div className='p-5 rounded-2xl mb-8'
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Song selector */}
          <div className='flex items-center gap-2 mb-3'>
            <span className='text-xs uppercase tracking-widest'
              style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
              Discussing:
            </span>
            <select
              value={selectedSong}
              onChange={(e) => setSelectedSong(e.target.value)}
              className='text-sm outline-none rounded-lg px-3 py-1 cursor-pointer'
              style={{
                background: 'rgba(0,255,133,0.1)',
                color: '#00FF85',
                border: '1px solid rgba(0,255,133,0.2)',
                fontFamily: 'Hanken Grotesk',
              }}>
              {mockSongs.map(s => (
                <option key={s} value={s} style={{ background: '#1a1a1d', color: '#fff' }}>{s}</option>
              ))}
            </select>
          </div>

          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder='Share your thoughts on the music...'
            rows={3}
            className='w-full bg-transparent text-white resize-none outline-none text-sm mb-3'
            style={{ fontFamily: 'Hanken Grotesk', color: 'rgba(255,255,255,0.8)' }}
          />

          <div className='flex items-center justify-between'>
            <span className='text-xs' style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Hanken Grotesk' }}>
              {newPost.length}/500
            </span>
            <button
              onClick={handlePost}
              disabled={!newPost.trim()}
              className='px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 disabled:opacity-40'
              style={{ background: '#00FF85', color: '#000', fontFamily: 'Hanken Grotesk' }}>
              BROADCAST
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className='flex items-center gap-2 mb-6'>
          {filters.map((f) => (
            <button key={f}
              onClick={() => setFilter(f)}
              className='px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 hover:scale-105'
              style={{
                background: filter === f ? '#fff' : 'rgba(255,255,255,0.06)',
                color: filter === f ? '#000' : 'rgba(255,255,255,0.6)',
                fontFamily: 'Hanken Grotesk',
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        <div className='space-y-4'>
          {filteredPosts.map((post, i) => (
            <div key={post.id}
              className='p-5 rounded-2xl transition-all duration-200 hover:scale-[1.01] animate-fadeInUp'
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                animationDelay: `${i * 0.05}s`,
                opacity: 0,
                animation: `fadeInUp 0.3s ease ${i * 0.05}s forwards`,
              }}>

              {/* Post Header */}
              <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-3'>
                  {/* Avatar */}
                  <div className='w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0'
                    style={{ background: 'rgba(0,255,133,0.15)', color: '#00FF85', fontFamily: 'Syne' }}>
                    {post.username[0].toUpperCase()}
                  </div>
                  <div>
                    <button className='text-sm font-semibold hover:underline'
                      style={{ color: '#fff', fontFamily: 'Hanken Grotesk' }}>
                      @{post.username}
                    </button>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs' style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Hanken Grotesk' }}>
                        on
                      </span>
                      <span className='text-xs font-semibold'
                        style={{ color: '#00FF85', fontFamily: 'Hanken Grotesk' }}>
                        "{post.song}"
                      </span>
                    </div>
                  </div>
                </div>
                <span className='text-xs' style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Hanken Grotesk' }}>
                  {post.time}
                </span>
              </div>

              {/* Post Text */}
              <p className='text-sm leading-relaxed mb-4'
                style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'Hanken Grotesk' }}>
                {post.text}
              </p>

              {/* Actions */}
              <div className='flex items-center gap-4'>
                {/* Upvote */}
                <button
                  onClick={() => handleVote(post.id, 1)}
                  className='flex items-center gap-1 text-sm transition-all duration-200 hover:scale-110'
                  style={{
                    color: votedPosts[post.id] === 1 ? '#00FF85' : 'rgba(255,255,255,0.5)',
                    fontFamily: 'Hanken Grotesk',
                  }}>
                  ▲ <span className='font-semibold'>{post.votes}</span>
                </button>

                {/* Downvote */}
                <button
                  onClick={() => handleVote(post.id, -1)}
                  className='text-sm transition-all duration-200 hover:scale-110'
                  style={{
                    color: votedPosts[post.id] === -1 ? '#ff4444' : 'rgba(255,255,255,0.3)',
                  }}>
                  ▼
                </button>

                {/* Replies */}
                <button className='flex items-center gap-1 text-sm transition-colors hover:text-white'
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                  💬 {post.replies}
                </button>

                {/* Share */}
                <button className='text-sm transition-colors hover:text-white ml-auto'
                  style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Hanken Grotesk' }}>
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Community