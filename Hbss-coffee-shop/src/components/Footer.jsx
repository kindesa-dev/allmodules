import { Link} from "react-router-dom";
import icon from "../assets/icon.png";


function Footer () {
    return (
        <div>
            <footer className="bg-coffee-brown text-white p-4">
                <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-12 grid gap-8 md:grid-cols-3 lg:gap-16">
                    <div>
                                                <h3 className="font-semibold text-lg">
                                                    <img src={icon} alt="Hbss icon" className="w-5 h-5 inline-block mr-2" />
                                                    <span className="text-coffee-orange">Hbss </span>Coffee Shop
                                                </h3>
                        <p className="mt-3 text-white/80">Fresh Coffee, Snacks, and simple online ordering  experience.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Quick Links</h4>
                        <ul className="mt-2 space-y-2 text-white/80">
                            <li><Link to="/menu" className="hover:text-white">Menu</Link></li>
                             <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
                             <li><Link to="/checkout" className="hover:text-white">Checkout</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">Contact</h4>
                        <ul className="mt-2 text-white/80">
                            <li>📍 Maya,Adele</li>
                            <li>📞 +251 912 345 678</li>
                            <li>✉️ Info@hbsscoffee.com</li>
                            </ul>
                    </div>
                </div>
                <div className="mt-6 border-t border-white/20 flex-col items-center">
                <p className="text-white/70 text-sm mt-4 text-center">
                    &copy; {new Date ().getFullYear()} Hbss Coffee Shop. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};
export default Footer;
