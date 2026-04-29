/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, User, LogOut, Menu, X, Bell } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { UserRole } from '../../types';

interface NavbarProps {
  userRole?: UserRole;
  userName?: string;
  onLogout?: () => void;
  onLogin?: () => void;
}

export default function Navbar({ userRole, userName, onLogout, onLogin }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'Track Order', href: '/track' },
  ];

  const dashboardLink = userRole ? {
    name: 'Dashboard',
    href: `/${userRole}-dashboard`
  } : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <a href="/" className="text-xl font-black text-sky-500 uppercase tracking-tighter">
              Perfect Wash
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-sky-500 transition-colors"
                id={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
            {dashboardLink && (
              <a
                href={dashboardLink.href}
                className="text-sm font-bold text-sky-500"
                id="nav-link-dashboard"
              >
                {dashboardLink.name}
              </a>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {userName ? (
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600" id="btn-notifications">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 left-5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{userName}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Logout"
                  id="btn-logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <a
                href="/login"
                className="px-5 py-2.5 bg-sky-500 text-white text-sm font-semibold rounded-full hover:bg-sky-600 transition-all shadow-sm hover:shadow-md"
                id="btn-login"
              >
                Sign In
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {userName && (
               <Bell className="w-5 h-5 text-gray-400" />
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600"
              id="btn-mobile-menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-top border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              {dashboardLink && (
                <a
                  href={dashboardLink.href}
                  className="block px-3 py-4 text-base font-bold text-sky-500 hover:bg-sky-50 rounded-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {dashboardLink.name}
                </a>
              )}
              <div className="pt-4 border-top border-gray-100">
                {userName ? (
                  <button
                    onClick={() => {
                      onLogout?.();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-4 text-red-600 font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onLogin?.();
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-4 bg-sky-500 text-white font-bold rounded-xl"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
