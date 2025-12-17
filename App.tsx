import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { AIChatBot } from './components/AIChatBot';
import { PERFUMES, FILTERS } from './constants';
import { Product, CartItem, ViewState } from './types';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [activeFilter, setActiveFilter] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = activeFilter === 'All' 
    ? PERFUMES 
    : PERFUMES.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Render content based on view
  const renderContent = () => {
    if (view === ViewState.PRODUCT_DETAILS && selectedProduct) {
      return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto animate-fade-in">
          <button 
            onClick={() => setView(ViewState.SHOP)}
            className="mb-8 text-stone-500 hover:text-gold-600 flex items-center gap-2"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Collection
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div className="aspect-[3/4] bg-stone-100 overflow-hidden">
               <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex flex-col justify-center">
              <span className="text-gold-600 uppercase tracking-widest text-sm font-semibold mb-2">{selectedProduct.brand}</span>
              <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">{selectedProduct.name}</h1>
              <p className="text-2xl text-stone-900 mb-8 font-light">${selectedProduct.price}</p>
              
              <div className="prose text-stone-600 mb-8 leading-relaxed">
                {selectedProduct.description}
              </div>

              <div className="mb-10">
                <h3 className="font-serif text-lg mb-4 text-stone-800">Olfactory Notes</h3>
                <div className="grid grid-cols-3 gap-4 border-t border-b border-stone-200 py-6">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Top</span>
                    <p className="text-stone-800 text-sm">{selectedProduct.notes.top.join(', ')}</p>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Heart</span>
                    <p className="text-stone-800 text-sm">{selectedProduct.notes.middle.join(', ')}</p>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-stone-400 mb-1">Base</span>
                    <p className="text-stone-800 text-sm">{selectedProduct.notes.base.join(', ')}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleAddToCart(selectedProduct)}
                className="w-full md:w-auto px-12 py-4 bg-stone-900 text-white uppercase tracking-widest hover:bg-gold-600 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        {view === ViewState.HOME && <Hero onShopNow={() => setView(ViewState.SHOP)} />}
        
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${view === ViewState.HOME ? 'bg-white' : ''}`} id="shop">
          {view === ViewState.HOME && (
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-4">Curated Collection</h2>
              <div className="w-24 h-1 bg-gold-400 mx-auto"></div>
            </div>
          )}

          {view === ViewState.SHOP && (
             <div className="pt-24 mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8">All Fragrances</h1>
                <div className="flex flex-wrap justify-center gap-4">
                  {FILTERS.map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-6 py-2 text-sm uppercase tracking-wider border transition-all duration-300 ${
                        activeFilter === filter 
                          ? 'border-stone-900 bg-stone-900 text-white' 
                          : 'border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
             </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {(view === ViewState.HOME ? PERFUMES.slice(0, 3) : filteredProducts).map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                onClick={(p) => {
                  setSelectedProduct(p);
                  setView(ViewState.PRODUCT_DETAILS);
                  window.scrollTo(0,0);
                }}
              />
            ))}
          </div>

          {view === ViewState.HOME && (
            <div className="mt-16 text-center">
              <button 
                onClick={() => setView(ViewState.SHOP)}
                className="inline-block border-b border-stone-900 pb-1 text-stone-900 hover:text-gold-600 hover:border-gold-600 transition-colors uppercase tracking-widest text-sm"
              >
                View All Scents
              </button>
            </div>
          )}
        </div>

        {/* Brand Promise / Footer Area */}
        <div className="bg-stone-900 text-stone-300 py-20">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h4 className="text-white font-serif text-xl mb-4">Sustainable Sourcing</h4>
              <p className="text-sm font-light leading-relaxed">We travel the globe to ethically source the finest raw ingredients, ensuring fair trade and environmental responsibility.</p>
            </div>
            <div>
              <h4 className="text-white font-serif text-xl mb-4">Artisanal Craftsmanship</h4>
              <p className="text-sm font-light leading-relaxed">Each bottle is hand-poured in small batches in our Grasse atelier, preserving the integrity of the delicate oils.</p>
            </div>
            <div>
              <h4 className="text-white font-serif text-xl mb-4">Cruelty Free</h4>
              <p className="text-sm font-light leading-relaxed">Beauty without compromise. Never tested on animals, and free from phthalates and parabens.</p>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-16 pt-8 text-center text-xs tracking-widest uppercase">
            &copy; 2024 Aura & Essence. All Rights Reserved.
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-gold-200 selection:text-stone-900">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={(v) => {
          setView(v);
          window.scrollTo(0,0);
        }}
      />
      
      <main>
        {renderContent()}
      </main>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <AIChatBot />
    </div>
  );
}

export default App;
