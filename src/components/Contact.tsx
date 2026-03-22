import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Instagram, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { siteInfo } from '../data/siteData';
import { sendEmail } from '../utils/emailService';
import { EMAIL_CONFIG } from '../utils/emailConfig';
import { buildContactEmail } from '../utils/emailTemplates';
import { validators, hasErrors } from '../utils/validation';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormTouched {
  name: boolean;
  email: boolean;
  phone: boolean;
  message: boolean;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', subject: 'General Inquiry', message: '',
  });

  const [touched, setTouched] = useState<FormTouched>({
    name: false, email: false, phone: false, message: false,
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const errors: FormErrors = {
    name:    validators.name(form.name),
    email:   validators.email(form.email),
    phone:   validators.phone(form.phone),
    message: validators.message(form.message),
  };

  const touch = (field: keyof FormTouched) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  const update = (field: keyof FormState, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Touch all fields to show errors
    setTouched({ name: true, email: true, phone: true, message: true });
    if (hasErrors(errors)) return;

    setStatus('sending');
    setErrorMsg('');

    const html = buildContactEmail({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
    });

    const result = await sendEmail({
      to_email:    EMAIL_CONFIG.CLIENT_EMAIL,
      reply_to:    form.email,
      subject:     `[Moussestruck] New message from ${form.name}`,
      html_content: html,
    });

    if (result.success) {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      setTouched({ name: false, email: false, phone: false, message: false });
      setTimeout(() => setStatus('idle'), 6000);
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Something went wrong. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputBase = "w-full px-4 py-3 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50 focus:bg-white";
  const inputOk  = inputBase + " border-gray-200";
  const inputErr = inputBase + " border-red-300 bg-red-50 focus:bg-white focus:ring-red-400";

  const field = (key: keyof FormTouched) =>
    touched[key] && errors[key] ? inputErr : inputOk;

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
            <span>📧</span> Contact Us
          </div>
          <h2 className="text-gray-900 mb-3">Get in Touch</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Have questions or want to place a special order? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 h-full">
              <h3 className="text-gray-900 mb-6 font-semibold text-lg">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { Icon: MapPin,    color: 'bg-pink-600',   label: 'Address',   value: siteInfo.address },
                  { Icon: Phone,     color: 'bg-purple-600', label: 'Phone',     value: siteInfo.phone },
                  { Icon: Instagram, color: 'bg-pink-600',   label: 'Instagram', value: siteInfo.instagram },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className={`w-11 h-11 ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <item.Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-semibold text-sm mb-0.5">{item.label}</h4>
                      <p className="text-gray-500 text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-semibold text-sm mb-0.5">Order Hours</h4>
                    <p className="text-gray-600 text-sm font-medium">{siteInfo.hours.note}</p>
                    <p className="text-gray-400 text-xs mt-0.5">Takeaway only · Payment at pickup</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16 bg-green-50 rounded-3xl border border-green-100"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4 mx-auto" />
                  </motion.div>
                  <h4 className="text-gray-900 font-bold text-xl mb-2">Message Sent! 🎉</h4>
                  <p className="text-gray-500 text-sm max-w-xs">
                    We've received your message and will get back to you shortly. Thank you!
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4"
                >
                  {/* Error banner */}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="c-name" className="block text-gray-700 text-sm font-medium mb-1.5">
                        Your Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="c-name" type="text" value={form.name}
                        onChange={e => update('name', e.target.value)}
                        onBlur={() => touch('name')}
                        className={field('name')} placeholder="Priya Sharma"
                      />
                      {touched.name && errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />{errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="c-phone" className="block text-gray-700 text-sm font-medium mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="c-phone" type="tel" value={form.phone}
                        onChange={e => update('phone', e.target.value)}
                        onBlur={() => touch('phone')}
                        className={field('phone')} placeholder="+91 98765 43210"
                      />
                      {touched.phone && errors.phone && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />{errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-email" className="block text-gray-700 text-sm font-medium mb-1.5">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="c-email" type="email" value={form.email}
                      onChange={e => update('email', e.target.value)}
                      onBlur={() => touch('email')}
                      className={field('email')} placeholder="priya@example.com"
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="c-subject" className="block text-gray-700 text-sm font-medium mb-1.5">Subject</label>
                    <select
                      id="c-subject" value={form.subject}
                      onChange={e => update('subject', e.target.value)}
                      className={inputOk}
                    >
                      <option>General Inquiry</option>
                      <option>Custom Order</option>
                      <option>Bulk / Event Order</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="c-message" className="block text-gray-700 text-sm font-medium mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="c-message" rows={4} value={form.message}
                      onChange={e => update('message', e.target.value)}
                      onBlur={() => touch('message')}
                      className={field('message') + ' resize-none'}
                      placeholder="Tell us about your order or inquiry..."
                    />
                    {touched.message && errors.message && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />{errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${
                      status === 'sending'
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                        : 'bg-pink-600 hover:bg-pink-700 text-white shadow-md'
                    }`}
                  >
                    {status === 'sending' ? (
                      <><Loader className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Message</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-3xl overflow-hidden shadow-xl h-80 sm:h-96 border border-gray-100"
        >
          <iframe
            title="Moussestruck Location"
            width="100%" height="100%"
            style={{ border: 0, display: 'block' }}
            loading="lazy" allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=Mumbai+Maharashtra+India&output=embed&z=12"
          />
        </motion.div>
      </div>
    </section>
  );
}
