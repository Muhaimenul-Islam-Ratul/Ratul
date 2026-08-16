import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../animations';
import { STATS_DATA, FEATURED_TESTIMONIAL } from '../data/mockData';

export default function AboutSection() {
  const { ref, isInView } = useScrollReveal(0.15);

  return (
    <section id="about" ref={ref} className="py-24 md:py-36 bg-[#0A0A0A] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Tag */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full inline-block">
              (ABOUT)
            </span>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-16">
            
            {/* Statement */}
            <motion.h2
              className="text-3xl sm:text-5xl md:text-6xl font-light text-neutral-200 leading-[1.2] tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              We combines years of <span className="text-white font-medium underline decoration-[#FF4925] underline-offset-8">web design</span> and <span className="text-white font-medium">branding expertise</span> to craft meaningful, story-driven experiences.
            </motion.h2>

            {/* Why Us Tag & Stats Grid */}
            <div className="space-y-8 pt-8 border-t border-white/10">
              <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase block">
                (WHY US)
              </span>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {STATS_DATA.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                    className="space-y-2 group"
                  >
                    <div className="font-anton text-4xl sm:text-5xl md:text-6xl text-white group-hover:text-[#FF4925] transition-colors duration-300">
                      {stat.value}
                    </div>
                    <p className="font-geist text-xs text-neutral-400 leading-snug">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Featured Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[#121212] border border-white/10 rounded-2xl p-8 sm:p-12 relative overflow-hidden group hover:border-[#FF4925]/40 transition-colors"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF4925]/10 rounded-full filter blur-3xl pointer-events-none group-hover:bg-[#FF4925]/20 transition-all duration-500" />
              <p className="text-xl sm:text-2xl md:text-3xl text-white font-light leading-relaxed mb-8 relative z-10 italic">
                "{FEATURED_TESTIMONIAL.quote}"
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-white/10 font-mono text-xs">
                <div>
                  <span className="text-white font-semibold block">{FEATURED_TESTIMONIAL.author}</span>
                  <span className="text-neutral-400">{FEATURED_TESTIMONIAL.role}</span>
                </div>
                <span className="text-[#FF4925] tracking-wider uppercase font-semibold">CLIENT REVIEWS</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
