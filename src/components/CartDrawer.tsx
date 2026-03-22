import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, AlertCircle, Clock } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { siteInfo } from '../data/siteData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const { user } = useAuth();

  const now = new Date();
  const hour = now.getHours();
  const isWithinOrderHours = hour >= siteInfo.orderHoursStart && hour < siteInfo.orderHoursEnd;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6" />
                <div>
                  <h3 className="text-white font-semibold">Shopping Cart</h3>
                  <p className="text-white/80 text-sm">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <button onClick={onClose} className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Outside hours notice */}
            {!isWithinOrderHours && (
              <div className="mx-4 mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 text-sm flex-shrink-0">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>We're currently closed.</strong> Orders are accepted {siteInfo.hours.note}. You can review your cart but checkout is disabled.
                </span>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-12 h-12 text-gray-300" />
                  </div>
                  <h4 className="text-gray-900 font-semibold mb-2">Your cart is empty</h4>
                  <p className="text-gray-500 text-sm mb-6">Add some delicious desserts to get started!</p>
                  <button onClick={onClose} className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:from-pink-700 hover:to-purple-700 transition-all text-sm font-medium">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -80 }}
                      className="bg-gray-50 rounded-2xl p-3 flex gap-3"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1.5">
                          <div className="min-w-0 pr-2">
                            <h4 className="text-gray-900 text-sm font-semibold truncate">{item.name}</h4>
                            <p className="text-pink-600 text-sm font-medium">{item.price}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors border border-gray-200">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-gray-900 text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors border border-gray-200">
                            <Plus className="w-3 h-3" />
                          </button>
                          <span className="ml-auto text-gray-600 text-sm font-medium">
                            ₹{(item.priceValue * item.quantity).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-4 sm:p-6 space-y-3 flex-shrink-0">
                {/* Takeaway disclaimer */}
                <div className="flex items-start gap-2 bg-pink-50 border border-pink-100 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-pink-700 leading-relaxed">
                    <strong>Takeaway only.</strong> No delivery yet — collect your order from us. Payment at pickup. 🛍️
                  </div>
                </div>

                {/* Total */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Subtotal ({cartCount} item{cartCount > 1 ? 's' : ''})</span>
                    <span>₹{cartTotal.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-base border-t border-gray-100 pt-2">
                    <span className="text-gray-900">Total</span>
                    <span className="text-pink-600 text-lg">₹{cartTotal.toFixed(0)}</span>
                  </div>
                </div>

                {/* Checkout — disabled outside hours */}
                {isWithinOrderHours ? (
                  <button
                    onClick={onCheckout}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3.5 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all shadow-md font-semibold"
                  >
                    Place Order — ₹{cartTotal.toFixed(0)}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button disabled className="w-full bg-gray-200 text-gray-400 py-3.5 rounded-xl font-semibold cursor-not-allowed">
                      Ordering Unavailable Right Now
                    </button>
                    <p className="text-center text-xs text-gray-400">
                      Come back between {siteInfo.hours.note}
                    </p>
                  </div>
                )}

                {user && isWithinOrderHours && (
                  <p className="text-center text-xs text-gray-400">
                    Pickup by: <span className="text-gray-600 font-medium">{user.name}</span>
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
