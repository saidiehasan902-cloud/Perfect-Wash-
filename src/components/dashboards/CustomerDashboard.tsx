/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Package, Clock, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../lib/utils';
import { OrderStatus, ServiceType } from '../../types';
import { BookingModal } from '../BookingModal';

export default function CustomerDashboard() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [orders] = useState([
    {
      id: 'PW-82731',
      status: OrderStatus.WASH_PROCESSING,
      serviceType: ServiceType.WASH,
      totalPrice: 450,
      createdAt: Date.now() - 86400000,
      outletName: 'Banani Branch',
      items: [
        { name: 'Shirt', quantity: 2, pricePerUnit: 50 },
        { name: 'Pant', quantity: 3, pricePerUnit: 50 },
        { name: 'Saree', quantity: 1, pricePerUnit: 200 }
      ],
      pickupTime: Date.now() - 90000000,
      deliveryTime: Date.now() + 86400000,
      address: 'House 12, Road 5, Banani, Cumilla'
    },
    {
      id: 'PW-82612',
      status: OrderStatus.DELIVERED,
      serviceType: ServiceType.IRON,
      totalPrice: 120,
      createdAt: Date.now() - 172800000,
      outletName: 'Gulshan Branch',
      items: [
        { name: 'Panjabi', quantity: 1, pricePerUnit: 80 },
        { name: 'Pajama', quantity: 1, pricePerUnit: 40 }
      ],
      pickupTime: Date.now() - 180000000,
      deliveryTime: Date.now() - 100000000,
      address: 'Mansion 4, Sector 7, Cumilla'
    }
  ]);

  const stats = [
    { label: 'Active Orders', value: '1', icon: Package, color: 'text-sky-500', bg: 'bg-sky-50' },
    { label: 'Total Spent', value: '৳570', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pending Pickups', value: '0', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Welcome Back, User</h1>
            <p className="text-gray-500 font-medium mt-1">Manage your laundry and track active orders.</p>
          </div>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-sky-500 text-white font-bold rounded-2xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-100"
          >
            <Plus className="w-5 h-5" />
            Place New Order
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className={`p-4 ${stat.bg} rounded-2xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Active Orders */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Recent Orders
              <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">{orders.length}</span>
            </h2>
            
            <div className="space-y-4">
              {orders.map((order) => {
                const isExpanded = expandedOrderId === order.id;
                
                return (
                  <motion.div 
                    key={order.id}
                    layout
                    initial={false}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <div 
                      className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                    >
                      <div className="flex items-center gap-5">
                        <div className="p-4 bg-gray-50 rounded-2xl">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-gray-900">{order.id}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                              order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-700' : 
                              order.status === OrderStatus.WASH_PROCESSING ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 font-medium">Placed on {formatDate(order.createdAt)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-10">
                        <div className="text-right">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Price</p>
                          <p className="text-lg font-black text-sky-500">{formatCurrency(order.totalPrice)}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(90deg)' : 'none' }}>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-8 pb-8 pt-2 border-t border-gray-50 bg-gray-50/30">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              {/* Items List */}
                              <div>
                                <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Laundry Items</h4>
                                <div className="space-y-3">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center font-bold text-sky-600 text-xs shadow-sm">
                                          {item.quantity}
                                        </div>
                                        <span className="font-bold text-gray-700">{item.name}</span>
                                      </div>
                                      <span className="text-sm font-black text-gray-400">{formatCurrency(item.pricePerUnit * item.quantity)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Timing Info */}
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Order Details</h4>
                                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                                    <div className="flex items-start gap-4">
                                      <Clock className="w-5 h-5 text-orange-500 mt-1" />
                                      <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pickup Time</p>
                                        <p className="text-sm font-bold text-gray-700">{formatDate(order.pickupTime)}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                                      <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Delivery Time (Est.)</p>
                                        <p className="text-sm font-bold text-gray-700">{formatDate(order.deliveryTime)}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                      <MapPin className="w-5 h-5 text-sky-500 mt-1" />
                                      <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Address</p>
                                        <p className="text-sm font-bold text-gray-700">{order.address}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button className="w-full py-4 bg-white border-2 border-dashed border-gray-200 rounded-2xl font-bold text-gray-400 hover:text-sky-500 hover:border-sky-200 hover:bg-sky-50/50 transition-all">
                                  Download Invoice
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="bg-sky-500 rounded-3xl p-8 text-white shadow-xl shadow-sky-100">
              <h3 className="text-xl font-bold mb-4">Fastest Pickup</h3>
              <p className="text-sky-50 mb-6 leading-relaxed">We have an outlet just 1.2km away from you. Pickups usually happen within 30 mins.</p>
              <div className="flex items-center gap-3 text-sm font-bold bg-sky-600/50 p-4 rounded-2xl">
                <MapPin className="w-5 h-5" />
                Banani Branch (Active)
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Need Help?</h3>
              <div className="space-y-4">
                <button className="w-full py-4 border-2 border-gray-50 bg-gray-50 hover:bg-gray-100 rounded-2xl font-bold text-gray-600 transition-all">
                  Chat with Support
                </button>
                <button className="w-full py-4 border-2 border-gray-50 rounded-2xl font-bold text-gray-600 transition-all">
                  FAQs
                </button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isBookingOpen && (
            <BookingModal 
              isOpen={isBookingOpen} 
              onClose={() => setIsBookingOpen(false)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
