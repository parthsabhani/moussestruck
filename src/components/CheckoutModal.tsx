import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, CheckCircle, Clock, AlertCircle, Loader } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { siteInfo } from '../data/siteData';
import { sendEmail } from '../utils/emailService';
import { EMAIL_CONFIG } from '../utils/emailConfig';
import { buildOrderEmail } from '../utils/emailTemplates';
import { validators } from '../utils/validation';

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
  const [orderNum, setOrderNum] = useState<number | null>(null);
  const [sendError, setSendError] = useState('');

  const now = new Date();
  const hour = now.getHours();
  const isWithinOrderHours = hour >= siteInfo.orderHoursStart && hour < siteInfo.orderHoursEnd;

  const formatIST = (d: Date) =>
    d.toLocaleString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
      timeZone: 'Asia/Kolkata',
    });

  // Validate user has all required fields before allowing order
  const missingFields: string[] = [];
  if (!user?.name) missingFields.push('name');
  if (!user?.email || validators.email(user.email)) missingFields.push('email');
  if (!user?.phone || validators.phoneRequired(user.phone)) missingFields.push('phone');
  if (!user?.address || validators.address(user.address)) missingFields.push('address');

  const canOrder = isWithinOrderHours && cart.length > 0 && missingFields.length === 0;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canOrder || isProcessing) return;

    setIsProcessing(true);
    setSendError('');

    const orderNumber = Math.floor(2000 + Math.random() * 1000);
    const orderDateTime = formatIST(new Date());

    const html = buildOrderEmail({
      orderNumber,
      orderDateTime,
      customerName:    user!.name,
      customerEmail:   user!.email,
      customerPhone:   user!.phone,
      customerAddress: user!.address,
      cart,
      cartTotal,
      notes: notes.trim() || undefined,
    });

    // Send to client
    const clientResult = await sendEmail({
      to_email:     EMAIL_CONFIG.CLIENT_EMAIL,
      reply_to:     user!.email,
      subject:      `🍮 New Order #${orderNumber} — ${user!.name} — ₹${cartTotal.toFixed(0)}`,
      html_content: html,
    });

    // Send confirmation to customer
    await sendEmail({
      to_email:     user!.email,
      reply_to:     EMAIL_CONFIG.CLIENT_EMAIL,
      subject:      `Your Moussestruck Order #${orderNumber} is Confirmed! 🍮`,
      html_content: html,
    });

    setIsProcessing(false);

    if (clientResult.success) {
      setOrderNum(orderNumber);
      setIsSuccess(true);

      // Save to local order history
      const orders = JSON.parse(localStorage.getItem('moussestruck_orders') || '[]');
      orders.push({ orderNumber, date: orderDateTime, items: cart, total: cartTotal, customer: user, notes });
      localStorage.setItem('moussestruck_orders', JSON.stringify(orders));

      setTimeout(() => {
        clearCart();
        setIsSuccess(false);
        setNotes('');
        onClose();
      }, 4000);
    } else {
      setSendError('Could not send your order. Please try again or call us directly at ' + siteInfo.phone);
    }
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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
          >
            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5" />
                    <h3 className="text-white font-semibold">Confirm Order</h3>
                  </div>
                  <button onClick={onClose} className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 space-y-5">

                  {/* Hard block: outside hours */}
                  {!isWithinOrderHours && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
                      <Clock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-800 font-semibold text-sm">Orders are currently closed</p>
                        <p className="text-red-600 text-sm mt-0.5">
                          We accept orders <strong>{siteInfo.hours.note}</strong>. Come back during these hours.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Send error */}
                  {sendError && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-4">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm">{sendError}</p>
                    </div>
                  )}

                  {/* Takeaway notice */}
                  <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      <strong>Takeaway Only.</strong> Pay ₹{cartTotal.toFixed(0)} at pickup. We'll call you on <strong>{user?.phone}</strong> to confirm timing. A confirmation email will be sent to <strong>{user?.email}</strong>.
                    </p>
                  </div>

                  {/* Customer info */}
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-5">
                    <h4 className="text-gray-700 font-semibold text-xs uppercase tracking-wider mb-3">Your Details</h4>
                    <div className="grid sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm">
                      <p><span className="text-gray-500">Name:</span> <span className="text-gray-900 font-medium ml-1">{user?.name}</span></p>
                      <p><span className="text-gray-500">Phone:</span> <span className="text-gray-900 ml-1">{user?.phone}</span></p>
                      <p className="sm:col-span-2"><span className="text-gray-500">Email:</span> <span className="text-gray-900 ml-1">{user?.email}</span></p>
                      <p className="sm:col-span-2"><span className="text-gray-500">Address:</span> <span className="text-gray-900 ml-1">{user?.address}</span></p>
                    </div>
                    {missingFields.length > 0 && (
                      <p className="mt-3 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                        ⚠️ Your profile is missing: <strong>{missingFields.join(', ')}</strong>. Please update your account.
                      </p>
                    )}
                  </div>

                  {/* Order summary */}
                  <div>
                    <h4 className="text-gray-700 font-semibold text-xs uppercase tracking-wider mb-3">Order Summary</h4>
                    <div className="space-y-2">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center">
                          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-900 text-sm font-semibold truncate">{item.name}</p>
                            <p className="text-gray-500 text-xs">Qty: {item.quantity} × {item.price}</p>
                          </div>
                          <span className="text-gray-900 font-semibold text-sm flex-shrink-0">
                            ₹{(item.priceValue * item.quantity).toFixed(0)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-gray-900 font-semibold">Total (Pay at Pickup)</span>
                      <span className="text-pink-600 text-xl font-bold">₹{cartTotal.toFixed(0)}</span>
                    </div>
                  </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    <div>
                      <label htmlFor="notes" className="block text-gray-700 text-sm font-medium mb-2">
                        Special Instructions <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        id="notes" value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none text-sm bg-gray-50 focus:bg-white"
                        placeholder="Allergies, flavour preferences, gift notes..."
                        disabled={!canOrder}
                      />
                    </div>

                    {canOrder ? (
                      <>
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className={`w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 font-semibold ${
                            isProcessing
                              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                              : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-md'
                          }`}
                        >
                          {isProcessing ? (
                            <><Loader className="w-4 h-4 animate-spin" /><span>Placing Order...</span></>
                          ) : (
                            <><ShoppingBag className="w-4 h-4" /><span>Confirm Order — ₹{cartTotal.toFixed(0)}</span></>
                          )}
                        </button>
                        <p className="text-center text-xs text-gray-400">
                          Confirmation will be emailed to {user?.email}
                        </p>
                      </>
                    ) : (
                      <div className="bg-gray-100 rounded-xl p-4 text-center">
                        <p className="text-gray-500 text-sm font-medium">
                          {!isWithinOrderHours
                            ? `Ordering unavailable · Come back ${siteInfo.hours.note}`
                            : cart.length === 0
                            ? 'Your cart is empty'
                            : 'Please complete your profile details to order'}
                        </p>
                      </div>
                    )}
                  </form>
                </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5"
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-gray-900 font-bold mb-2 text-xl">Order Placed! 🎉</h3>
                {orderNum && <p className="text-pink-600 font-semibold text-sm mb-2">Order #{orderNum}</p>}
                <p className="text-gray-500 text-sm mb-1">
                  Confirmation sent to <strong>{user?.email}</strong>
                </p>
                <p className="text-gray-400 text-xs">
                  Our team will call you at <strong>{user?.phone}</strong> to arrange pickup.
                </p>
                <div className="flex gap-1.5 justify-center text-2xl mt-5">
                  {['🎉', '🍮', '💖', '✨'].map((emoji, i) => (
                    <motion.span key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
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
