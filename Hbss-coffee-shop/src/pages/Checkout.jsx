import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import { useToast } from '../context/ToastContext'

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validateForm(form) {
  const errors = {}
  if (!form.name.trim()) {
    errors.name = 'Full name is required'
  }
  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(form.email)) {
    errors.email = 'Please enter a valid email address'
  }
  if (!form.address.trim()) {
    errors.address = 'Delivery address is required'
  }
  return errors
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const { createOrder } = useOrders()
  const { success } = useToast()
  const [placed, setPlaced] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', address: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [paymentMethod, setPaymentMethod] = useState(user?.paymentMethods?.find((method) => method.isDefault)?.id || 'telebirr')
  const savedMethods = user?.paymentMethods || []
  const selectedSavedMethod = savedMethods.find((method) => method.id === Number(paymentMethod) || method.id === paymentMethod)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const newErrors = validateForm({ ...form, [name]: value })
      setErrors(newErrors)
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const newErrors = validateForm({ ...form, [name]: value })
    setErrors(newErrors)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validateForm(form)
    setErrors(newErrors)
    setTouched({ name: true, email: true, address: true })
    if (Object.keys(newErrors).length === 0) {
      createOrder({
        userId: user.id,
        items: cartItems,
        subtotal: cartTotal,
        shipping: 0,
        tax: 0,
        total: cartTotal,
        shippingAddress: { name: form.name, address: form.address, city: '', state: '', zip: '' },
        paymentMethod: selectedSavedMethod
          ? { type: selectedSavedMethod.type || 'card', brand: selectedSavedMethod.brand, last4: selectedSavedMethod.last4 }
          : { type: paymentMethod },
      })
      clearCart()
      setPlaced(true)
      success('Your order has been placed')
    }
  }

  const isFormValid = form.name.trim() && form.email.trim() && validateEmail(form.email) && form.address.trim()

  if (placed) {
    return (
      <div className='max-w-6xl mx-auto px-4 py-20 text-center'>
        <h1 className='text-4xl font-bold text-coffee-orange'>Order Placed!</h1>
        <p className='mt-4 text-gray-500'>
          Thank you, {form.name || 'friend'}. Your order is being prepared.
        </p>
        <Link
          to="/menu"
          className='mt-6 inline-block px-6 py-3 bg-coffee-orange text-white font-bold rounded-lg hover:bg-coffee-brown'
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className='max-w-6xl mx-auto px-4 py-20 text-center'>
        <h1 className='text-4xl font-bold text-coffee-orange'>Your cart is empty</h1>
        <Link
          to="/menu"
          className='mt-6 inline-block px-6 py-3 border border-coffee-orange text-coffee-orange rounded-lg hover:bg-coffee-brown'
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className='max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-12 py-14'>
      <h1 className='text-4xl text-center font-bold text-coffee-orange py-6 px-4'>Checkout</h1>
      <div className='grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_28rem]'>
        <form onSubmit={handleSubmit} className='bg-white border border-coffee-orange rounded-2xl p-6 space-y-4' noValidate>
          <div>
            <label className='block text-sm font-semibold text-coffee-brown mb-1'>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your name"
              className={`w-full border rounded-lg px-4 py-2 outline-none focus:border-coffee-orange transition ${
                errors.name && touched.name
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-coffee-caramel'
              }`}
              aria-invalid={errors.name && touched.name ? 'true' : 'false'}
              aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
            />
            {errors.name && touched.name && (
              <p id="name-error" className='mt-1 text-sm text-red-500'>{errors.name}</p>
            )}
          </div>
          <fieldset>
            <legend className='block text-sm font-semibold text-coffee-brown mb-2'>Payment Method</legend>
            <div className='grid gap-2'>
              {savedMethods.map((method) => (
                <label key={method.id} className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer ${String(paymentMethod) === String(method.id) ? 'border-coffee-orange bg-coffee-cream' : 'border-coffee-caramel'}`}>
                  <input type="radio" name="paymentMethod" value={method.id} checked={String(paymentMethod) === String(method.id)} onChange={(event) => setPaymentMethod(event.target.value)} />
                  <span className='font-medium text-coffee-brown'>{method.type === 'card' || !method.type ? method.brand : method.type === 'cbe' ? 'CBE' : method.type === 'awash' ? 'Awash Bank' : method.type === 'rammis' ? 'Rammis Bank' : 'Telebirr'} ending in {method.last4}</span>
                </label>
              ))}
              {[['telebirr', 'Telebirr'], ['cbe', 'CBE Bank Transfer'], ['awash', 'Awash Bank Transfer'], ['rammis', 'Rammis Bank Transfer']].map(([value, label]) => (
                <label key={value} className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer ${paymentMethod === value ? 'border-coffee-orange bg-coffee-cream' : 'border-coffee-caramel'}`}>
                  <input type="radio" name="paymentMethod" value={value} checked={paymentMethod === value} onChange={(event) => setPaymentMethod(event.target.value)} />
                  <span className='font-medium text-coffee-brown'>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label className='block text-sm font-semibold text-coffee-brown mb-1'>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@email.com"
              className={`w-full border rounded-lg px-4 py-2 outline-none focus:border-coffee-orange transition ${
                errors.email && touched.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-coffee-caramel'
              }`}
              aria-invalid={errors.email && touched.email ? 'true' : 'false'}
              aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
            />
            {errors.email && touched.email && (
              <p id="email-error" className='mt-1 text-sm text-red-500'>{errors.email}</p>
            )}
          </div>
          <div>
            <label className='block text-sm font-semibold text-coffee-brown mb-1'>Delivery Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="3"
              placeholder="Your address"
              className={`w-full border rounded-lg px-4 py-2 outline-none focus:border-coffee-orange transition ${
                errors.address && touched.address
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-coffee-caramel'
              }`}
              aria-invalid={errors.address && touched.address ? 'true' : 'false'}
              aria-describedby={errors.address && touched.address ? 'address-error' : undefined}
            ></textarea>
            {errors.address && touched.address && (
              <p id="address-error" className='mt-1 text-sm text-red-500'>{errors.address}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full px-6 py-3 rounded-lg font-bold transition ${
              isFormValid
                ? 'bg-coffee-orange text-white hover:bg-coffee-brown'
                : 'bg-coffee-caramel text-coffee-brown cursor-not-allowed'
            }`}
          >
            Place Order
          </button>
        </form>

        <div className='h-fit bg-coffee-cream border border-coffee-orange rounded-lg p-6 lg:sticky lg:top-8'>
          <h2 className='text-xl font-bold text-coffee-brown mb-4'>Order Summary</h2>
          <div className='space-y-3'>
            {cartItems.map((item) => (
              <div key={item.id} className='flex justify-between text-sm'>
                <span className='text-gray-600'>
                  {item.name} <span className='text-gray-400'>x{item.quantity}</span>
                </span>
                <span className='font-semibold'>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className='flex justify-between border-t border-coffee-orange pt-3 mt-3'>
            <span className='text-lg font-bold'>Total</span>
            <span className='text-2xl font-bold text-coffee-orange'>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
