import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className='min-h-screen' style={{ background: '#131316' }}>
      <Navbar />
      <div className='pt-20 px-8'>
        <h1 className='text-white text-4xl font-bold mt-8'>
          Welcome to Cipher
        </h1>
      </div>
    </div>
  )
}

export default Home