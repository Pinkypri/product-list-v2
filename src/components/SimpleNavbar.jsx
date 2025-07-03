import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
const SimpleNavbar = ({ cartCount }) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-[--color-dark-gray] font-[--font-raleway]">
            Product Store
          </h1>

          <div className="relative">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <FiShoppingCart size={20} className="text-white" />
            </div>

        {cartCount > 0 && (
  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
    {cartCount}
  </span>
)}

          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
