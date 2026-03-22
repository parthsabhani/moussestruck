import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Star, Clock } from 'lucide-react';
import { products, categories, siteInfo } from '../data/siteData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Toast } from './Toast';

interface MenuProps {
  onAuthRequired: () => void;
}

export function Menu({ onAuthRequired }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const now = new Date();
  const hour = now.getHours();
  const isWithinOrderHours = hour >= siteInfo.orderHoursStart && hour < siteInfo.orderHoursEnd;

  const handleAddToCart = (product: any) => {
    if (!isAuthenticated) { onAuthRequired(); return; }
    if (!isWithinOrderHours) {
      setToastMessage(`Orders open ${siteInfo.hours.note}`);
      setShowToast(true);
      return;
    }
    addToCart(product);
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="menu" className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
            <span>🍮</span>
            Our Menu
          </div>
          <h2 className="text-gray-900 mb-3">Our Delicious Menu</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Each mousse is handcrafted with love and the finest ingredients. Choose your favourite or try them all!
          </p>
        </motion.div>

        {/* Hours banner */}
        <div className={`mb-8 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium max-w-sm mx-auto ${
          isWithinOrderHours
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-amber-50 border border-amber-200 text-amber-800'
        }`}>
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>
            {isWithinOrderHours ? '✅ Open for orders now!' : `⏰ Orders: ${siteInfo.hours.note}`}
          </span>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-200'
                  : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-100 shadow-sm'
              }`}
            >
              <span className="mr-1.5">{category.emoji}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg text-sm font-semibold transition-colors ${
                        isWithinOrderHours && isAuthenticated
                          ? 'bg-white text-pink-600 hover:bg-pink-600 hover:text-white'
                          : 'bg-white/80 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {!isAuthenticated ? 'Login to Order' : isWithinOrderHours ? 'Add to Cart' : 'Closed Now'}
                    </button>
                  </div>

                  {product.badge && (
                    <div className="absolute top-3 right-3 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-1.5">
                    <h3 className="text-gray-900 font-bold text-base">{product.name}</h3>
                    <div className="flex items-center gap-0.5 bg-yellow-50 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-gray-600 font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs mb-4 leading-relaxed">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-pink-600 font-bold text-lg">{product.price}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        isWithinOrderHours
                          ? 'bg-pink-100 text-pink-600 hover:bg-pink-600 hover:text-white'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      title={!isWithinOrderHours ? `Orders open ${siteInfo.hours.note}` : undefined}
                    >
                      {!isAuthenticated ? 'Login to Order' : isWithinOrderHours ? 'Add to Cart' : 'Closed'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Toast
        message={toastMessage}
        type={toastMessage.includes('added') ? 'success' : 'info'}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}
