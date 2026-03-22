import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Facebook, Twitter, Heart, Clock, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { siteInfo, navLinks } from '../data/siteData';
import { sendEmail } from '../utils/emailService';
import { EMAIL_CONFIG } from '../utils/emailConfig';
import { buildNewsletterEmail, buildNewSubscriberEmail } from '../utils/emailTemplates';
import { validators } from '../utils/validation';

export function Footer() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const emailError = validators.newsletterEmail(email);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (emailError) return;

    setStatus('sending');
    setErrorMsg('');

    // Send welcome email to subscriber
    const welcomeResult = await sendEmail({
      to_email:     email,
      reply_to:     EMAIL_CONFIG.CLIENT_EMAIL,
      subject:      '🍮 Welcome to Moussestruck — You\'re in the sweet club!',
      html_content: buildNewsletterEmail(email),
    });

    // Send new subscriber notification to client
    await sendEmail({
      to_email:     EMAIL_CONFIG.CLIENT_EMAIL,
      subject:      `🎊 New Subscriber: ${email}`,
      html_content: buildNewSubscriberEmail(email),
    });

    if (welcomeResult.success) {
      setStatus('success');
      setEmail('');
      setTouched(false);
      setTimeout(() => setStatus('idle'), 6000);
    } else {
      setStatus('error');
      setErrorMsg(welcomeResult.error || 'Could not subscribe. Please try again.');
      setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 5000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-pink-400 text-2xl">🍮</span>
              <span className="text-white font-bold text-xl">{siteInfo.brandName}</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-5">
              {siteInfo.description}
            </p>
            <div className="flex items-start gap-2 bg-gray-800 rounded-xl px-4 py-3 mb-5 max-w-xs">
              <Clock className="w-4 h-4 text-pink-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-semibold">{siteInfo.hours.note}</p>
                <p className="text-gray-400 text-xs mt-0.5">Takeaway only · Pay at pickup</p>
              </div>
            </div>
            <div className="flex gap-3">
              {[
                { href: 'https://www.instagram.com/moussestruck/', Icon: Instagram, label: 'Instagram' },
                { href: '#', Icon: Facebook, label: 'Facebook' },
                { href: '#', Icon: Twitter,  label: 'Twitter'  },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-pink-400 transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href={`tel:${siteInfo.phone}`} className="text-gray-400 hover:text-pink-400 transition-colors">{siteInfo.phone}</a></li>
              <li className="text-gray-400 text-xs leading-relaxed">{siteInfo.address}</li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mb-8 bg-gray-800 rounded-2xl p-5 text-center max-w-lg mx-auto">
          <h4 className="text-white font-bold text-lg mb-1">Stay Sweet! 🍮</h4>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe for exclusive offers, new flavour announcements, and behind-the-scenes stories.
          </p>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 bg-green-900/40 border border-green-700 text-green-400 rounded-xl px-5 py-3 text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Subscribed! Check your inbox for a welcome email 🎉</span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubscribe}
                noValidate
                className="space-y-2 max-w-md mx-auto"
              >
                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-900/40 border border-red-700 text-red-400 rounded-xl px-4 py-2.5 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder="Enter your email address"
                    className={`flex-1 px-4 py-2.5 rounded-full text-sm transition-all focus:outline-none focus:ring-2 ${
                      touched && emailError
                        ? 'bg-red-900/30 border border-red-600 text-white placeholder-red-400 focus:ring-red-500'
                        : 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-pink-500'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex items-center justify-center gap-2 ${
                      status === 'sending'
                        ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                        : 'bg-pink-600 hover:bg-pink-700 text-white shadow-md'
                    }`}
                  >
                    {status === 'sending'
                      ? <><Loader className="w-4 h-4 animate-spin" /> Subscribing...</>
                      : 'Subscribe'}
                  </button>
                </div>
                {touched && emailError && (
                  <p className="text-xs text-red-400 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" />{emailError}
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {siteInfo.brandName}. All rights reserved. · Takeaway Only
          </p>
          <p className="text-gray-500 text-xs flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> for dessert lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
