import React, { useState, useEffect } from 'react';
const SimpleNavbar = ({ cartCount }) => {
  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setCartBounce(true);
      setTimeout(() => setCartBounce(false), 500);
    }
  }, [cartCount]);

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Product Store
            </h1>
            <p className="text-sm text-gray-500">Discover amazing products</p>
          </div>
          
          <div className="relative">
            <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 ${cartBounce ? 'animate-bounce' : ''}`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H17M9 19v1a1 1 0 001 1h0a1 1 0 001-1v-1a1 1 0 00-1-1h0a1 1 0 00-1 1zM20 19v1a1 1 0 001 1h0a1 1 0 001-1v-1a1 1 0 00-1-1h0a1 1 0 00-1 1z" />
              </svg>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default SimpleNavbar