import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../data/mockData';
import { Star, Quote } from 'lucide-react';
import { useScrollReveal, staggerContainer, scaleIn } from '../animations';

export default function TestimonialsSection() {
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="testimonials" ref={ref} className="py-24 md:py-36 bg-[#0A0A0A] border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Header with Clutch Rating */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full inline-block">
                (TESTIMONIALS)
              </span>
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <span className="text-white font-bold">4.9/5</span>
                <span>• 300+ Reviews on <strong className="text-white">Clutch</strong></span>
              </div>
            </div>
            <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide">
              WHAT OUR CLIENTS SAY
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-xs">
            Real stories from partners who trusted us to transform their digital presence.
          </p>
        </motion.div>

        {/* Testimonials Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delayChildren: 0.2, staggerChildren: 0.12 }}
        >
          {TESTIMONIALS_DATA.map((t, idx) => (
            <motion.div
              key={t.name}
              variants={scaleIn}
              className="bg-[#121212] border border-white/10 rounded-3xl p-8 flex flex-col justify-between card-shine group hover:border-[#FF4925]/50 transition-colors"
              whileHover={{ y: -8, boxShadow: '0 0 35px rgba(255,73,37,0.15)' }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-[#FF4925]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-white/10 group-hover:text-[#FF4925]/30 transition-colors" />
                </div>

                <p className="text-neutral-300 text-base font-light leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#FF4925]/40"
                />
                <div>
                  <h4 className="font-anton text-lg text-white group-hover:text-[#FF4925] transition-colors">{t.name}</h4>
                  <span className="font-mono text-xs text-neutral-400 block">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
