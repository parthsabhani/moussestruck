import { motion } from 'motion/react';
import { ChefHat, Award, Heart, Sparkles } from 'lucide-react';
import { features } from '../data/siteData';
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

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
              <span>🌟</span>
              Our Story
            </div>

            <h2 className="text-gray-900 mb-5">Where Passion Meets Perfection</h2>

            <p className="text-gray-500 mb-4 leading-relaxed">
              At Moussestruck, we believe that dessert is more than just a sweet treat — it's an experience.
              Our journey began with a simple mission: to create the most exquisite mousse desserts that bring
              joy to every bite.
            </p>

            <p className="text-gray-500 mb-8 leading-relaxed">
              Every mousse we craft is made fresh daily using only the finest ingredients. From rich Belgian
              chocolate to fresh seasonal fruits, we never compromise on quality. Our artisanal approach
              ensures that each creation is a masterpiece of flavour and texture.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, index) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap] || Heart;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-11 h-11 bg-pink-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-semibold text-sm mb-0.5">{feature.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — images + stat card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="h-60 rounded-2xl overflow-hidden shadow-xl" style={{ transform: 'rotate(1deg)' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1657498023828-1e0181449d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ2MTE2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Bakery Interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="h-60 mt-10 rounded-2xl overflow-hidden shadow-xl" style={{ transform: 'rotate(-1.5deg)' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1603380207318-371ad12c0c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDY1MzI5NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Matcha Dessert"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="h-52 col-span-2 rounded-2xl overflow-hidden shadow-xl" style={{ transform: 'rotate(0.4deg)' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBtb3Vzc2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2NDY2OTg5OHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Chocolate Mousse"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/*
              Stat card:
              - On lg+ screens: absolute positioned bottom-left, overlapping the grid
              - On smaller screens (when grid is stacked): just a normal inline card below
            */}
            <div className="mt-6 lg:mt-0 lg:absolute lg:-bottom-6 lg:-left-6 bg-white rounded-2xl p-5 shadow-xl border border-pink-50 w-fit mx-auto lg:mx-0">
              <div className="text-2xl mb-1">🎂</div>
              <div className="text-gray-900 font-bold text-lg">10,000+</div>
              <div className="text-gray-500 text-xs">Mousses Served</div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mt-28 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-gray-900 mb-3">Our Values</h3>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm">
              Everything we do is guided by our commitment to quality, creativity, and customer satisfaction
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { Icon: Heart, color: 'bg-pink-600', title: 'Made with Love', description: 'Every dessert is crafted with passion and attention to detail' },
              { Icon: Award, color: 'bg-purple-600', title: 'Premium Quality', description: 'Only the finest ingredients make it into our creations' },
              { Icon: Sparkles, color: 'bg-yellow-500', title: 'Creative Innovation', description: 'We constantly explore new flavours and presentations' },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className={`w-14 h-14 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <value.Icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-gray-900 font-semibold mb-1.5 text-sm">{value.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
