import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onClick }) => {
  return (
    <div className="group relative flex flex-col items-center">
      <div 
        className="relative w-full aspect-[3/4] overflow-hidden bg-stone-100 cursor-pointer mb-4"
        onClick={() => onClick(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-stone-900 text-[10px] uppercase tracking-widest px-3 py-1">
            New
          </span>
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full bg-white/95 backdrop-blur shadow-lg py-3 text-stone-900 text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-white transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="text-center cursor-pointer" onClick={() => onClick(product)}>
        <h3 className="text-lg font-serif text-stone-900 mb-1">{product.name}</h3>
        <p className="text-xs text-stone-500 uppercase tracking-wide mb-2">{product.brand}</p>
        <span className="text-stone-900 font-medium">${product.price}</span>
      </div>
    </div>
  );
};
