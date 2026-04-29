/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Package, 
  Truck, 
  CircleDashed,
  Bell,
  BellOff
} from 'lucide-react';
import { cn } from '../lib/utils';
import { OrderStatus } from '../types';
import { requestNotificationPermission, simulateOrderStatusChange } from '../lib/notifications';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [trackingData, setTrackingData] = useState<{
    id: string;
    status: OrderStatus;
    steps: { label: string; time: string; completed: boolean; current?: boolean }[];
  } | null>(null);

  const handleRequestPermission = async () => {
    const result = await requestNotificationPermission();
    if (result !== 'unsupported') {
      setNotificationPermission(result as NotificationPermission);
    }
  };

  const handleTrack = (e: FormEvent) => {
    e.preventDefault();
    // Mock tracking data
    setTrackingData({
      id: orderId || 'PW-82731',
      status: OrderStatus.WASH_PROCESSING,
      steps: [
        { label: 'Order Placed', time: 'April 27, 10:30 AM', completed: true },
        { label: 'Order Collecting', time: 'April 27, 12:45 PM', completed: true },
        { label: 'Wash Processing', time: 'In Progress', completed: false, current: true },
        { label: 'Ready for Delivery', time: '--', completed: false },
        { label: 'Delivered', time: '--', completed: false },
      ]
    });
  };

  // Simulate a status change after 5 seconds to show notification
  useEffect(() => {
    if (trackingData && notificationPermission === 'granted') {
      const timer = setTimeout(() => {
        simulateOrderStatusChange(trackingData.id, 'Ready for Delivery');
        
        // Update local state to reflect change
        setTrackingData(prev => prev ? {
          ...prev,
          status: OrderStatus.READY_FOR_DELIVERY,
          steps: prev.steps.map(step => {
            if (step.label === 'Wash Processing') return { ...step, completed: true, current: false };
            if (step.label === 'Ready for Delivery') return { ...step, completed: false, current: true, time: 'Now' };
            return step;
          })
        } : null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [trackingData, notificationPermission]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Track Your <span className="text-sky-500">Laundry</span></h1>
          <p className="text-gray-500 font-medium">Enter your Order ID to get real-time status updates.</p>
        </div>

        {notificationPermission !== 'granted' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-sky-50 border border-sky-100 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-sky-900">Get Real-Time Updates</p>
                <p className="text-xs text-sky-600">Enable push notifications to know exactly when your laundry is ready.</p>
              </div>
            </div>
            <button 
              onClick={handleRequestPermission}
              className="px-6 py-2 bg-sky-500 text-white text-sm font-bold rounded-xl hover:bg-sky-600 transition-all whitespace-nowrap"
            >
              Enable Notifications
            </button>
          </motion.div>
        )}

        <form onSubmit={handleTrack} className="mb-12">
          <div className="bg-white p-4 rounded-3xl shadow-xl flex flex-col md:flex-row gap-4 border border-gray-100">
             <div className="flex-grow relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Order ID (e.g. PW-82731)" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl outline-none font-bold text-gray-700"
                />
             </div>
             <button className="px-10 py-4 bg-sky-500 text-white font-bold rounded-2xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-100">
                Track Now
             </button>
          </div>
        </form>

        {trackingData && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="bg-sky-500 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6">
               <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-80">CURRENT STATUS</p>
                  <h2 className="text-3xl font-black italic">{trackingData.status.toUpperCase()}</h2>
               </div>
               <div className="text-right flex items-center gap-4">
                  <div className="text-right hidden md:block">
                     <p className="text-xs font-black uppercase tracking-[0.2em] mb-1 opacity-80">ORDER ID</p>
                     <p className="text-xl font-black italic">#{trackingData.id}</p>
                  </div>
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                     <Package className="w-8 h-8" />
                  </div>
               </div>
            </div>

            <div className="p-10">
               <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[17px] top-4 bottom-4 w-1 bg-gray-100 rounded-full" />
                  
                  <div className="space-y-10">
                    {trackingData.steps.map((step, i) => (
                      <div key={i} className="flex gap-8 relative items-start">
                         <div className={cn(
                           "flex-shrink-0 w-[38px] h-[38px] rounded-full flex items-center justify-center z-10 border-4 border-white transition-all",
                           step.completed ? "bg-green-500 shadow-lg shadow-green-100" : 
                           step.current ? "bg-sky-500 shadow-lg shadow-sky-100 animate-pulse" : "bg-gray-200"
                         )}>
                            {step.completed ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : step.current ? (
                              <CircleDashed className="w-5 h-5 text-white animate-spin" />
                            ) : (
                              <div className="w-2.5 h-2.5 bg-white rounded-full" />
                            )}
                         </div>
                         <div className="flex-grow pt-1">
                            <h4 className={cn(
                              "text-lg font-bold mb-1",
                              step.completed || step.current ? "text-gray-900" : "text-gray-300"
                            )}>
                              {step.label}
                            </h4>
                            <p className="text-sm font-medium text-gray-400">
                              {step.time}
                            </p>
                         </div>
                      </div>
                    ))}
                  </div>
               </div>

               <div className="mt-16 pt-8 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                       <MapPin className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                       <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Pick up From</p>
                       <p className="font-bold text-gray-900">Main Hub, Cumilla</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                       <Truck className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                       <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">DELIVERING TO</p>
                       <p className="font-bold text-gray-900">Home Address</p>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
