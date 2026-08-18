
import { Link } from 'react-router-dom'
import heroImage from "./../assets/hero.webp"
import icon from "./../assets/icon.png"

export default function Hero() {
  return (
    <section className='bg-gradient-to-b from-coffee-cream to-white lg:min-h-[calc(100vh-73px)] lg:flex lg:items-center'>
        <div className='max-w-screen-2xl w-full mx-auto py-16 px-6 lg:px-10 xl:px-16 grid md:grid-cols-2 items-center gap-10 lg:gap-20'>
            <div className='lg:pl-6 xl:pl-12'>
                                <p className='bg-coffee-orange inline-flex items-center px-6 py-2 rounded-full text-sm text-white'>
                                    <img src={icon} alt="coffee" className='w-4 h-4 inline-block mr-2' />
                                    Fresh, Fast, Order
                                </p>
                <h1 className='mt-4 text-4xl font-extrabold text-coffee-brown tracking-tight md:text-5xl'>Fresh coffee from {""} <span className='text-coffee-orange'>Hbss </span>coffee shop</h1>
                <p className='mt-4'>Order your favorite coffee and snacks online.Simple menu, quick checkout,and smooth ordering experience.</p>
            <div className='flex mt-4 gap-2 items-center'>
                <Link to="/menu"
                 className='bg-coffee-orange py-2 px-6 rounded-full hover:bg-coffee-brown hover:text-coffee-orange'>Explore Menu</Link>
                <Link  to="/cart"
                className='py-2 px-6 border border-coffee-orange rounded-full hover:border-coffee-brown hover:text-coffee-brown'>View Cart</Link>
            </div>
            </div>
            <div className='md:self-stretch lg:flex lg:items-center'>
                <img src={heroImage} alt="Freshly prepared coffee" className='w-full max-h-[620px] object-cover md:rounded-l-[3rem] lg:rounded-l-[5rem]'/>
            </div>
        </div>
    </section>
  )
}
