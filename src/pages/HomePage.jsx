import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SimpleNavbar from '../components/SimpleNavbar';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://product-list-v2-1zoq.vercel.ap/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(data.Product);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      return existing
        ? prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-[--color-primary] border-t-transparent"></div>
    </div>
  );

  const ErrorMessage = () => (
    <div className="text-center py-12">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-[--color-dark-gray] mb-2 font-[--font-raleway]">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mb-4 font-[--font-roboto]">
        {error || 'Unable to load products. Please try again later.'}
      </p>
      <button
        onClick={fetchProducts}
        className="bg-[--color-primary] hover:bg-[--color-primary]/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 font-[--font-raleway]"
      >
        Try Again
      </button>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="text-gray-400 text-6xl mb-4">📦</div>
      <h2 className="text-2xl font-bold text-[--color-dark-gray] mb-2 font-[--font-raleway]">
        No Products Found
      </h2>
      <p className="text-gray-600 font-[--font-roboto]">
        We couldn't find any products at the moment. Please check back later!
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SimpleNavbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />

      <main className="container py-8 flex-1">
        {loading && <LoadingSpinner />}
        {error && !loading && <ErrorMessage />}
        {!loading && !error && products.length === 0 && <EmptyState />}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[--color-dark-gray] font-[--font-raleway]">
                Featured Products
              </h2>
              <p className="text-gray-600 mt-1 font-[--font-roboto]">
                {products.length} products available
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="bg-white border-t">
        <div className="container">
          <p className="text-center text-gray-600 py-4 font-[--font-roboto]">
            © 2024 Product Store. Built with React & Express.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
