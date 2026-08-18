import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiHeart, FiEye } from 'react-icons/fi'
import products from '../data/product'
import AddToCart from '../components/AddToCart'
import { useWishlist } from '../context/WishlistContext'

const categories = ['All', ...new Set(products.map((p) => p.category))]

export default function Menu() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const { toggleWishlist, isInWishlist } = useWishlist()

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section className='py-14 bg-coffee-cream min-h-screen'>
      <div className='max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-12'>
        <div className='text-center mb-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-coffee-brown'>
            Our <span className='text-coffee-orange'>Menu</span>
          </h1>
          <p className='mt-3 text-gray-500'>
            Freshly brewed coffee crafted for you.
          </p>
        </div>

        <div className='mb-8 space-y-4'>
          <div className='flex items-center gap-2 max-w-xl mx-auto border border-coffee-orange rounded-full bg-white px-4 py-2'>
            <FiSearch className='text-coffee-orange' />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your favorite coffee..."
              className="w-full outline-none bg-transparent text-coffee-brown placeholder-gray-400"
            />
          </div>

          <div className='flex flex-wrap justify-center gap-2'>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={
                  category === cat
                    ? 'px-4 py-2 rounded-full bg-coffee-orange text-white font-semibold'
                    : 'px-4 py-2 rounded-full border border-coffee-orange text-coffee-brown hover:bg-coffee-orange hover:text-white transition'
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p className='text-center text-gray-500 py-10'>
            No products found. Try a different search.
          </p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6'>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className='group relative p-4 border rounded-2xl border-coffee-caramel bg-white transition duration-300 hover:-translate-y-2 hover:border-coffee-orange hover:shadow-xl'
              >
                <button onClick={() => toggleWishlist(product)} aria-label={`Toggle ${product.name} in wishlist`} className={`absolute right-7 top-7 z-10 rounded-full p-2 shadow-sm transition ${isInWishlist(product.id) ? 'bg-coffee-orange text-white' : 'bg-white/90 text-coffee-brown hover:bg-coffee-orange hover:text-white'}`}>
                  <FiHeart fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>
                <Link to={`/product/${product.id}`} className='relative block overflow-hidden rounded-2xl'>
                  <img
                    className='w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110'
                    src={product.image}
                    alt={product.name}
                  />
                  <span className='absolute inset-0 flex items-center justify-center gap-2 bg-coffee-brown/55 text-sm font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'><FiEye /> Quick view</span>
                </Link>
                <div className='p-4'>
                  <h3 className='font-extrabold text-xl text-coffee-orange'>{product.name}</h3>
                  <p className='text-sm text-gray-500'>{product.description}</p>
                  <div className='flex items-center justify-between mt-3'>
                    <span className='text-coffee-orange font-bold text-xl'>${product.price.toFixed(2)}</span>
                    <AddToCart product={product} />
                  </div>
                  <Link
                    className='mt-3 block text-center bg-coffee-caramel px-3 py-2 rounded-2xl text-coffee-brown text-sm hover:bg-coffee-orange'
                    to={`/product/${product.id}`}
                  >
                    view details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
