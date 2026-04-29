/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, ShoppingBag, Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex mb-4 p-4 bg-sky-50 rounded-2xl">
            <Shirt className="w-10 h-10 text-sky-500" />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2 font-medium">Clear your laundry with one click</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-sky-500 text-white font-bold rounded-2xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-100 flex items-center justify-center gap-2 group"
          >
            Sign In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Quick Login (Demo)</p>
          <div className="grid grid-cols-3 gap-3">
             <button 
               onClick={() => onLogin('admin@wash.com')}
               className="py-2 bg-gray-50 text-[10px] font-bold text-gray-500 rounded-xl hover:bg-sky-50 hover:text-sky-500 transition-colors"
             >
               Admin
             </button>
             <button 
               onClick={() => onLogin('manager@wash.com')}
               className="py-2 bg-gray-50 text-[10px] font-bold text-gray-500 rounded-xl hover:bg-sky-50 hover:text-sky-500 transition-colors"
             >
               Manager
             </button>
             <button 
               onClick={() => onLogin('staff@wash.com')}
               className="py-2 bg-gray-50 text-[10px] font-bold text-gray-500 rounded-xl hover:bg-sky-50 hover:text-sky-500 transition-colors"
             >
               Staff
             </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-500 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-sky-500 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
