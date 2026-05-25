import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const freeFeatures = [
  { text: 'Browse all songs and albums', included: true },
  { text: 'Read all comments and threads', included: true },
  { text: '3 comments per day', included: true },
  { text: 'Join discussion threads', included: false },
  { text: 'Create discussion threads', included: false },
  { text: 'Hero Screen', included: false },
  { text: 'Custom profile themes', included: false },
  { text: 'Unlimited comments', included: false },
]

const paidFeatures = [
  { text: 'Browse all songs and albums', included: true },
  { text: 'Read all comments and threads', included: true },
  { text: 'Unlimited comments', included: true },
  { text: 'Join discussion threads', included: true },
  { text: 'Create discussion threads', included: true },
  { text: 'Hero Screen', included: true },
  { text: 'Custom profile themes', included: true },
  { text: 'Priority support', included: true },
]

function Subscription() {
  const { user } = useAuth()
  const [billing, setBilling] = useState('monthly')

  const price = billing === 'monthly' ? '249' : '199'

  return (
    <div className='min-h-screen' style={{ background: '#131316' }}>
      <Navbar />

      <div className='pt-24 px-8 max-w-5xl mx-auto pb-16'>

        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-white font-black text-4xl mb-4'
            style={{ fontFamily: 'Syne', letterSpacing: '-0.02em' }}>
            Unlock the full frequency
          </h1>
          <p className='text-sm max-w-md mx-auto'
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Hanken Grotesk' }}>
            Upgrade to Pro and get unlimited access to everything Cipher has to offer
          </p>

          {/* Billing Toggle */}
          <div className='flex items-center justify-center gap-3 mt-8'>
            <button
              onClick={() => setBilling('monthly')}
              className='px-5 py-2 rounded-full text-sm font-medium transition-all duration-200'
              style={{
                background: billing === 'monthly' ? '#fff' : 'rgba(255,255,255,0.06)',
                color: billing === 'monthly' ? '#000' : 'rgba(255,255,255,0.6)',
                fontFamily: 'Hanken Grotesk',
              }}>
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className='px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2'
              style={{
                background: billing === 'yearly' ? '#fff' : 'rgba(255,255,255,0.06)',
                color: billing === 'yearly' ? '#000' : 'rgba(255,255,255,0.6)',
                fontFamily: 'Hanken Grotesk',
              }}>
              Yearly
              <span className='px-2 py-0.5 rounded-full text-xs font-bold'
                style={{
                  background: billing === 'yearly' ? 'rgba(0,255,133,0.2)' : 'rgba(0,255,133,0.15)',
                  color: '#00FF85',
                }}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

          {/* Free Plan */}
          <div className='p-8 rounded-2xl'
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: user?.plan === 'free'
                ? '1px solid rgba(255,255,255,0.3)'
                : '1px solid rgba(255,255,255,0.08)',
            }}>

            <div className='mb-6'>
              <div className='flex items-center justify-between mb-2'>
                <h2 className='text-white font-bold text-xl' style={{ fontFamily: 'Syne' }}>
                  Free
                </h2>
                {user?.plan === 'free' && (
                  <span className='px-3 py-1 rounded-full text-xs font-bold'
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.6)',
                      fontFamily: 'Hanken Grotesk',
                    }}>
                    Current Plan
                  </span>
                )}
              </div>
              <div className='flex items-end gap-1'>
                <span className='text-4xl font-black text-white' style={{ fontFamily: 'Syne' }}>
                  ₹0
                </span>
                <span className='text-sm mb-2' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                  /forever
                </span>
              </div>
            </div>

            {/* Features */}
            <div className='space-y-3 mb-8'>
              {freeFeatures.map((feature, i) => (
                <div key={i} className='flex items-center gap-3'>
                  <span className='text-sm flex-shrink-0'
                    style={{ color: feature.included ? '#00FF85' : 'rgba(255,255,255,0.2)' }}>
                    {feature.included ? '✓' : '✕'}
                  </span>
                  <span className='text-sm'
                    style={{
                      color: feature.included ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)',
                      fontFamily: 'Hanken Grotesk',
                      textDecoration: feature.included ? 'none' : 'line-through',
                    }}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <button
              disabled={user?.plan === 'free'}
              className='w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200'
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Hanken Grotesk',
                cursor: user?.plan === 'free' ? 'not-allowed' : 'pointer',
              }}>
              {user?.plan === 'free' ? 'Current Plan' : 'Downgrade'}
            </button>
          </div>

          {/* Paid Plan */}
          <div className='p-8 rounded-2xl relative overflow-hidden'
            style={{
              background: 'rgba(0,255,133,0.05)',
              border: user?.plan === 'paid'
                ? '1px solid rgba(0,255,133,0.6)'
                : '1px solid rgba(0,255,133,0.25)',
            }}>

            {/* Glow effect */}
            <div className='absolute top-0 right-0 w-64 h-64 pointer-events-none'
              style={{
                background: 'radial-gradient(circle, rgba(0,255,133,0.08) 0%, transparent 70%)',
              }} />

            {/* Popular badge */}
            <div className='absolute top-4 right-4'>
              <span className='px-3 py-1 rounded-full text-xs font-bold'
                style={{
                  background: '#00FF85',
                  color: '#000',
                  fontFamily: 'Hanken Grotesk',
                }}>
                MOST POPULAR
              </span>
            </div>

            <div className='mb-6'>
              <div className='flex items-center justify-between mb-2'>
                <h2 className='text-white font-bold text-xl' style={{ fontFamily: 'Syne' }}>
                  Pro
                </h2>
                {user?.plan === 'paid' && (
                  <span className='px-3 py-1 rounded-full text-xs font-bold'
                    style={{
                      background: 'rgba(0,255,133,0.15)',
                      color: '#00FF85',
                      fontFamily: 'Hanken Grotesk',
                    }}>
                    Current Plan
                  </span>
                )}
              </div>
              <div className='flex items-end gap-1'>
                <span className='text-4xl font-black text-white' style={{ fontFamily: 'Syne' }}>
                  ₹{price}
                </span>
                <span className='text-sm mb-2' style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Hanken Grotesk' }}>
                  /{billing === 'monthly' ? 'month' : 'month, billed yearly'}
                </span>
              </div>
            </div>

            {/* Features */}
            <div className='space-y-3 mb-8'>
              {paidFeatures.map((feature, i) => (
                <div key={i} className='flex items-center gap-3'>
                  <span className='text-sm flex-shrink-0' style={{ color: '#00FF85' }}>✓</span>
                  <span className='text-sm'
                    style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Hanken Grotesk' }}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <button
              disabled={user?.plan === 'paid'}
              className='w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg'
              style={{
                background: user?.plan === 'paid' ? 'rgba(0,255,133,0.3)' : '#00FF85',
                color: '#000',
                fontFamily: 'Hanken Grotesk',
                cursor: user?.plan === 'paid' ? 'not-allowed' : 'pointer',
                boxShadow: user?.plan !== 'paid' ? '0 0 20px rgba(0,255,133,0.3)' : 'none',
              }}>
              {user?.plan === 'paid' ? 'Current Plan' : 'Upgrade to Pro'}
            </button>
          </div>
        </div>

        {/* Bottom note */}
        <p className='text-center text-xs mt-8'
          style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Hanken Grotesk' }}>
          Cancel anytime. No hidden fees. Secure payment powered by Stripe.
        </p>

      </div>
    </div>
  )
}

export default Subscription