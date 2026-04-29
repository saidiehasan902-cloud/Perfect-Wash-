/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, MapPin, Phone, CheckCircle2, Loader2, Clock } from 'lucide-react';
import { PRICING_DATA } from '../constants/pricing';
import { formatCurrency } from '../lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SelectedItem {
  id: string;
  name: string;
  quantity: number;
  type: 'wash' | 'iron';
  price: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    preferredTime: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPrice = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [selectedItems]);

  const updateQuantity = (itemId: string, type: 'wash' | 'iron', delta: number) => {
    const item = PRICING_DATA.find(p => p.id === itemId);
    if (!item) return;

    setSelectedItems(prev => {
      const existing = prev.find(i => i.id === itemId && i.type === type);
      let price = 0;
      if (type === 'wash') price = item.washPrice;
      else if (type === 'iron') price = item.ironPrice;

      if (existing) {
        const newQty = Math.max(0, existing.quantity + delta);
        if (newQty === 0) {
          return prev.filter(i => !(i.id === itemId && i.type === type));
        }
        return prev.map(i => i.id === itemId && i.type === type ? { ...i, quantity: newQty } : i);
      } else if (delta > 0) {
        return [...prev, { id: itemId, name: item.name, quantity: 1, type, price }];
      }
      return prev;
    });
  };

  const getQuantity = (itemId: string, type: 'wash' | 'iron') => {
    return selectedItems.find(i => i.id === itemId && i.type === type)?.quantity || 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              {isSuccess ? 'Order Placed!' : step === 1 ? 'Select Items' : 'Pickup Details'}
            </h2>
            {!isSuccess && (
              <p className="text-sm font-bold text-sky-500 uppercase tracking-widest mt-1">
                Step {step} of 2
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        {!isSuccess ? (
          <div className="flex-1 overflow-y-auto p-8">
            {step === 1 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {PRICING_DATA.map((item) => (
                    <div key={item.id} className="bg-gray-50/50 rounded-3xl p-5 border border-gray-100">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-black text-gray-900 text-lg">{item.name}</h4>
                          <div className="flex gap-4 mt-1">
                            <span className="text-xs font-bold text-gray-400">Wash: ৳{item.washPrice}</span>
                            {item.ironPrice > 0 && (
                              <span className="text-xs font-bold text-gray-400">Iron: ৳{item.ironPrice}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                          {/* Wash Counter */}
                          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 min-w-fit">
                            <span className="text-[10px] font-black text-sky-500 uppercase px-2">WASH</span>
                            <div className="flex items-center gap-4">
                              <button 
                                onClick={() => updateQuantity(item.id, 'wash', -1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="w-4 h-4 text-gray-400" />
                              </button>
                              <span className="w-4 text-center font-black text-gray-900">{getQuantity(item.id, 'wash')}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 'wash', 1)}
                                className="w-8 h-8 flex items-center justify-center bg-sky-500 rounded-xl hover:bg-sky-600 transition-all active:scale-95"
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          </div>

                          {/* Iron Counter - Only show if iron price exists */}
                          {item.ironPrice > 0 && (
                            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 min-w-fit">
                              <span className="text-[10px] font-black text-orange-500 uppercase px-2">IRON</span>
                              <div className="flex items-center gap-4">
                                <button 
                                  onClick={() => updateQuantity(item.id, 'iron', -1)}
                                  className="w-8 h-8 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                  <Minus className="w-4 h-4 text-gray-400" />
                                </button>
                                <span className="w-4 text-center font-black text-gray-900">{getQuantity(item.id, 'iron')}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, 'iron', 1)}
                                  className="w-8 h-8 flex items-center justify-center bg-orange-500 rounded-xl hover:bg-orange-600 transition-all active:scale-95"
                                >
                                  <Plus className="w-4 h-4 text-white" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Customer Name</label>
                  <div className="relative">
                    <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required
                      type="text"
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required
                      type="tel"
                      placeholder="01XXX-XXXXXX"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Pickup Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea 
                      required
                      placeholder="House No, Road No, Area, Cumilla"
                      rows={3}
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl outline-none transition-all font-bold resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Preferred Pickup Time</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      required
                      type="text"
                      placeholder="e.g., Tomorrow 10:00 AM or Evening 6 PM"
                      value={formData.preferredTime}
                      onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest pl-2">Extra Notes (Optional)</label>
                  <textarea 
                    placeholder="Any specific instructions (e.g., call before arrival, special garment care)..."
                    rows={2}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-sky-500 focus:bg-white rounded-2xl outline-none transition-all font-bold resize-none"
                  />
                </div>
                
                <div className="bg-sky-50 p-6 rounded-3xl border border-sky-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-sky-600">Selected Items:</span>
                    <span className="font-black text-sky-700">{selectedItems.length} styles</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-sky-200">
                    <span className="text-lg font-black text-gray-900">Total Price:</span>
                    <span className="text-2xl font-black text-sky-500">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">Aww Yeah! Order Success</h3>
            <p className="text-lg text-gray-500 font-medium mb-8">
              We've received your request. Our rider will contact you shortly for pickup.
            </p>
            <div className="p-6 bg-gray-50 rounded-2xl text-left border border-gray-100 max-w-sm mx-auto mb-10">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Order ID</p>
              <p className="font-black text-gray-900">PW-{Math.floor(Math.random() * 100000)}</p>
            </div>
            <button 
              onClick={onClose}
              className="w-full px-8 py-5 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-600 transition-all shadow-xl shadow-sky-200"
            >
              Back to Home
            </button>
          </div>
        )}

        {/* Footer */}
        {!isSuccess && (
          <div className="p-8 border-t border-gray-100 bg-white sticky bottom-0">
            <div className="flex items-center justify-between gap-6">
              <div className="hidden sm:block">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Estimated Total</p>
                <p className="text-2xl font-black text-sky-500">{formatCurrency(totalPrice)}</p>
              </div>
              
              <div className="flex gap-4 w-full sm:w-auto">
                {step === 2 && (
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 sm:flex-none px-8 py-4 border-2 border-gray-100 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    Back
                  </button>
                )}
                <button 
                  disabled={selectedItems.length === 0 || isSubmitting}
                  onClick={() => step === 1 ? setStep(2) : handleSubmit({ preventDefault: () => {} } as any)}
                  className="flex-1 sm:flex-none px-12 py-4 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-600 transition-all shadow-xl shadow-sky-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {step === 1 ? 'Next' : 'Confirm Order'}
                      <ShoppingBag className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
