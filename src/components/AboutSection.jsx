import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, staggerContainer, fadeUp, slideLeft, slideRight } from '../animations';

export default function AboutSection() {
  const { ref, isInView } = useScrollReveal(0.15);
  const stats = [
    { value: '08+', label: 'YEARS EXPERIENCE', color: 'text-white' },
    { value: '120+', label: 'PROJECTS DELIVERED', color: 'text-[#FF4925]' },
    { value: '15+', label: 'INTERNATIONAL AWARDS', color: 'text-white' },
    { value: '99%', label: 'CLIENT RETENTION', color: 'text-white' },
  ];

  return (
    <section id="about" ref={ref} className="py-24 md:py-36 bg-[#0A0A0A] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left tag */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full inline-block">
              (ABOUT)
            </span>
          </motion.div>

          {/* Main statement */}
          <motion.div
            className="lg:col-span-9"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            {/* Large text — line by line reveal */}
            <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-300 leading-[1.25] tracking-tight overflow-hidden">
              {[
                'We combine years of ',
                'web design',
                ' and ',
                'branding expertise',
                ' to craft meaningful, story-driven experiences for forward-thinking companies.'
              ].map((segment, i) => (
                <span key={i} className="text-reveal-wrap inline">
                  <motion.span
                    className={`inline ${i === 1 ? 'text-white font-medium underline decoration-[#FF4925] decoration-2 underline-offset-8' : i === 3 ? 'text-white font-medium' : ''}`}
                    initial={{ opacity: 0, y: 28 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {segment}
                  </motion.span>
                </span>
              ))}
            </div>

            {/* Stats grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-16 mt-16 border-t border-white/10"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              transition={{ delayChildren: 0.5 }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  className="group"
                >
                  <motion.span
                    className={`font-anton text-4xl sm:text-5xl ${stat.color} block mb-1`}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="font-mono text-xs text-neutral-400 uppercase group-hover:text-[#FF4925] transition-colors duration-300">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
