import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { FiHeart, FiTrash2 } from "react-icons/fi";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { success } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product);
    success(`${product.name} added to cart`);
  };

  const handleMoveToCart = (product) => {
    handleAddToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlistCount === 0) {
    return (
      <div className="text-center py-16">
        <FiHeart className="mx-auto text-coffee-orange opacity-50" size={64} />
        <h3 className="mt-4 text-xl font-bold text-coffee-brown">Your wishlist is empty</h3>
        <p className="mt-2 text-gray-500">Save items you love for later</p>
        <Link
          to="/menu"
          className="mt-6 inline-block px-6 py-3 bg-coffee-orange text-white font-bold rounded-lg hover:bg-coffee-brown"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-coffee-brown">Wishlist ({wishlistCount} items)</h2>
        <button
          onClick={clearWishlist}
          className="text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div key={product.id} className="p-4 border rounded-2xl border-coffee-caramel bg-white hover:shadow-lg transition relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFromWishlist(product.id);
              }}
              className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition z-10"
              aria-label="Remove from wishlist"
            >
              <FiTrash2 size={18} />
            </button>

            <Link to={`/product/${product.id}`} className="block">
              <img
                className="rounded-2xl w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                src={product.image}
                alt={product.name}
              />
            </Link>

            <div className="p-4">
              <h3 className="font-extrabold text-xl text-coffee-orange">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-coffee-orange font-bold text-xl">${product.price.toFixed(2)}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMoveToCart(product);
                  }}
                  className="bg-coffee-orange px-3 py-1 text-white rounded-xl text-sm hover:bg-coffee-brown transition"
                >
                  Add to Cart
                </button>
              </div>
              <Link
                className="mt-3 block text-center bg-coffee-caramel px-3 py-2 rounded-2xl text-coffee-brown text-sm hover:bg-coffee-orange"
                to={`/product/${product.id}`}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
