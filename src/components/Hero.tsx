import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { siteInfo } from '../data/siteData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            className="text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 200
              }}
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-pink-100 text-pink-700 rounded-full"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                ✨
              </motion.span>
              Artisanal Mousse Desserts
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
              className="text-gray-900 mb-6"
            >
              {siteInfo.tagline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4,
                type: "spring",
                stiffness: 100
              }}
              className="text-gray-600 mb-8 max-w-lg mx-auto md:mx-0"
            >
              {siteInfo.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.a
                href="#menu"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors shadow-lg"
              >
                Order Now
              </motion.a>
              <motion.a
                href="#menu"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(236, 72, 153, 0.05)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="border-2 border-pink-600 text-pink-600 px-8 py-3 rounded-full hover:bg-pink-50 transition-colors"
              >
                View Menu
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0"
            >
              {[
                { value: "500+", label: "Happy Customers" },
                { value: "15+", label: "Flavors" },
                { value: "5★", label: "Rating" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.7 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  className="text-center md:text-left cursor-default"
                >
                  <motion.div 
                    className="text-pink-600"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { 
                  src: "https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBtb3Vzc2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDY2OTg5OHww&ixlib=rb-4.1.0&q=80&w=1080",
                  alt: "Chocolate Mousse",
                  delay: 0.3,
                  className: "h-64"
                },
                { 
                  src: "https://images.unsplash.com/photo-1558234469-50fc184d1cc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwZGVzc2VydHxlbnwxfHx8fDE3NjQ2MDQ5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  alt: "Strawberry Dessert",
                  delay: 0.4,
                  className: "h-64 mt-8"
                },
                { 
                  src: "https://images.unsplash.com/photo-1741244133042-970251e76066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZGVzc2VydCUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjQ2Njk4OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  alt: "Elegant Dessert",
                  delay: 0.5,
                  className: "h-48 col-span-2"
                }
              ].map((image, index) => (
                <motion.div
                  key={image.alt}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: image.delay,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: index % 2 === 0 ? 2 : -2,
                    zIndex: 10,
                    transition: { type: "spring", stiffness: 400, damping: 15 }
                  }}
                  className={`rounded-2xl overflow-hidden shadow-xl ${image.className}`}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { delay: 0.6 },
                scale: { delay: 0.6, type: "spring", stiffness: 200 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <div className="text-center">
                <motion.div 
                  className="text-pink-600"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🏆
                </motion.div>
                <div className="text-xs text-gray-600 mt-1">Award</div>
                <div className="text-xs text-gray-600">Winner</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
        }}
        transition={{ delay: 1 }}
      >
        <motion.a 
          href="#menu" 
          className="flex flex-col items-center text-gray-600 hover:text-pink-600 transition-colors group"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ChevronDown className="w-6 h-6 group-hover:text-pink-600 transition-colors" />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
}