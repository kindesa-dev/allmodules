import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

export default function Contact() {
  return (
    <section className='py-14 bg-white'>
      <div className='max-w-6xl mx-auto px-4 text-center'>
        <h2 className='text-4xl md:text-5xl font-extrabold text-coffee-orange'>Contact Us</h2>
        <p className='mt-3 text-gray-500'>
          Have a question or feedback? We would love to hear from you.
        </p>
        <div className='mt-8 grid sm:grid-cols-3 gap-6'>
          <div className='bg-coffee-cream border border-coffee-caramel rounded-2xl p-6'>
            <FiMapPin className='mx-auto text-coffee-orange' size={28} />
            <p className='mt-3 font-semibold text-coffee-brown'>Location</p>
            <p className='mt-1 text-sm text-gray-500'>Maya, Adele</p>
          </div>
          <div className='bg-coffee-cream border border-coffee-caramel rounded-2xl p-6'>
            <FiPhone className='mx-auto text-coffee-orange' size={28} />
            <p className='mt-3 font-semibold text-coffee-brown'>Phone</p>
            <p className='mt-1 text-sm text-gray-500'>+251 912 345 678</p>
          </div>
          <div className='bg-coffee-cream border border-coffee-caramel rounded-2xl p-6'>
            <FiMail className='mx-auto text-coffee-orange' size={28} />
            <p className='mt-3 font-semibold text-coffee-brown'>Email</p>
            <p className='mt-1 text-sm text-gray-500'>info@hbsscoffee.com</p>
          </div>
        </div>
      </div>
    </section>
  )
}
