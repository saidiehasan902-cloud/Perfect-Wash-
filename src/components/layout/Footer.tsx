/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, Facebook, Twitter, Instagram, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Perfect Wash</h3>
          </div>
          <p className="text-sm leading-relaxed max-w-xs font-medium">
            We Provide Top Quality Laundry Service In Cumilla! Experience the best home delivery garment care.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/18grJWwXCc/" target="_blank" rel="noreferrer" className="hover:text-sky-500 transition-colors">
              <Facebook className="w-5 h-5 cursor-pointer" />
            </a>
            <a href="https://wa.me/8801641419696" target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors">
              <MessageCircle className="w-5 h-5 cursor-pointer" />
            </a>
            <Instagram className="w-5 h-5 hover:text-pink-500 cursor-pointer transition-colors" />
            <Twitter className="w-5 h-5 hover:text-sky-400 cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Services</h4>
          <ul className="space-y-4 text-sm">
            <li className="hover:text-white cursor-pointer">Wash & Fold</li>
            <li className="hover:text-white cursor-pointer">Premium Ironing</li>
            <li className="hover:text-white cursor-pointer">Dry Cleaning</li>
            <li className="hover:text-white cursor-pointer">Express Delivery</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            <li className="hover:text-white cursor-pointer">Track Order</li>
            <li className="hover:text-white cursor-pointer">Pricing List</li>
            <li className="hover:text-white cursor-pointer">Outlet Locations</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-sky-500" />
              01641419696
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-green-500" />
              <span>WhatsApp: <a href="https://wa.me/8801641419696" className="hover:text-white underline decoration-sky-500/30">01641-419696</a></span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-sky-500" />
              perfectwash41@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-sky-500" />
              Darogabari Mor, Nanua Dighir Pashchimpar, Cumilla
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-gray-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Perfect Wash Management System. All rights reserved.</p>
      </div>
    </footer>
  );
}
