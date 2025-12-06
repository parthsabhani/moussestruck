import { motion } from 'motion/react';
import { ChefHat, Award, Heart, Sparkles } from 'lucide-react';
import { features, siteInfo } from '../data/siteData';
import { ImageWithFallback } from './figma/ImageWithFallback';

const iconMap = {
  'chef-hat': ChefHat,
  'award': Award,
  'gift': Heart,
  'truck': Sparkles,
};

export function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
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
                🌟
              </motion.span>
              Our Story
            </motion.div>

            <motion.h2 
              className="text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
            >
              Where Passion Meets Perfection
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.4,
                type: "spring",
                stiffness: 100
              }}
            >
              At Moussestruck, we believe that dessert is more than just a sweet treat—it's an experience. 
              Our journey began with a simple mission: to create the most exquisite mousse desserts that bring 
              joy to every bite.
            </motion.p>

            <motion.p 
              className="text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              Every mousse we craft is made fresh daily using only the finest ingredients sourced from around 
              the world. From rich Belgian chocolate to fresh seasonal fruits, we never compromise on quality. 
              Our artisanal approach ensures that each creation is a masterpiece of flavor and texture.
            </motion.p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap] || Heart;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    className="flex items-start gap-4"
                  >
                    <motion.div 
                      className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.5, type: "spring", stiffness: 200 }
                      }}
                    >
                      <Icon className="w-6 h-6 text-pink-600" />
                    </motion.div>
                    <div>
                      <h4 className="text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Content - Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
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
                  src: "https://images.unsplash.com/photo-1657498023828-1e0181449d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ2MTE2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
                  alt: "Bakery Interior",
                  className: "h-64",
                  delay: 0.2
                },
                {
                  src: "https://images.unsplash.com/photo-1603380207318-371ad12c0c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDY1MzI5NXww&ixlib=rb-4.1.0&q=80&w=1080",
                  alt: "Matcha Dessert",
                  className: "h-64 mt-12",
                  delay: 0.3
                },
                {
                  src: "https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBtb3Vzc2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDY2OTg5OHww&ixlib=rb-4.1.0&q=80&w=1080",
                  alt: "Chocolate Mousse",
                  className: "h-56 col-span-2",
                  delay: 0.4
                }
              ].map((image, index) => (
                <motion.div
                  key={image.alt}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
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

            {/* Floating Stats */}
            <motion.div
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 200
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
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
              <motion.div 
                className="text-pink-600 mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🎂
              </motion.div>
              <div className="text-gray-900">10,000+</div>
              <div className="text-gray-600 text-sm">Mousse Served</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          className="mt-20 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <motion.h3 
              className="text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              Our Values
            </motion.h3>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.3,
                type: "spring",
                stiffness: 100
              }}
            >
              Everything we do is guided by our commitment to quality, creativity, and customer satisfaction
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                Icon: Heart,
                color: "bg-pink-600",
                title: "Made with Love",
                description: "Every dessert is crafted with passion and attention to detail"
              },
              {
                Icon: Award,
                color: "bg-purple-600",
                title: "Premium Quality",
                description: "Only the finest ingredients make it into our creations"
              },
              {
                Icon: Sparkles,
                color: "bg-yellow-500",
                title: "Creative Innovation",
                description: "We constantly explore new flavors and presentations"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="text-center"
              >
                <motion.div 
                  className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.5, type: "spring", stiffness: 200 }
                  }}
                >
                  <value.Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}