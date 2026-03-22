import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/siteData';

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
            <span>💬</span>
            Testimonials
          </div>
          <h2 className="text-gray-900 mb-3">What Our Customers Say</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Don't just take our word for it — hear from our happy customers who have experienced the magic of Moussestruck
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 relative"
            >
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center shadow-md">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Stars with subtle staggered twinkle animation */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span
                    key={i}
                    className="star-twinkle"
                    style={{ animationDelay: `${i * 0.35}s` }}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-4 leading-relaxed">
                "{testimonial.review}"
              </p>

              <div className="border-t border-gray-100 pt-3">
                <p className="text-gray-900 font-semibold text-sm">{testimonial.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{testimonial.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-10 text-center bg-white rounded-2xl p-8 shadow-md max-w-sm mx-auto"
        >
          <div className="flex gap-1 justify-center mb-3">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="text-2xl star-twinkle"
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                ⭐
              </span>
            ))}
          </div>
          <div className="text-gray-900 font-bold text-2xl mb-1">5.0 out of 5</div>
          <p className="text-gray-500 text-sm">Based on 500+ reviews</p>
        </motion.div>
      </div>
    </section>
  );
}
