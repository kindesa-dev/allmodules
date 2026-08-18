import { useCart } from '../context/CartContext'

 function AddToCart({product}) {


    const {addToCart} =useCart()

    function handleClick(){
        addToCart(product)
    }
  return (
    <button onClick={handleClick} 
    className='bg-coffee-orange px-2 py-1 text-white rounded-2xl text-sm hover:bg-coffee-brown'>
    Add to Cart
   </button>
  )
}
export default AddToCart

