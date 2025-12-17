import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 z-[60] overflow-hidden pointer-events-none ${isOpen ? 'pointer-events-auto' : ''}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div 
        className={`absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <h2 className="text-2xl font-serif text-stone-900">Your Cart</h2>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400">
              <p className="mb-4">Your bag is empty.</p>
              <button onClick={onClose} className="text-gold-600 underline text-sm uppercase tracking-wider">Start Shopping</button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-stone-100 flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-stone-900">{item.name}</h3>
                        <p className="text-sm font-medium text-stone-900">${item.price * item.quantity}</p>
                      </div>
                      <p className="text-xs text-stone-500 uppercase tracking-wide">{item.brand}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-stone-200">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 text-stone-500 hover:bg-stone-50"
                        >-</button>
                        <span className="px-2 text-sm text-stone-900">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 text-stone-500 hover:bg-stone-50"
                        >+</button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)} 
                        className="text-xs text-stone-400 hover:text-red-500 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-600 uppercase tracking-wider text-sm">Subtotal</span>
              <span className="text-xl font-serif text-stone-900">${total}</span>
            </div>
            <p className="text-xs text-stone-500 mb-6 text-center">Shipping & taxes calculated at checkout</p>
            <button className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest text-sm hover:bg-gold-600 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
