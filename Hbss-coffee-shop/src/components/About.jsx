export default function About() {
  return (
    <section className='py-14 bg-coffee-cream'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          <div>
            <h2 className='text-4xl md:text-5xl font-extrabold text-coffee-orange'>
              About <span className='text-coffee-brown'>Hbss</span>
            </h2>
            <p className='mt-4 text-gray-600 leading-relaxed'>
              Hbss Coffee Shop is built around one simple idea: fresh coffee,
              made fast and served with care. We brew every cup to order from
              freshly ground beans, so you always get a rich, aromatic
              experience in every sip.
            </p>
            <p className='mt-3 text-gray-600 leading-relaxed'>
              Order online, skip the line, and enjoy a smooth, premium coffee
              experience right from your screen.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-white border border-coffee-caramel rounded-2xl p-6 text-center'>
              <p className='text-4xl font-extrabold text-coffee-orange'>100%</p>
              <p className='mt-2 text-sm text-gray-500'>Freshly Ground Beans</p>
            </div>
            <div className='bg-white border border-coffee-caramel rounded-2xl p-6 text-center'>
              <p className='text-4xl font-extrabold text-coffee-orange'>10+</p>
              <p className='mt-2 text-sm text-gray-500'>Signature Drinks</p>
            </div>
            <div className='bg-white border border-coffee-caramel rounded-2xl p-6 text-center'>
              <p className='text-4xl font-extrabold text-coffee-orange'>Fast</p>
              <p className='mt-2 text-sm text-gray-500'>Quick Ordering</p>
            </div>
            <div className='bg-white border border-coffee-caramel rounded-2xl p-6 text-center'>
              <p className='text-4xl font-extrabold text-coffee-orange'>Free</p>
              <p className='mt-2 text-sm text-gray-500'>Delivery & Pickup</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
