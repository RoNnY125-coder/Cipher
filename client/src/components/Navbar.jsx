import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'Home', path: '/', icon: '⌂' },
  { label: 'Search', path: '/search', icon: '⌕' },
  { label: 'Community', path: '/community', icon: '⊕' },
  { label: 'Profile', path: '/profile', icon: '◉' },
  { label: 'Subscription', path: '/subscription', icon: '◈' },
]

function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4'
      style={{ background: 'rgba(19,19,22,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Logo */}
      <Link to='/' className='text-white font-bold text-xl tracking-widest'
        style={{ fontFamily: 'Syne, sans-serif' }}>
        CIPHER
      </Link>

      {/* Nav Links */}
      <div className='flex items-center gap-2'>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className='px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200'
              style={{
                color: isActive ? '#000' : 'rgba(255,255,255,0.6)',
                background: isActive ? '#00FF85' : 'transparent',
                fontFamily: 'Hanken Grotesk, sans-serif',
              }}>
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* Right side */}
      <div className='flex items-center gap-4'>
        <span className='text-sm' style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Hanken Grotesk' }}>
          {user?.username}
        </span>
        <button
          onClick={logout}
          className='px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200'
          style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar