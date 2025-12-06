import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [notes, setNotes] = useState('');

  const deliveryFee = 5.00;
  const total = cartTotal + deliveryFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Generate order details
    const orderNumber = Math.floor(2000 + Math.random() * 1000);
    const orderDate = new Date();
    const orderDateTime = orderDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Build order items list
    const orderItems = cart.map(item => 
      `${item.name} - Qty: ${item.quantity} - ${item.price} each`
    ).join('\n');

    // Create email
    const emailSubject = `Order No ${orderNumber} - ${orderDateTime}`;
    const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { background: #ffffff; padding: 30px; border: 2px solid #f3f4f6; border-top: none; border-radius: 0 0 10px 10px; }
    .order-box { background: #fef3f8; border-left: 4px solid #ec4899; padding: 20px; margin: 20px 0; border-radius: 5px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
    .detail-row:last-child { border-bottom: none; }
    .label { font-weight: bold; color: #6b7280; }
    .value { color: #111827; }
    .total { background: #ec4899; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 20px; font-weight: bold; margin: 20px 0; }
    .items { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
    .item:last-child { border-bottom: none; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size: 24px;">🍮</div>
      <h1>Moussestruck</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Order Confirmation</p>
    </div>
    
    <div class="content">
      <div class="order-box">
        <h2 style="color: #ec4899; margin-top: 0;">Order #${orderNumber}</h2>
        <p style="margin: 5px 0;"><strong>Date & Time:</strong> ${orderDateTime}</p>
        <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: #059669;">Confirmed</span></p>
      </div>

      <h3 style="color: #111827;">Customer Details</h3>
      <div class="items">
        <div class="detail-row">
          <span class="label">Name:</span>
          <span class="value">${user?.name}</span>
        </div>
        <div class="detail-row">
          <span class="label">Email:</span>
          <span class="value">${user?.email}</span>
        </div>
        <div class="detail-row">
          <span class="label">Phone:</span>
          <span class="value">${user?.phone}</span>
        </div>
        <div class="detail-row">
          <span class="label">Delivery Address:</span>
          <span class="value">${user?.address}</span>
        </div>
      </div>

      <h3 style="color: #111827;">Order Items</h3>
      <div class="items">
        ${cart.map(item => `
          <div class="item">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <strong>${item.name}</strong>
              <span>${item.price}</span>
            </div>
            <div style="color: #6b7280; font-size: 14px;">
              Quantity: ${item.quantity} | Subtotal: $${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
            </div>
          </div>
        `).join('')}
      </div>

      ${notes ? `
        <h3 style="color: #111827;">Special Instructions</h3>
        <div class="items">
          <p style="margin: 0;">${notes}</p>
        </div>
      ` : ''}

      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <div class="detail-row">
          <span class="label">Subtotal:</span>
          <span class="value">$${cartTotal.toFixed(2)}</span>
        </div>
        <div class="detail-row">
          <span class="label">Delivery Fee:</span>
          <span class="value">$${deliveryFee.toFixed(2)}</span>
        </div>
      </div>

      <div class="total">
        Total Amount: $${total.toFixed(2)}
      </div>

      <p style="text-align: center; color: #6b7280; margin: 30px 0;">
        Thank you for your order! We'll prepare your delicious mousse desserts with love and care.
      </p>

      <div style="background: #fef3f8; padding: 15px; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #ec4899; font-weight: bold;">📞 Need Help?</p>
        <p style="margin: 5px 0 0 0; color: #6b7280;">Contact us at: hello@moussestruck.com</p>
      </div>
    </div>

    <div class="footer">
      <p>Made with 💖 by Moussestruck</p>
      <p>123 Dessert Lane, Sweet City, SC 12345</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:thatsit120802@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Store order in localStorage
      const orders = JSON.parse(localStorage.getItem('moussestruck_orders') || '[]');
      orders.push({
        orderNumber,
        date: orderDateTime,
        items: cart,
        total,
        customer: user,
        notes,
      });
      localStorage.setItem('moussestruck_orders', JSON.stringify(orders));

      // Open email client
      window.location.href = mailtoLink;

      // Clear cart and close
      setTimeout(() => {
        clearCart();
        setIsSuccess(false);
        setNotes('');
        onClose();
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6 rounded-t-3xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-6 h-6" />
                    <h3 className="text-white">Checkout</h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Customer Info */}
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6">
                    <h4 className="text-gray-900 mb-4">Delivery Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">Name:</span> <span className="text-gray-900">{user?.name}</span></p>
                      <p><span className="text-gray-600">Email:</span> <span className="text-gray-900">{user?.email}</span></p>
                      <p><span className="text-gray-600">Phone:</span> <span className="text-gray-900">{user?.phone}</span></p>
                      <p><span className="text-gray-600">Address:</span> <span className="text-gray-900">{user?.address}</span></p>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="mb-6">
                    <h4 className="text-gray-900 mb-4">Order Summary</h4>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 pb-3 border-b border-gray-200">
                          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="text-gray-900 text-sm">{item.name}</h5>
                            <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-900">${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>${deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-900 pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-pink-600">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <form onSubmit={handlePlaceOrder} className="space-y-6">
                    <div>
                      <label htmlFor="notes" className="block text-gray-700 mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent transition-all resize-none"
                        placeholder="Any special requests or dietary requirements..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isProcessing}
                      whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                      whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                      className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-3 ${
                        isProcessing
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
                      } text-white shadow-lg`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing Order...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          <span>Place Order - ${total.toFixed(2)}</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>
                <h3 className="text-gray-900 mb-3">Order Placed Successfully!</h3>
                <p className="text-gray-600 mb-4">
                  Thank you for your order! Check your email for confirmation details.
                </p>
                <div className="flex gap-2 justify-center text-3xl">
                  {['🎉', '🍮', '💖', '✨'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
