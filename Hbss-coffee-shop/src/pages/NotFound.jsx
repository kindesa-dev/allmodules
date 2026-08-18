import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='max-w-6xl mx-auto px-4 py-20 text-center'>
      <h1 className='text-6xl font-bold text-coffee-orange'>404</h1>
      <p className='mt-4 text-xl text-gray-500'>Page Not Found</p>
      <p className='mt-2 text-gray-400'>The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className='mt-6 inline-block px-6 py-3 bg-coffee-orange text-white font-bold rounded-lg hover:bg-coffee-brown transition'
      >
        Back to Home
      </Link>
    </div>
  )
}