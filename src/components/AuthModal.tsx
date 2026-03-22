import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Phone, MapPin, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register } = useAuth();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '', email: '', password: '', confirmPassword: '', phone: '', address: '',
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(loginData.email, loginData.password);
    setIsSubmitting(false);
    if (success) { setLoginData({ email: '', password: '' }); onClose(); }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (registerData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    setIsSubmitting(true);
    const success = await register({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      phone: registerData.phone,
      address: registerData.address,
    });
    setIsSubmitting(false);
    if (success) {
      setRegisterData({ name: '', email: '', password: '', confirmPassword: '', phone: '', address: '' });
      onClose();
    }
  };

  const inputClass = "w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-sm";
  const iconClass = "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400";

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
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6 rounded-t-3xl flex items-center justify-between z-10">
              <div>
                <h3 className="text-white font-semibold">
                  {mode === 'login' ? 'Welcome Back!' : 'Join Moussestruck'}
                </h3>
                <p className="text-white/75 text-xs mt-0.5">
                  {mode === 'login' ? 'Login to place your order' : 'Create an account to get started'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {/* Mode Toggle */}
              <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl">
                {(['login', 'register'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-2.5 rounded-lg transition-all text-sm font-medium ${
                      mode === m ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {m === 'login' ? 'Login' : 'Register'}
                  </button>
                ))}
              </div>

              {/* Login Form */}
              {mode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className={iconClass} />
                      <input type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required className={inputClass} placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className={iconClass} />
                      <input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required className={inputClass} placeholder="••••••••" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 font-medium ${isSubmitting ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-md'}`}
                  >
                    {isSubmitting ? <><div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" /><span>Logging in...</span></> : <><LogIn className="w-4 h-4" /><span>Login</span></>}
                  </button>
                </form>
              )}

              {/* Register Form */}
              {mode === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {[
                    { id: 'name', label: 'Full Name', type: 'text', Icon: User, placeholder: 'Priya Sharma', field: 'name' as const },
                    { id: 'email', label: 'Email Address', type: 'email', Icon: Mail, placeholder: 'you@example.com', field: 'email' as const },
                    { id: 'phone', label: 'Phone Number', type: 'tel', Icon: Phone, placeholder: '+91 98765 43210', field: 'phone' as const },
                    { id: 'address', label: 'Your Address', type: 'text', Icon: MapPin, placeholder: 'Flat No, Building, Area, City', field: 'address' as const },
                  ].map(({ id, label, type, Icon, placeholder, field }) => (
                    <div key={id}>
                      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-1.5">{label}</label>
                      <div className="relative">
                        <Icon className={iconClass} />
                        <input type={type} id={id} value={registerData[field]} onChange={(e) => setRegisterData({ ...registerData, [field]: e.target.value })} required className={inputClass} placeholder={placeholder} />
                      </div>
                    </div>
                  ))}
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className={iconClass} />
                      <input type="password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} required minLength={6} className={inputClass} placeholder="Min. 6 characters" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock className={iconClass} />
                      <input type="password" value={registerData.confirmPassword} onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} required className={inputClass} placeholder="••••••••" />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 font-medium ${isSubmitting ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-md'}`}
                  >
                    {isSubmitting ? <><div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" /><span>Creating account...</span></> : <><UserPlus className="w-4 h-4" /><span>Create Account</span></>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
