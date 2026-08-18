import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import products from '../data/product'
import AddToCart from '../components/AddToCart'

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className='max-w-6xl mx-auto px-4 py-20 text-center'>
        <h1 className='text-4xl font-bold text-coffee-brown'>Product not found</h1>
        <Link
          to="/menu"
          className='mt-6 inline-block px-6 py-3 border border-coffee-orange text-coffee-orange rounded-lg hover:bg-coffee-brown'
        >
          Back to Menu
        </Link>
      </div>
    )
  }

  return (
    <section className='py-14 bg-coffee-cream min-h-screen'>
      <div className='max-w-6xl mx-auto px-4'>
        <Link
          to="/menu"
          className='inline-flex items-center gap-2 text-coffee-brown hover:text-coffee-orange font-semibold mb-6'
        >
          <FiArrowLeft /> Back to Menu
        </Link>
        <div className='grid md:grid-cols-2 gap-8 items-center bg-white border border-coffee-caramel rounded-2xl p-6'>
          <div>
            <img
              className='rounded-2xl w-full h-80 md:h-96 object-cover'
              src={product.image}
              alt={product.name}
            />
          </div>
          <div>
            <p className='text-coffee-orange font-semibold uppercase tracking-wide'>
              {product.category}
            </p>
            <h1 className='mt-2 text-4xl font-extrabold text-coffee-brown'>{product.name}</h1>
            <p className='mt-4 text-gray-500 leading-relaxed'>{product.description}</p>
            <p className='mt-4 text-3xl font-bold text-coffee-orange'>
              ${product.price.toFixed(2)}
            </p>
            <div className='mt-6'>
              <AddToCart product={product} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
