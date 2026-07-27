import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";

import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-rose-500">SOLIS SKIN</h2>

            <p className="mt-6 leading-8 text-gray-400">
              Premium skincare products designed to help everyone achieve
              healthy, glowing skin.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6">Shop</h3>

            <ul className="space-y-4 text-gray-400">
              <li>Cleanser</li>
              <li>Serum</li>
              <li>Sunscreen</li>
              <li>Moisturizer</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6">Customer Service</h3>

            <ul className="space-y-4 text-gray-400">
              <li>FAQ</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6">Contact</h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex gap-3">
                <Mail size={18} />
                support@solisskin.com
              </div>

              <div className="flex gap-3">
                <Phone size={18} />
                +855 12 345 678
              </div>

              <div className="flex gap-3">
                <MapPin size={18} />
                Phnom Penh, Cambodia
              </div>
            </div>

            <div className="mt-8 flex gap-5">
              <div className="mt-8 flex gap-4">
                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-rose-500"
                >
                  <FaFacebookF size={18} />
                </a>

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-rose-500"
                >
                  <FaInstagram size={18} />
                </a>

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-rose-500"
                >
                  <FaYoutube size={18} />
                </a>

                <a
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-rose-500"
                >
                  <FaTiktok size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-gray-500">
          © 2026 Solis Skin. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
