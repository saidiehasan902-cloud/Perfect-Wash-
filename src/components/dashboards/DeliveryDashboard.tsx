/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Truck, 
  MapPin, 
  Phone, 
  Navigation,
  CheckCircle,
  Clock,
  Package,
  ExternalLink,
  Bell,
  X
} from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { OrderStatus } from '../../types';
import { requestNotificationPermission, sendNotification } from '../../lib/notifications';

export default function DeliveryDashboard() {
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [showNotificationAlert, setShowNotificationAlert] = useState(false);
  const [activeTasks, setActiveTasks] = useState([
    { 
      id: 'PW-9012', 
      type: 'Pickup', 
      customer: 'Hasan Ali', 
      address: 'House 12, Kandirpar, Cumilla', 
      phone: '01711-000000',
      timeSlot: 'Today, 2:00 PM - 4:00 PM',
      status: OrderStatus.COLLECTING,
      items: '5 Items'
    },
    { 
      id: 'PW-9009', 
      type: 'Delivery', 
      customer: 'Tahmina', 
      address: 'Flat 4A, Tomsom Bridge Road, Cumilla', 
      phone: '01722-000000',
      timeSlot: 'Today, 4:00 PM - 6:00 PM',
      status: OrderStatus.READY_FOR_DELIVERY,
      items: '2 Suits, 1 Saree'
    }
  ]);

  const handleRequestPermission = async () => {
    const result = await requestNotificationPermission();
    if (result !== 'unsupported') {
      setNotificationPermission(result as NotificationPermission);
    }
    setShowNotificationAlert(false);
  };

  const updateTaskStatus = (id: string, newStatus: OrderStatus) => {
    setActiveTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ).filter(task => task.status !== OrderStatus.DELIVERED && task.status !== OrderStatus.RECEIVED));
  };

  // Simulate receiving a new task via push notification
  useEffect(() => {
    if (notificationPermission === 'granted') {
      const timer = setTimeout(() => {
        const newTask = {
          id: 'PW-9122',
          type: 'Pickup',
          customer: 'Abdur Rahman',
          address: 'Rani Bazar, Cumilla',
          phone: '01833-000000',
          timeSlot: 'Immediate',
          status: OrderStatus.COLLECTING,
          items: '1 Saree, 2 Shirts'
        };

        sendNotification('New Task Assigned', {
          body: `New Pickup from Abdur Rahman at Rani Bazar. Check your dashboard. 🚚`,
          tag: 'task-assignment'
        });

        setActiveTasks(prev => [newTask, ...prev]);
      }, 10000); // 10 seconds delay for demo
      return () => clearTimeout(timer);
    } else {
      // Prompt for permission if not granted
      const timer = setTimeout(() => {
        if (notificationPermission === 'default') {
          setShowNotificationAlert(true);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notificationPermission]);

  const getStatusAction = (task: any) => {
    if (task.type === 'Pickup') {
      if (task.status === OrderStatus.COLLECTING) {
        return (
          <button 
            onClick={() => updateTaskStatus(task.id, OrderStatus.RECEIVED)}
            className="py-4 bg-sky-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-sky-700 shadow-lg shadow-sky-100 transition-all flex-1"
          >
            <CheckCircle className="w-5 h-5" />
            Mark as Picked & Received
          </button>
        );
      }
    } else {
      if (task.status === OrderStatus.READY_FOR_DELIVERY) {
        return (
          <button 
            onClick={() => updateTaskStatus(task.id, OrderStatus.DELIVERED)}
            className="py-4 bg-green-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-green-700 shadow-lg shadow-green-100 transition-all flex-1"
          >
            <CheckCircle className="w-5 h-5" />
            Confirm Delivery
          </button>
        );
      }
    }
    return null;
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">Fleet <span className="text-sky-500">Staff</span></h1>
            <p className="text-gray-500 font-medium mt-1">Active logistics queue for Cumilla Hub.</p>
          </div>
          <div className="p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-3">
             <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-sky-500" />
             </div>
             <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Vehicle ID</p>
                <p className="font-bold text-gray-900">PW-CUMILLA-01</p>
             </div>
          </div>
        </div>

        <AnimatePresence>
          {showNotificationAlert && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8"
            >
              <div className="bg-sky-600 rounded-3xl p-6 text-white shadow-xl shadow-sky-100 flex items-center justify-between gap-6 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 right-1/4 w-16 h-16 bg-white/5 rounded-full" />
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center animate-bounce">
                    <Bell className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic">Don't Miss a Task!</h3>
                    <p className="text-sky-100 font-medium">Enable push notifications to get instant alerts for new assignments.</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <button 
                    onClick={handleRequestPermission}
                    className="px-8 py-3 bg-white text-sky-600 font-black rounded-xl hover:bg-sky-50 transition-all shadow-lg active:scale-95"
                  >
                    Enable Now
                  </button>
                  <button 
                    onClick={() => setShowNotificationAlert(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-sky-200" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeTasks.map((task) => (
            <motion.div 
              key={task.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className={`px-8 py-4 flex items-center justify-between ${
                task.type === 'Pickup' ? 'bg-orange-50 text-orange-700' : 'bg-sky-50 text-sky-700'
              }`}>
                <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  {task.type} Task
                </span>
                <span className="font-black italic">{task.id}</span>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{task.customer}</h3>
                    <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      {task.timeSlot}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Items</p>
                    <p className="text-sm font-black text-sky-500 italic">{task.items}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                   <div className="flex items-start gap-4">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Address</p>
                        <p className="text-sm font-bold text-gray-700 leading-snug">{task.address}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact</p>
                        <a href={`tel:${task.phone}`} className="text-sm font-black text-sky-600 hover:underline">{task.phone}</a>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4">
                   <button className="px-6 py-4 bg-gray-50 text-gray-700 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                      <Navigation className="w-5 h-5" />
                      Maps
                   </button>
                   {getStatusAction(task)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        {activeTasks.length === 0 && (
           <div className="py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                 <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-gray-900">All caught up!</h3>
              <p className="text-gray-500">No active pickup or delivery tasks assigned to you right now.</p>
           </div>
        )}
      </div>
    </div>
  );
}
