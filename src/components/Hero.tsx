import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { siteInfo } from '../data/siteData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Static background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40" />
        <div className="absolute top-40 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40" />
        <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30" />
      </div>

      {/* Content — z-10 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
              <span>✨</span>
              Artisanal Mousse Desserts
            </div>

            <h1 className="text-gray-900 mb-5 font-bold leading-tight">
              {siteInfo.tagline}
            </h1>

            <p className="text-gray-500 mb-4 max-w-lg mx-auto md:mx-0 leading-relaxed">
              {siteInfo.description}
            </p>

            <div className="inline-flex items-center gap-2 mb-7 px-4 py-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm font-medium">
              <span>🕐</span>
              Orders: {siteInfo.hours.note} · Takeaway only
            </div>

            {/* Single CTA */}
            <div className="flex justify-center md:justify-start">
              <a
                href="#menu"
                className="inline-block bg-pink-600 text-white px-10 py-3.5 rounded-full hover:bg-pink-700 transition-colors shadow-lg font-semibold text-base"
              >
                Order Now 🍮
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xs mx-auto md:mx-0">
              {[
                { value: '500+', label: 'Happy Customers' },
                { value: '15+', label: 'Flavours' },
                { value: '5★', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="text-pink-600 text-xl font-bold">{stat.value}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — image grid with subtle static rotation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="relative hidden sm:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div
                className="h-56 rounded-2xl overflow-hidden shadow-xl"
                style={{ transform: 'rotate(1.5deg)' }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBtb3Vzc2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDY2OTg5OHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Chocolate Mousse"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div
                className="h-56 mt-8 rounded-2xl overflow-hidden shadow-xl"
                style={{ transform: 'rotate(-2deg)' }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1558234469-50fc184d1cc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwZGVzc2VydHxlbnwxfHx8fDE3NjQ2MDQ5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Strawberry Dessert"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div
                className="h-44 col-span-2 rounded-2xl overflow-hidden shadow-xl"
                style={{ transform: 'rotate(0.5deg)' }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1741244133042-970251e76066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZGVzc2VydCUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjQ2Njk4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Elegant Dessert"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — z-20 ensures it's always above image grid */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <a
          href="#menu"
          className="flex flex-col items-center gap-1 text-gray-400 hover:text-pink-600 transition-colors"
        >
          <span className="text-xs font-medium tracking-wide">Scroll Down</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
