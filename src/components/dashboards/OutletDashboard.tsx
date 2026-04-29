/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Package, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  MoveRight,
  RefreshCw,
  Search,
  Filter,
  MapPin,
  Phone,
  User,
  ChevronRight
} from 'lucide-react';
import { formatCurrency, formatDate } from '../../lib/utils';
import { OrderStatus } from '../../types';

export default function OutletDashboard() {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [tasks, setTasks] = useState([
    { 
      id: 'PW-9012', 
      customer: 'Hasan Ali', 
      phone: '01711-223344',
      address: 'House 5, Road 2, Kandirpar, Cumilla',
      service: 'Dry Clean', 
      status: OrderStatus.RECEIVED, 
      time: '20 mins ago',
      washDate: '',
      items: [
        { name: 'Suit', quantity: 1, type: 'Wash' },
        { name: 'Shirt', quantity: 2, type: 'Iron' }
      ]
    },
    { 
      id: 'PW-9011', 
      customer: 'Sara Karim', 
      phone: '01822-334455',
      address: 'Plot 12, Sector 3, Paduar Bazar, Cumilla',
      service: 'Wash & Fold', 
      status: OrderStatus.START_WASHING, 
      time: '1 hour ago',
      washDate: '2024-04-29',
      items: [
        { name: 'Bed Sheet', quantity: 2, type: 'Wash' },
        { name: 'Pillow Cover', quantity: 4, type: 'Wash' }
      ]
    },
    { 
      id: 'PW-9010', 
      customer: 'Rakib Mia', 
      phone: '01933-445566',
      address: 'Flat 4B, Dream Villa, Racecourse, Cumilla',
      service: 'Premium Iron', 
      status: OrderStatus.READY_FOR_DELIVERY, 
      time: '3 hours ago',
      washDate: '2024-04-28',
      items: [
        { name: 'Panjabi', quantity: 3, type: 'Iron' },
        { name: 'Pajama', quantity: 3, type: 'Iron' }
      ]
    },
  ]);

  const updateStatus = (e: React.MouseEvent, id: string, newStatus: OrderStatus, washDate?: string) => {
    e.stopPropagation();
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus, washDate: washDate || task.washDate } : task));
  };

  const statusColors = {
    [OrderStatus.PENDING]: 'bg-gray-100 text-gray-700',
    [OrderStatus.COLLECTING]: 'bg-yellow-100 text-yellow-700',
    [OrderStatus.RECEIVED]: 'bg-orange-100 text-orange-700',
    [OrderStatus.START_WASHING]: 'bg-blue-100 text-blue-700',
    [OrderStatus.WASH_PROCESSING]: 'bg-sky-100 text-sky-700',
    [OrderStatus.READY_FOR_DELIVERY]: 'bg-green-100 text-green-700',
    [OrderStatus.DELIVERED]: 'bg-gray-100 text-gray-700',
    [OrderStatus.CANCELLED]: 'bg-red-100 text-red-700',
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">Outlet <span className="text-sky-500">Manager</span></h1>
            <p className="text-gray-500 font-medium mt-1">Manage processing queue for Cumilla Main Branch.</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-5 h-5 text-gray-400" />
             </button>
             <div className="flex items-center bg-sky-500 px-4 py-2 rounded-xl text-white font-bold gap-2 focus-within:ring-2 ring-sky-100 outline-none">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live: 12 Active
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Stats */}
          <div className="lg:col-span-1 space-y-6">
            {[
              { label: 'New Orders', value: '4', icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
              { label: 'In Process', value: '8', icon: Clock, color: 'text-sky-500', bg: 'bg-sky-50' },
              { label: 'Ready for Home', value: '15', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`p-3 ${stat.bg} rounded-xl`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Task Queue */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900">Processing Queue</h2>
              <div className="flex items-center gap-3">
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Find order..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 ring-sky-100" />
                 </div>
                 <button className="p-2.5 bg-white border border-gray-200 rounded-xl">
                    <Filter className="w-4 h-4 text-gray-400" />
                 </button>
              </div>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => {
                const isExpanded = expandedOrderId === task.id;
                
                return (
                  <motion.div 
                    layout
                    key={task.id}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
                  >
                    <div 
                      onClick={() => setExpandedOrderId(isExpanded ? null : task.id)}
                      className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-gray-900">{task.id}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${statusColors[task.status]}`}>
                              {task.status}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-gray-700">{task.customer}</p>
                          <p className="text-xs text-gray-400 font-medium">{task.service} | {task.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-4">
                          {task.status === OrderStatus.PENDING && (
                            <button 
                              onClick={(e) => updateStatus(e, task.id, OrderStatus.COLLECTING)}
                              className="px-6 py-2.5 bg-yellow-500 text-white text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-yellow-600 transition-colors"
                            >
                              Order Collecting
                              <MoveRight className="w-4 h-4" />
                            </button>
                          )}
                          {task.status === OrderStatus.COLLECTING && (
                            <button 
                              onClick={(e) => updateStatus(e, task.id, OrderStatus.RECEIVED)}
                              className="px-6 py-2.5 bg-yellow-500 text-white text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-yellow-600 transition-colors"
                            >
                              Mark Received
                              <MoveRight className="w-4 h-4" />
                            </button>
                          )}
                          {task.status === OrderStatus.RECEIVED && (
                            <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                              <input 
                                type="date" 
                                className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:ring-2 ring-sky-100 outline-none"
                                defaultValue={new Date().toISOString().split('T')[0]}
                                id={`wash-date-${task.id}`}
                              />
                              <button 
                                onClick={(e) => {
                                  const dateInput = document.getElementById(`wash-date-${task.id}`) as HTMLInputElement;
                                  updateStatus(e, task.id, OrderStatus.START_WASHING, dateInput.value);
                                }}
                                className="px-6 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-orange-600 transition-colors"
                              >
                                Send for Wash
                                <MoveRight className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                          {task.status === OrderStatus.START_WASHING && (
                            <button 
                              onClick={(e) => updateStatus(e, task.id, OrderStatus.WASH_PROCESSING)}
                              className="px-6 py-2.5 bg-blue-500 text-white text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-blue-600 transition-colors"
                            >
                              Wash Processing
                              <MoveRight className="w-4 h-4" />
                            </button>
                          )}
                          {task.status === OrderStatus.WASH_PROCESSING && (
                            <button 
                              onClick={(e) => updateStatus(e, task.id, OrderStatus.READY_FOR_DELIVERY)}
                              className="px-6 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-green-700 transition-colors"
                            >
                              Ready for Delivery
                              <MoveRight className="w-4 h-4" />
                            </button>
                          )}
                          {task.status === OrderStatus.READY_FOR_DELIVERY && (
                            <button 
                              onClick={(e) => updateStatus(e, task.id, OrderStatus.DELIVERED)}
                              className="px-6 py-2.5 bg-gray-600 text-white text-sm font-bold rounded-xl hover:bg-gray-700 transition-colors"
                            >
                              Delivered
                            </button>
                          )}
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(90deg)' : 'none' }}>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
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
                          <div className="px-8 pb-8 pt-2 border-t border-gray-50 bg-gray-50/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                              <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Order Items</h4>
                                <div className="space-y-2">
                                  {task.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                      <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-sky-50 rounded flex items-center justify-center text-[10px] font-black text-sky-600">
                                          {item.quantity}
                                        </div>
                                        <span className="text-sm font-bold text-gray-700">{item.name}</span>
                                      </div>
                                      <span className="text-[10px] font-black text-gray-400 uppercase">{item.type}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Customer Details</h4>
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                      <Phone className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{task.phone}</span>
                                  </div>
                                  <div className="flex items-start gap-3">
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                      <MapPin className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 leading-relaxed">{task.address}</span>
                                  </div>
                                  {task.washDate && (
                                    <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                                      <div className="p-2 bg-sky-50 rounded-lg">
                                        <Clock className="w-4 h-4 text-sky-500" />
                                      </div>
                                      <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Processing Date</p>
                                        <p className="text-sm font-bold text-gray-700">{task.washDate}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="flex gap-3">
                                  <button className="flex-1 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:border-sky-200 hover:text-sky-500 transition-all">
                                    Print Label
                                  </button>
                                  <a 
                                    href={`tel:${task.phone}`}
                                    className="flex-1 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 hover:border-sky-200 hover:text-sky-500 transition-all text-center"
                                  >
                                    Call Customer
                                  </a>
                                </div>
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
        </div>
      </div>
    </div>
  );
}
