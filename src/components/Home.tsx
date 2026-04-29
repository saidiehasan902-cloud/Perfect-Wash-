/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Shirt, CheckCircle, Clock, Truck, ShieldCheck, Star, Search, Facebook, MessageCircle } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { useState } from 'react';
import { BookingModal } from './BookingModal';
import { PRICING_DATA } from '../constants/pricing';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // Split pricing data into two columns for the rate card
  const midPoint = Math.ceil(PRICING_DATA.length / 2);
  const firstTableData = PRICING_DATA.slice(0, midPoint);
  const secondTableData = PRICING_DATA.slice(midPoint);
  const services = [
    {
      title: 'Wash & Fold',
      description: 'Daily wear cleaned with care and crisp folding.',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=2071&auto=format&fit=crop',
      icon: Shirt,
    },
    {
      title: 'Premium Iron',
      description: 'Steam pressing for that perfect sharp look.',
      image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?q=80&w=2070&auto=format&fit=crop',
      icon: ShieldCheck,
    },
    {
      title: 'Dry Clean',
      description: 'Special care for your delicate suits and gowns.',
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=2070&auto=format&fit=crop',
      icon: Star,
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:order-2 lg:text-right flex flex-col lg:items-end"
            >
              <div className="inline-flex flex-col items-end mb-8">
                <h2 className="font-black font-display leading-tight flex flex-col items-end">
                  <span className="text-5xl lg:text-8xl">
                    <span className="text-sky-400">পারফেক্ট</span> <span className="text-black">ওয়াশ</span>
                  </span>
                  <span className="text-3xl lg:text-5xl text-black mt-2">ড্রাই ক্লিনিং সার্ভিস</span>
                </h2>
                <a 
                  href="tel:01641419696"
                  className="text-xl lg:text-2xl font-black text-gray-400 mt-2 tracking-widest hover:text-sky-400 transition-colors"
                >
                  01641419696
                </a>
              </div>
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-sky-500 bg-sky-50 rounded-full w-fit">
                #1 HOME DELIVERY SERVICE IN CUMILLA
              </span>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                <span className="text-sky-500">Top Quality</span> Laundry Service In Cumilla
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-medium">
                We Provide Top Quality Laundry Service In Cumilla! Experience professional care, 24-hour turnaround, and free pickup.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="px-8 py-4 bg-sky-500 text-white font-bold rounded-2xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-200"
                >
                  Book a Wash Now
                </button>
                <button 
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gray-100 text-gray-900 font-bold rounded-2xl hover:bg-gray-200 transition-all"
                >
                  View Pricing
                </button>
              </div>
              <div className="mt-12 flex items-center gap-8 lg:justify-end">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-500">
                  <span className="text-gray-900 font-bold">Trusted by</span> thousand customers in Cumilla
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:order-1 flex items-center justify-center p-8"
            >
              <img 
                src="https://storage.googleapis.com/test-media-gen/c0683050-0eb5-43a9-95e5-f09c0ec90795.png" 
                alt="Perfect Wash Logo" 
                className="w-full max-w-lg h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="relative z-20 -mt-12 mb-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-2xl p-4 md:p-6 border border-gray-100"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-grow w-full relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter your Order ID (e.g. PW-12345)"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                />
              </div>
              <button className="w-full md:w-auto px-10 py-4 bg-sky-500 text-white font-bold rounded-2xl hover:bg-sky-600 transition-all whitespace-nowrap">
                Track Order
              </button>
            </div>
            <p className="mt-4 text-center md:text-left text-sm text-gray-500 px-2 font-medium">
              Check real-time status of your pickup or delivery.
            </p>
          </motion.div>
        </div>
      </section>
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 font-display">Our Professional Services</h2>
            <p className="text-lg text-gray-600">We handle everything from your daily t-shirts to your most expensive wedding attire with the same level of precision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                whileHover={{ y: -10 }}
                className="bg-white overflow-hidden rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm">
                    <service.icon className="w-6 h-6 text-sky-500" />
                  </div>
                </div>
                <div className="p-8 text-center flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed font-medium">{service.description}</p>
                </div>
                <div className="px-8 pb-8">
                  <button 
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full py-4 bg-sky-50 text-sky-600 font-bold rounded-2xl hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                  >
                    Select Service
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">Why <span className="text-sky-500">Perfect Wash</span>?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We take pride in every garment we handle, ensuring it returns to you in pristine condition.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              { title: 'Home Pickup & Delivery', desc: 'Book from app, we pick it up and deliver back at your doorstep.', icon: Truck },
              { title: 'Eco-Friendly Chemicals', desc: 'We only use non-toxic, fabric-friendly cleaning agents.', icon: ShieldCheck },
              { title: 'Expert Stain Removal', desc: 'Special techniques to remove the toughest stains safely.', icon: CheckCircle },
              { title: '24-Hour Fast Track', desc: 'Need it urgent? Get your clothes back in less than 24 hours.', icon: Clock },
            ].map((item) => (
              <div key={item.title} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-sky-500" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 font-display italic">Laundry <span className="text-sky-500">Rate Card</span></h1>
            <p className="text-lg text-gray-600">Clear and competitive pricing for all your garment care needs.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Table 1 - Left Column from Image */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-sky-500 text-white">
                      <th className="px-6 py-4 text-sm font-black uppercase tracking-wider">Clothing Item</th>
                      <th className="px-6 py-4 text-sm font-black uppercase tracking-wider text-center">Wash (৳)</th>
                      <th className="px-6 py-4 text-sm font-black uppercase tracking-wider text-center">Iron (৳)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {firstTableData.map((row) => (
                      <tr key={row.id} className="hover:bg-sky-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900">{row.name}</td>
                        <td className="px-6 py-4 text-center font-black text-sky-500">{row.washPrice}</td>
                        <td className="px-6 py-4 text-center font-medium text-gray-500">{row.ironPrice || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2 - Right Column from Image */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-sky-500 text-white">
                      <th className="px-6 py-4 text-sm font-black uppercase tracking-wider">Clothing Item</th>
                      <th className="px-6 py-4 text-sm font-black uppercase tracking-wider text-center">Wash (৳)</th>
                      <th className="px-6 py-4 text-sm font-black uppercase tracking-wider text-center">Iron (৳)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {secondTableData.map((row) => (
                      <tr key={row.id} className="hover:bg-sky-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900">{row.name}</td>
                        <td className="px-6 py-4 text-center font-black text-sky-500">{row.washPrice}</td>
                        <td className="px-6 py-4 text-center font-medium text-gray-500">{row.ironPrice || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col md:flex-row gap-6">
            <a 
              href="tel:01641419696"
              className="flex-1 text-center p-8 bg-sky-500 rounded-3xl text-white hover:bg-sky-600 transition-all shadow-lg block"
            >
              <p className="text-xl font-bold mb-2 uppercase tracking-widest">Call for pickup</p>
              <p className="text-4xl font-black italic">01641-419696</p>
            </a>
            <div className="flex flex-col gap-4">
              <a 
                href="https://wa.me/8801641419696"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-green-500 text-white px-8 py-5 rounded-3xl font-bold hover:bg-green-600 transition-all shadow-lg"
              >
                <div className="p-2 bg-white/20 rounded-xl">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span>Chat on WhatsApp</span>
              </a>
              <a 
                href="https://www.facebook.com/share/18grJWwXCc/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-[#1877F2] text-white px-8 py-5 rounded-3xl font-bold hover:opacity-90 transition-all shadow-lg"
              >
                <div className="p-2 bg-white/20 rounded-xl">
                  <Facebook className="w-6 h-6" />
                </div>
                <span>Visit Facebook Page</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-sky-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-8">Ready for a Cleaner Wardrobe?</h2>
          <p className="text-xl text-sky-50 mb-12">Join thousands of customers who trust us with their clothes every single day.</p>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="px-12 py-5 bg-white text-sky-500 font-bold rounded-2xl hover:bg-sky-50 transition-all text-lg shadow-xl"
          >
            Schedule Your Pickup Now
          </button>
        </div>
      </section>

      <AnimatePresence>
        {isBookingOpen && (
          <BookingModal 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
