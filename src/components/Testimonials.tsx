import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/siteData';

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
              💬
            </motion.span>
            Testimonials
          </motion.div>
          <motion.h2 
            className="text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.4,
              type: "spring",
              stiffness: 100
            }}
          >
            Don't just take our word for it - hear from our happy customers who have experienced the magic of Moussestruck
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              className="bg-white rounded-2xl p-6 shadow-lg relative"
            >
              {/* Quote Icon */}
              <motion.div 
                className="absolute -top-3 -left-3 w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.2,
                  rotate: 15,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <Quote className="w-5 h-5 text-white" />
              </motion.div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1 + 0.3 + i * 0.05,
                      type: "spring",
                      stiffness: 300
                    }}
                    whileHover={{ 
                      scale: 1.3,
                      rotate: 360,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                ))}
              </div>

              {/* Review */}
              <motion.p 
                className="text-gray-600 text-sm mb-4 line-clamp-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                "{testimonial.review}"
              </motion.p>

              {/* Author */}
              <motion.div 
                className="border-t pt-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <p className="text-gray-900">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.date}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            delay: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px rgba(236, 72, 153, 0.2)",
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          className="mt-12 text-center bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: 0.6 + i * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.4,
                    rotate: 360,
                    y: -5,
                    transition: { duration: 0.3, type: "spring", stiffness: 400 }
                  }}
                >
                  <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                </motion.div>
              ))}
            </div>
          </div>
          <motion.h3 
            className="text-gray-900 mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 1.1,
              type: "spring",
              stiffness: 100
            }}
          >
            5.0 out of 5
          </motion.h3>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 1.2,
              type: "spring",
              stiffness: 100
            }}
          >
            Based on 500+ reviews
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}