import React, { useState, useEffect } from 'react';

const ProductCard = ({ product, onAddToCart, isAdding }) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition-all duration-300 hover:scale-105">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-58 object-fit rounded-lg transition-transform duration-300 hover:scale-110"
        />
        {justAdded && (
          <div className="absolute inset-0 bg-green-500 bg-opacity-80 flex items-center justify-center rounded-lg animate-pulse">
            <div className="text-white text-center">
              <div className="text-2xl mb-1">✓</div>
              <div className="text-sm font-medium">Added!</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
        <p className="text-xl font-bold text-green-600 mt-2">${product.price}</p>
        
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`mt-4 w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            justAdded 
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md active:scale-95'
          } ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {justAdded ? 'Added to Cart!' : isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;