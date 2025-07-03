import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-100 object-fit rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600 font-bold mt-1">${product.price}</p>

      <button
        onClick={() => onAddToCart(product)}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"

      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
