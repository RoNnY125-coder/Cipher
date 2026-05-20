import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

      login(data)
      navigate('/')
    } catch (err) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center'>
      <div className='w-full max-w-md p-8 bg-zinc-900 rounded-2xl'>
        <h1 className='text-3xl font-bold text-white mb-2'>Join Cipher</h1>
        <p className='text-zinc-400 mb-8'>Create your account</p>

        {error && (
          <div className='bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='text-zinc-400 text-sm mb-1 block'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white/20'
              placeholder='yourciphername'
              required
            />
          </div>

          <div>
            <label className='text-zinc-400 text-sm mb-1 block'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white/20'
              placeholder='you@example.com'
              required
            />
          </div>

          <div>
            <label className='text-zinc-400 text-sm mb-1 block'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full bg-zinc-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-white/20'
              placeholder='••••••••'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 transition disabled:opacity-50'
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className='text-zinc-400 text-center mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-white hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup