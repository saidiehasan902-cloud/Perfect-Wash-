/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CustomerDashboard from './components/dashboards/CustomerDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import OutletDashboard from './components/dashboards/OutletDashboard';
import DeliveryDashboard from './components/dashboards/DeliveryDashboard';
import TrackOrder from './components/TrackOrder';
import { UserRole } from './types';

// Dashboards and Tracking
export default function App() {
  const [user, setUser] = useState<{ name: string; role: UserRole } | null>(null);

  const handleLogin = (email: string) => {
    // Basic logic for dev: prioritize admin/manager if email contains keywords
    let role = UserRole.CUSTOMER;
    if (email.includes('admin')) role = UserRole.ADMIN;
    else if (email.includes('manager')) role = UserRole.OUTLET_MANAGER;
    else if (email.includes('staff')) role = UserRole.DELIVERY_STAFF;

    setUser({ 
      name: email.split('@')[0], 
      role 
    });
  };

  const loginMock = (role: UserRole) => {
    setUser({ name: `Test ${role}`, role });
  };

  const logout = () => setUser(null);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
        <Navbar 
          userName={user?.name} 
          userRole={user?.role} 
          onLogout={logout} 
          onLogin={() => loginMock(UserRole.CUSTOMER)} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/track" element={<TrackOrder />} />
            
            {/* Protected Routes (Placeholder Logic) */}
            <Route 
              path="/customer-dashboard" 
              element={user?.role === UserRole.CUSTOMER ? <CustomerDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/outlet-dashboard" 
              element={user?.role === UserRole.OUTLET_MANAGER ? <OutletDashboard /> : <Navigate to="/login" />} 
            />
             <Route 
              path="/delivery-dashboard" 
              element={user?.role === UserRole.DELIVERY_STAFF ? <DeliveryDashboard /> : <Navigate to="/login" />} 
            />
             <Route 
              path="/admin-dashboard" 
              element={user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/login" />} 
            />
            
            {/* Dev shortcuts for role switching - REMOVE LATER */}
            <Route path="/dev/admin" element={<div className="pt-32 text-center"><button onClick={() => loginMock(UserRole.ADMIN)}>Login as Admin</button></div>} />
            <Route path="/dev/manager" element={<div className="pt-32 text-center"><button onClick={() => loginMock(UserRole.OUTLET_MANAGER)}>Login as Manager</button></div>} />
            <Route path="/dev/delivery" element={<div className="pt-32 text-center"><button onClick={() => loginMock(UserRole.DELIVERY_STAFF)}>Login as Delivery</button></div>} />
          </Routes>
        </main>

        <Footer />

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
          <a 
            href="tel:+8801641419696"
            className="bg-sky-500 text-white p-4 rounded-full shadow-2xl hover:bg-sky-600 transition-all hover:scale-110 flex items-center justify-center animate-bounce delay-100"
            title="Call Now"
          >
            <Phone className="w-6 h-6" />
          </a>
          <a 
            href="https://wa.me/8801641419696"
            target="_blank"
            rel="noreferrer"
            className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center animate-bounce"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
      </div>
    </Router>
  );
}
