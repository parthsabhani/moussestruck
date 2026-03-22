import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, ShoppingCart, User, LogOut } from 'lucide-react';
import { navLinks, siteInfo } from '../data/siteData';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  onAuthClick: () => void;
}

export function Header({ onCartClick, onAuthClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="text-pink-600 text-2xl">🍮</span>
            <span className="text-gray-900 font-semibold text-lg group-hover:text-pink-600 transition-colors">
              {siteInfo.brandName}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-pink-600 transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/moussestruck/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative flex items-center gap-2 bg-pink-100 text-pink-600 px-3 sm:px-4 py-2 rounded-full hover:bg-pink-200 transition-colors text-sm font-medium"
              aria-label={`Cart (${cartCount} items)`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-pink-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Hi, <span className="text-pink-600 font-medium">{user?.name.split(' ')[0]}</span>
                </span>
                <button
                  onClick={logout}
                  className="flex items-center justify-center w-9 h-9 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden sm:flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors text-sm font-medium"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-colors px-3 py-2.5 rounded-xl font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-2 border-t border-gray-100 space-y-2">
                <a
                  href="https://www.instagram.com/moussestruck/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-pink-600 px-3 py-2.5 rounded-xl"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-sm font-medium">Follow on Instagram</span>
                </a>

                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-600">
                      Logged in as <span className="text-pink-600 font-medium">{user?.name}</span>
                    </div>
                    <button
                      onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { onAuthClick(); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white px-4 py-2.5 rounded-xl hover:bg-pink-700 transition-colors text-sm font-medium"
                  >
                    <User className="w-4 h-4" />
                    Login / Register
                  </button>
                )}
              </div>

              {/* Hours notice in mobile menu */}
              <div className="px-3 py-2 text-xs text-gray-400 text-center">
                🕐 Orders: {siteInfo.hours.note} · Takeaway only
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
