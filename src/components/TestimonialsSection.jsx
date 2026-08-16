import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Star, Quote } from 'lucide-react';
import { useScrollReveal, staggerContainer, fadeUp, scaleIn } from '../animations';

export default function TestimonialsSection() {
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-[#0A0A0A] border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase block mb-2">(TESTIMONIALS)</span>
            <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide">
              WHAT OUR CLIENTS SAY
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-xs">
            Direct feedback from founders, product managers, and design leaders we've partnered with.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delayChildren: 0.25, staggerChildren: 0.13 }}
        >
          {TESTIMONIALS_DATA.map((t, idx) => (
            <motion.div
              key={idx}
              variants={scaleIn}
              className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex flex-col justify-between card-shine"
              whileHover={{
                y: -8,
                borderColor: 'rgba(255,73,37,0.3)',
                backgroundColor: 'rgba(255,255,255,0.03)',
                boxShadow: '0 0 40px rgba(255,73,37,0.12)'
              }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            >
              <div>
                {/* Stars + Quote icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 + idx * 0.1 + i * 0.06, type: 'spring', stiffness: 400 }}
                      >
                        <Star className="w-4 h-4 text-[#FF4925] fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <Quote className="w-8 h-8 text-white/10" />
                  </motion.div>
                </div>

                <p className="text-neutral-300 text-sm font-light leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <motion.img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#FF4925]/40"
                  whileHover={{ scale: 1.12, borderColor: '#FF4925' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                />
                <div>
                  <h4 className="font-anton text-lg text-white">{t.name}</h4>
                  <span className="font-mono text-xs text-neutral-400 block">{t.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
