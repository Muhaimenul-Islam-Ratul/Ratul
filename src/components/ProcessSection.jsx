import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../data/mockData';
import { Compass, Palette, Sparkles, Rocket } from 'lucide-react';
import { useScrollReveal, staggerContainer, fadeUp } from '../animations';

export default function ProcessSection() {
  const icons = [Compass, Palette, Sparkles, Rocket];
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="process" ref={ref} className="py-24 md:py-36 bg-[#0A0A0A] border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase block mb-2">(PROCESS)</span>
            <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide">
              HOW WE WORK TOGETHER
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-xs">
            From discovery to growth, a streamlined process built for excellence.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delayChildren: 0.25, staggerChildren: 0.12 }}
        >
          {PROCESS_STEPS.map((item, index) => {
            const IconComponent = icons[index % icons.length];
            return (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="group relative bg-[#121212] border border-white/10 rounded-3xl p-8 flex flex-col justify-between card-shine"
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(255,73,37,0.5)',
                  boxShadow: '0 0 35px rgba(255,73,37,0.18)',
                }}
                transition={{ type: 'spring', stiffness: 250, damping: 22 }}
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs font-bold text-[#FF4925] tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#FF4925] group-hover:border-[#FF4925] transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-anton text-2xl text-white mb-3 group-hover:text-[#FF4925] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[10px] text-neutral-500 flex items-center justify-between uppercase">
                  <span>PHASE 0{index + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-[#FF4925]" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
