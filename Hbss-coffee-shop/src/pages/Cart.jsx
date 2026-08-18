import { useCart } from '../context/CartContext';
import { FiPlus, FiMinus,FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Cart() {
    const {cartItems,removeFromCart,increaseQuantity,decreaseQuantity,cartCount,cartTotal} = useCart();
    if (cartItems.length===0){
        return(
            <div className='max-w-6xl mx-auto px-4 py-14'>
                <h1 className='text-4xl text-center font-bold text-coffee-orange py-6 px-4'>Your  cart is Empty</h1>
                <Link to="/menu" className='mt-6 block px-6 py-3 border border-coffee-orange text-coffee-orange rounded-lg text-center hover:bg-coffee-brown'>
                Continue Shopping </Link>
            </div>
        )
    }
  return (
    <div className='max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-12 py-14'>
        <h1 className='text-4xl text-center font-bold text-coffee-orange py-6 px-4'>Shopping Cart</h1>
    <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_25rem]'>
    <div className='space-y-4'>
   {
      cartItems.map(item =>(
        <div key={item.id} className='flex flex-wrap items-center gap-4 border border-coffee-orange rounded-2xl bg-white p-4 sm:flex-nowrap lg:p-5'>
            <img src={item.image} alt={item.name}
            className='w-24 h-24 object-cover rounded-lg' />
            <div className='flex-1'>
                <h3 className='font-bold text-lg text-coffee-brown'>{item.name}</h3>
                <p className='text-sm text-gray-500'>{item.description}</p>
                <p className='text-coffee-orange font-bold mt-2 text-lg'>${item.price.toFixed(2)}</p>
            </div>
            <div className='ml-auto flex items-center gap-2 bg-gray-200 p-1 rounded-lg sm:ml-0'>
                <button onClick={()=> decreaseQuantity(item.id)}
                 className='p-2 hover:bg-gray-400 rounded-lg transition'>
              <FiMinus />
                </button>
                <span>{item.quantity}</span>
                
              
        
              <button onClick={()=>increaseQuantity(item.id)}
               className='p-2 hover:bg-gray-400 rounded-lg transition'>
                <FiPlus />
                </button>
                <button onClick={()=>removeFromCart(item.id)}
                 className='p-2 text-red-600 hover:bg-red-500 hover:text-white rounded-lg'>
                    <FiTrash2 />
                </button>
                
            </div>

        </div>
      ))
   }
    </div>
    <div className='h-fit bg-coffee-cream border border-coffee-orange rounded-lg p-6 lg:sticky lg:top-8'>
        <div className='space-y-3 mb-4'>
            <div className='flex justify-between'>
                <span className='text-gray-500 '>Subtotal {cartCount} Items</span>
                <span className='font-bold'>${cartTotal.toFixed(2)}</span>
            </div>
            <div  className='flex justify-between'>
                <span className='text-gray-700 '>Shipping</span>
                <span className='font-bold'>Free</span>
            </div>
            <div  className='flex justify-between border-t border-coffee-orange pt-3'>
                <span className='text-lg font-bold '>Total</span>
                <span className='text-2xl font-bold text-coffee-orange'>${cartTotal.toFixed(2)}</span>
            </div>
        </div>
        <Link to="/checkout" className='w-full block text-center px-6 py-3 bg-coffee-orange text-white font-bold rounded-lg hover:bg-coffee-brown transition'>
        Proceed to Checkout
        </Link>
        <Link to="/menu" className='w-full border border-coffee-orange block bg-white px-6 py-3 mt-4 rounded-lg text-center font-bold text-coffee-orange hover:bg-coffee-caramel'>
        Continue Shopping
        </Link>
    </div>
    </div>
    </div>
  )
}
