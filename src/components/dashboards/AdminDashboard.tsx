/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Store, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  Plus, 
  Search, 
  TrendingUp, 
  DollarSign,
  Package,
  ArrowUpRight,
  MoreVertical,
  ChevronRight,
  Clock,
  MapPin,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { formatCurrency } from '../../lib/utils';
import { OrderStatus } from '../../types';

const data = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 2000, orders: 12 },
  { name: 'Thu', revenue: 2780, orders: 20 },
  { name: 'Fri', revenue: 1890, orders: 15 },
  { name: 'Sat', revenue: 2390, orders: 25 },
  { name: 'Sun', revenue: 3490, orders: 30 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'outlets' | 'users' | 'orders'>('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Total Revenue', value: '৳1,24,500', change: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Orders', value: '1,482', change: '+8.2%', icon: ShoppingBag, color: 'text-sky-500', bg: 'bg-sky-50' },
    { label: 'Active Outlets', value: '12', change: '0%', icon: Store, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'New Customers', value: '342', change: '+15.3%', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const outlets = [
    { id: 'OT-01', name: 'Banani Branch', manager: 'Ariful Islam', phone: '01641XXXXXX', status: 'Active', revenue: 45000 },
    { id: 'OT-02', name: 'Gulshan Branch', manager: 'Mizanur Rahman', phone: '01712XXXXXX', status: 'Active', revenue: 38000 },
    { id: 'OT-03', name: 'Uttara Main', manager: 'Tanvir Hasan', phone: '01833XXXXXX', status: 'Busy', revenue: 32000 },
    { id: 'OT-04', name: 'Dhanmondi', manager: 'Saidul Islam', phone: '01944XXXXXX', status: 'Active', revenue: 29000 },
  ];

  const appUsers = [
    { id: 'U-102', name: 'Hasan Ali', email: 'hasan@example.com', joinDate: '2024-03-12', orders: 12, spent: 5400 },
    { id: 'U-105', name: 'Sara Karim', email: 'sara@example.com', joinDate: '2024-03-15', orders: 8, spent: 3200 },
    { id: 'U-109', name: 'Rakib Mia', email: 'rakib@example.com', joinDate: '2024-03-18', orders: 5, spent: 1800 },
    { id: 'U-112', name: 'Tahmina', email: 'tahmina@example.com', joinDate: '2024-03-20', orders: 15, spent: 8900 },
  ];

  const allOrders = [
    { 
      id: 'PW-9012', 
      customer: 'Hasan Ali', 
      outlet: 'Banani', 
      service: 'Dry Clean', 
      status: OrderStatus.WASH_PROCESSING, 
      amount: 1550, 
      date: '2024-04-28',
      phone: '01711-223344',
      pickup: '10:00 AM',
      delivery: 'Tomorrow 05:00 PM',
      items: [
        { name: 'Suit', qty: 1, type: 'Premium Wash' },
        { name: 'Shirt', qty: 2, type: 'Iron Only' }
      ]
    },
    { 
      id: 'PW-9011', 
      customer: 'Sara Karim', 
      outlet: 'Gulshan', 
      service: 'Wash & Fold', 
      status: OrderStatus.READY_FOR_DELIVERY, 
      amount: 480, 
      date: '2024-04-28',
      phone: '01822-334455',
      pickup: '11:30 AM',
      delivery: 'Today 08:00 PM',
      items: [
        { name: 'Bed Sheet', qty: 2, type: 'Steam wash' },
        { name: 'Pillow Cover', qty: 4, type: 'Steam wash' }
      ]
    },
    { 
      id: 'PW-9010', 
      customer: 'Rakib Mia', 
      outlet: 'Uttara', 
      service: 'Premium Iron', 
      status: OrderStatus.DELIVERED, 
      amount: 240, 
      date: '2024-04-27',
      phone: '01933-445566',
      pickup: '02:00 PM',
      delivery: 'April 28, 10:00 AM',
      items: [
        { name: 'Panjabi', qty: 3, type: 'Premium Iron' }
      ]
    },
    { 
      id: 'PW-9009', 
      customer: 'Tahmina', 
      outlet: 'Dhanmondi', 
      service: 'Dry Clean', 
      status: OrderStatus.READY_FOR_DELIVERY, 
      amount: 1200, 
      date: '2024-04-27',
      phone: '01641-XXYYZZ',
      pickup: '09:00 AM',
      delivery: 'April 29, 04:00 PM',
      items: [
        { name: 'Saree', qty: 2, type: 'Dry Clean' }
      ]
    },
    { 
      id: 'PW-9008', 
      customer: 'Jahirul Islam', 
      outlet: 'Banani', 
      service: 'Normal Wash', 
      status: OrderStatus.RECEIVED, 
      amount: 350, 
      date: '2024-04-27',
      phone: '01755-AABBCC',
      pickup: '04:00 PM',
      delivery: 'April 30, 10:00 AM',
      items: [
        { name: 'T-shirt', qty: 5, type: 'Wash & Fold' }
      ]
    },
  ];

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">System <span className="text-sky-500">Admin</span></h1>
            <p className="text-gray-500 font-medium mt-1">Global oversight of Perfect Wash operations.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-sm">
                <BarChart3 className="w-5 h-5" />
                Export Reports
            </button>
            <button className="flex items-center gap-2 px-6 py-3.5 bg-sky-500 text-white font-bold rounded-2xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-100">
              <Plus className="w-5 h-5" />
              Add Outlet
            </button>
          </div>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 ${stat.bg} rounded-xl`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                  <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-2xl w-fit mb-10">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'outlets', label: 'Outlets', icon: Store },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'orders', label: 'Orders', icon: Package },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-sky-500 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Revenue Analysis</h3>
                  <p className="text-sm text-gray-500 font-medium">Weekly performance tracker</p>
                </div>
                <div className="flex gap-4">
                   <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:bg-white ring-sky-100 focus:ring-2 transition-all"
                      />
                   </div>
                   <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                      cursor={{fill: '#f1f5f9', radius: 4}}
                    />
                    <Bar dataKey="revenue" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sidebar List */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Top Outlets</h3>
              <div className="space-y-6">
                {outlets.map((outlet, i) => (
                  <div key={outlet.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center font-bold text-sky-500 text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{outlet.name}</p>
                        <p className="text-xs text-gray-500 font-medium">{outlet.status}</p>
                      </div>
                    </div>
                    <p className="font-black text-gray-900 italic">৳{outlet.revenue / 1000}k</p>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setActiveTab('outlets')}
                className="w-full mt-8 py-4 bg-gray-50 text-gray-600 font-bold rounded-2xl hover:bg-gray-100 transition-all text-sm"
              >
                View All Outlets
              </button>
            </div>

            {/* Recent Orders Table */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
               <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Live Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-sm font-bold text-sky-500 hover:underline">View All</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-gray-50 text-xs font-black text-gray-400 uppercase tracking-widest">
                       <th className="px-8 py-4">Order ID</th>
                       <th className="px-8 py-4">Customer</th>
                       <th className="px-8 py-4">Status</th>
                       <th className="px-8 py-4">Amount</th>
                       <th className="px-8 py-4 text-right">Action</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                     {allOrders.slice(0, 4).map((order) => (
                       <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                         <td className="px-8 py-5 font-black text-gray-900">{order.id}</td>
                         <td className="px-8 py-5 font-bold text-gray-700">{order.customer}</td>
                         <td className="px-8 py-5">
                           <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full tracking-wider">
                             {order.status}
                           </span>
                         </td>
                         <td className="px-8 py-5 font-bold text-gray-900">৳{order.amount}</td>
                         <td className="px-8 py-5 text-right">
                           <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                             <MoreVertical className="w-5 h-5 text-gray-400" />
                           </button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'outlets' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h3 className="text-xl font-bold text-gray-900">Outlet Management</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search outlets..."
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:bg-white ring-sky-100 focus:ring-2 transition-all w-full md:w-80"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-xs font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-8 py-4">Branch Name</th>
                    <th className="px-8 py-4">Manager</th>
                    <th className="px-8 py-4">Contact</th>
                    <th className="px-8 py-4">Monthly Revenue</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {outlets.map((outlet) => (
                    <tr key={outlet.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-bold text-gray-900">{outlet.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{outlet.id}</p>
                      </td>
                      <td className="px-8 py-5 font-bold text-gray-700">{outlet.manager}</td>
                      <td className="px-8 py-5 text-gray-500 font-medium">{outlet.phone}</td>
                      <td className="px-8 py-5 font-black text-sky-500 italic">৳{outlet.revenue.toLocaleString()}</td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          outlet.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                        }`}>
                          {outlet.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="text-sky-500 font-bold text-sm hover:underline">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h3 className="text-xl font-bold text-gray-900">Customer Records</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by name or email..."
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:bg-white ring-sky-100 focus:ring-2 transition-all w-full md:w-80"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-xs font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-8 py-4">Customer</th>
                    <th className="px-8 py-4">Join Date</th>
                    <th className="px-8 py-4 text-center">Total Orders</th>
                    <th className="px-8 py-4">Total Spent</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                      </td>
                      <td className="px-8 py-5 text-gray-500 font-medium">{user.joinDate}</td>
                      <td className="px-8 py-5 text-center font-black text-gray-400">{user.orders}</td>
                      <td className="px-8 py-5 font-black text-gray-900 italic">৳{user.spent.toLocaleString()}</td>
                      <td className="px-8 py-5 text-right">
                        <button className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-sky-500 hover:bg-sky-50 transition-colors">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <h3 className="text-xl font-bold text-gray-900">Global Order Registry</h3>
              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search by Order ID..."
                    className="pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:bg-white ring-sky-100 focus:ring-2 transition-all w-full md:w-64"
                  />
                </div>
                <select className="bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none">
                  <option>All Status</option>
                  {Object.values(OrderStatus).map(status => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
                <button className="px-6 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-100 transition-all">
                  Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-xs font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-8 py-4">Order Details</th>
                    <th className="px-8 py-4">Outlet</th>
                    <th className="px-8 py-4">Date</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Amount</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {allOrders.map((order) => {
                    const isExpanded = expandedOrderId === order.id;
                    return (
                      <React.Fragment key={order.id}>
                        <tr 
                          onClick={() => toggleOrder(order.id)}
                          className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${isExpanded ? 'bg-gray-50/80 shadow-inner' : ''}`}
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <div className={`p-1.5 rounded-lg transition-transform duration-200 ${isExpanded ? 'rotate-90 bg-sky-50' : ''}`}>
                                <ChevronRight className={`w-4 h-4 ${isExpanded ? 'text-sky-500' : 'text-gray-300'}`} />
                              </div>
                              <p className="font-black text-gray-900">{order.id}</p>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium ml-10">{order.service}</p>
                          </td>
                          <td className="px-8 py-5 text-gray-700 font-bold text-sm">
                            {order.outlet}
                            <p className="text-[10px] text-gray-400 font-medium">Branch</p>
                          </td>
                          <td className="px-8 py-5 text-gray-500 font-medium">
                            {order.date}
                            <p className="text-[10px] text-gray-400 font-medium">Ordered</p>
                          </td>
                          <td className="px-8 py-5">
                            <span className="px-3 py-1 bg-sky-50 text-sky-600 text-[10px] font-black uppercase rounded-full tracking-wider">
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-5 font-black text-gray-900 italic">৳{order.amount}</td>
                          <td className="px-8 py-5 text-right">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical className="w-5 h-5 text-gray-400" />
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr className="bg-gray-50/50">
                            <td colSpan={6} className="px-8 py-0">
                               <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="overflow-hidden"
                               >
                                  <div className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Order Items */}
                                    <div className="md:col-span-1">
                                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Item Breakdown</h4>
                                      <div className="space-y-2">
                                        {order.items.map((item, idx) => (
                                          <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                            <div className="flex items-center gap-3">
                                              <div className="w-7 h-7 bg-sky-50 rounded-lg flex items-center justify-center text-xs font-black text-sky-500">
                                                {item.qty}
                                              </div>
                                              <span className="text-sm font-bold text-gray-700">{item.name}</span>
                                            </div>
                                            <span className="text-[10px] font-black text-gray-400 uppercase">{item.type}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Order Lifecycle */}
                                    <div className="md:col-span-1">
                                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Schedule Timeline</h4>
                                      <div className="space-y-4">
                                        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                          <div className="p-2 bg-sky-50 rounded-xl">
                                            <Clock className="w-4 h-4 text-sky-500" />
                                          </div>
                                          <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pickup Slot</p>
                                            <p className="text-sm font-bold text-gray-700">{order.pickup}</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                          <div className="p-2 bg-green-50 rounded-xl">
                                            <Calendar className="w-4 h-4 text-green-500" />
                                          </div>
                                          <div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Target</p>
                                            <p className="text-sm font-bold text-gray-700">{order.delivery}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Action Hub */}
                                    <div className="md:col-span-1">
                                      <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Customer Intelligence</h4>
                                      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-black text-[10px] text-gray-500">
                                            {order.customer.charAt(0)}
                                          </div>
                                          <div>
                                            <p className="text-sm font-bold text-gray-900">{order.customer}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">{order.phone}</p>
                                          </div>
                                        </div>
                                        <div className="flex gap-2">
                                          <button className="flex-1 py-2.5 bg-sky-500 text-white text-[10px] font-black uppercase rounded-xl hover:bg-sky-600 transition-all">Track Order</button>
                                          <button className="px-3 py-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 italic font-medium text-xs">Print</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                               </motion.div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
