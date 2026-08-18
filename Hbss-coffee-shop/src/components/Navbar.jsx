import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import icon from "../assets/icon.png";
import { FiShoppingCart, FiMenu, FiX, FiUser, FiHeart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-coffee-orange font-semibold underline underline-offset-4 decoration-2 decoration-coffee-orange"
      : "text-coffee-brown hover:text-coffee-orange";

  return (
    <>
      <header className="bg-coffee-cream border-b border-coffee-orange">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src={icon} alt="Hbss icon" className="w-6 h-6 inline-block" />
              <span className="font-bold text-lg text-coffee-brown tracking-tight">Hbss</span>
              <span className="text-coffee-orange font-bold">Coffee Shop</span>
            </Link>

            <nav className="md:flex hidden gap-6">
              <NavLink to="/" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/menu" className={linkClass}>
                Menu
              </NavLink>
            </nav>

            <div className="flex items-center gap-4">
              <Link to="/cart" className="text-coffee-brown relative hover:text-coffee-orange font-bold">
                <FiShoppingCart size={34} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 right-0 h-5 px-1 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm">
                    {cartCount}
                  </span>
                )}
              </Link>
               <Link to={isAuthenticated ? "/account/wishlist" : "/wishlist"} className="hidden text-coffee-brown relative hover:text-coffee-orange md:block" aria-label="Wishlist">
                 <FiHeart size={25} />
                 {wishlistCount > 0 && (
                   <span className="absolute -top-2 right-0 h-5 px-1 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm">
                     {wishlistCount}
                   </span>
                 )}
               </Link>
               <Link to={isAuthenticated ? "/account" : "/signin"} className="hidden text-coffee-brown hover:text-coffee-orange md:block" aria-label="Account">
                <FiUser size={25} />
              </Link>

              <div>
                <button
                  className="md:hidden flex justify-center text-coffee-brown"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {open && (
            <div className="md:hidden">
              <nav className="flex flex-col p-4 gap-2">
                <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
                  Home
                </NavLink>
                <NavLink to="/menu" className={linkClass} onClick={() => setOpen(false)}>
                  Menu
                </NavLink>
                <NavLink to={isAuthenticated ? "/account" : "/signin"} className={linkClass} onClick={() => setOpen(false)}>
                  {isAuthenticated ? "Account" : "Sign in"}
                </NavLink>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
