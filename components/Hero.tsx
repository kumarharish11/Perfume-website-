import React from 'react';
import { ViewState } from '../types';

interface HeroProps {
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative h-screen min-h-[600px] w-full bg-stone-100 flex items-center justify-center overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-100/50 blur-3xl opacity-60"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="block text-gold-600 tracking-[0.2em] uppercase text-sm font-semibold mb-6 animate-fade-in-up">
          Discover Your Signature Scent
        </span>
        <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-tight mb-8">
          Fragrance is the invisible <br className="hidden md:block"/> body suit.
        </h1>
        <p className="text-stone-600 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
          Explore our curated collection of artisanal perfumes, crafted to evoke emotion and memory.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onShopNow}
            className="px-8 py-4 bg-stone-900 text-white text-sm uppercase tracking-widest hover:bg-gold-600 transition-colors duration-300 w-full sm:w-auto"
          >
            Shop Collection
          </button>
          <button className="px-8 py-4 border border-stone-900 text-stone-900 text-sm uppercase tracking-widest hover:bg-stone-100 transition-colors duration-300 w-full sm:w-auto">
            Our Story
          </button>
        </div>
      </div>
      
      {/* Abstract visual element */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-10 pointer-events-none hidden lg:block">
         <img src="https://picsum.photos/seed/flower/800/1200" alt="Abstract Flower" className="object-cover w-full h-full mix-blend-multiply" />
      </div>
    </div>
  );
};
