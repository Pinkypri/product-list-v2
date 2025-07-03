import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SimpleNavbar from '../components/SimpleNavbar';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [notification, setNotification] = useState('');

  const fetchProducts = async () => {
    try {
   
        setLoading(true);
      setError(null);
      const response = await fetch('https://e-com-test-yhv0.onrender.com/api/products');
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

  const addToCart = async (product) => {
    setAddingToCart(true);
    
    // Simulate adding to cart delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
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
    
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
    setAddingToCart(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  const ErrorMessage = () => (
    <div className="text-center py-12 bg-white rounded-lg shadow-md mx-4">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mb-6">
        {error || 'Unable to load products. Please try again later.'}
      </p>
      <button
        onClick={fetchProducts}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Try Again
      </button>
    </div>
  );

  const EmptyState = () => (
    <div className="text-center py-12 bg-white rounded-lg shadow-md mx-4">
      <div className="text-gray-400 text-6xl mb-4">📦</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        No Products Found
      </h2>
      <p className="text-gray-600">
        We couldn't find any products at the moment. Please check back later!
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <SimpleNavbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {notification}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8 flex-1">
        {loading && <LoadingSpinner />}
        {error && !loading && <ErrorMessage />}
        {!loading && !error && products.length === 0 && <EmptyState />}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Featured Products
              </h2>
              <p className="text-gray-600 text-lg">
                Discover our collection of {products.length} amazing products
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                  isAdding={addingToCart}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="bg-white border-t shadow-lg">
        <div className="container mx-auto px-4">
          <div className="py-8 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Store</h3>
            <p className="text-gray-600 mb-4">
              Your one-stop shop for amazing products
            </p>
            <div className="flex justify-center space-x-6 text-gray-500">
              <span>© 2025 Product Store</span>
              <span>•</span>
              <span>Built with React & Node</span>
          
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
};

export default HomePage;