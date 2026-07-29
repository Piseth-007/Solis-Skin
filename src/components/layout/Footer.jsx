import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background */}

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl"></div>

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl"></div>

      <div className="relative">  
        {/* Footer */}

        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}

            <div>
              <h2 className="text-4xl font-bold text-rose-500">
                SOLIS SKIN
              </h2>

              <p className="mt-6 leading-8 text-gray-400">
                Discover premium skincare products from trusted brands around
                the world. Healthy skin starts with the right routine.
              </p>

              <div className="mt-8 flex gap-4">
                {[FaFacebookF, FaInstagram, FaYoutube, FaTiktok].map(
                  (Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-rose-500"
                    >
                      <Icon size={18} />
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Shop */}

            <div>
              <h3 className="mb-6 text-xl font-bold">Shop</h3>

              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link to="/shop?category=cleanser" className="hover:text-white">
                    Cleanser
                  </Link>
                </li>

                <li>
                  <Link to="/shop?category=serum" className="hover:text-white">
                    Serum
                  </Link>
                </li>

                <li>
                  <Link
                    to="/shop?category=sunscreen"
                    className="hover:text-white"
                  >
                    Sunscreen
                  </Link>
                </li>

                <li>
                  <Link
                    to="/shop?category=moisturizer"
                    className="hover:text-white"
                  >
                    Moisturizer
                  </Link>
                </li>

                <li>
                  <Link to="/shop" className="hover:text-white">
                    View All Products
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer */}

            <div>
              <h3 className="mb-6 text-xl font-bold">
                Customer Service
              </h3>

              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link to="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>

                <li>
                  <Link to="/shipping" className="hover:text-white">
                    Shipping
                  </Link>
                </li>

                <li>
                  <Link to="/returns" className="hover:text-white">
                    Returns
                  </Link>
                </li>

                <li>
                  <Link to="/privacy-policy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link to="/terms" className="hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}

            <div>
              <h3 className="mb-6 text-xl font-bold">Contact Us</h3>

              <div className="space-y-5 text-gray-400">
                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-1" />
                  <span>support@solisskin.com</span>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-1" />
                  <span>+855 12 345 678</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-1" />
                  <span>Phnom Penh, Cambodia</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <ShieldCheck size={18} className="text-green-400" />
                  Secure Checkout
                </div>

                <div className="flex items-center gap-3 text-gray-400">
                  <CreditCard size={18} className="text-rose-400" />
                  Visa • Mastercard • ABA • ACLEDA
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}

          <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 lg:flex-row">
            <p>
              © 2026 Solis Skin. All Rights Reserved.
            </p>

            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy
              </Link>

              <Link to="/terms" className="hover:text-white">
                Terms
              </Link>

              <Link to="/cookies" className="hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}