import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA } from '../data/mockData';
import { Plus, Minus, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useScrollReveal, staggerContainer, fadeUp, slideLeft } from '../animations';

export default function ServicesSection({ onOpenContact }) {
  const [expandedId, setExpandedId] = useState('branding');
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="services" ref={ref} className="py-24 md:py-36 bg-[#0A0A0A] border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Section Header */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-6 border-b border-white/10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          <motion.div variants={slideLeft} className="lg:col-span-8">
            <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase block mb-2">(SERVICES)</span>
            <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide">
              WHAT WE DO & HOW WE HELP
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-4 flex justify-start lg:justify-end">
            <p className="font-mono text-xs text-neutral-400 max-w-xs">
              End-to-end design & digital capabilities tailored for modern companies seeking world-class impact.
            </p>
          </motion.div>
        </motion.div>

        {/* Accordion list */}
        <motion.div
          className="space-y-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delayChildren: 0.3, staggerChildren: 0.1 }}
        >
          {SERVICES_DATA.map((service, idx) => {
            const isOpen = expandedId === service.id;
            return (
              <motion.div
                key={service.id}
                variants={fadeUp}
                className={`rounded-3xl border overflow-hidden card-shine ${
                  isOpen ? 'bg-white/[0.03] border-[#FF4925]/50' : 'bg-white/[0.01] border-white/10'
                }`}
                animate={isOpen ? { boxShadow: '0 0 40px rgba(255,73,37,0.18)' } : { boxShadow: '0 0 0px rgba(0,0,0,0)' }}
                transition={{ duration: 0.4 }}
              >
                {/* Accordion header */}
                <motion.button
                  onClick={() => setExpandedId(isOpen ? null : service.id)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none group"
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-6 sm:gap-8">
                    <motion.span
                      className="font-anton text-3xl sm:text-4xl text-[#FF4925]"
                      animate={isOpen ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {service.number}
                    </motion.span>
                    <h3 className="font-anton text-2xl sm:text-4xl text-white group-hover:text-[#FF4925] transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <motion.div
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white"
                    whileHover={{ backgroundColor: '#FF4925', borderColor: '#FF4925', scale: 1.1 }}
                    animate={isOpen ? { backgroundColor: '#FF4925', borderColor: '#FF4925', rotate: 0 } : { rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 0 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </motion.span>
                  </motion.div>
                </motion.button>

                {/* Expandable content — AnimatePresence for smooth height */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <motion.div
                          className="lg:col-span-5"
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15, duration: 0.4 }}
                        >
                          <p className="text-neutral-300 text-lg font-light leading-relaxed mb-6">{service.tagline}</p>
                          <motion.button
                            onClick={onOpenContact}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4925] text-white font-mono text-xs rounded-xl"
                            whileHover={{ scale: 1.05, backgroundColor: '#E03410', boxShadow: '0 0 20px rgba(255,73,37,0.5)' }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                          >
                            BOOK THIS SERVICE <ArrowUpRight className="w-4 h-4" />
                          </motion.button>
                        </motion.div>

                        <motion.div
                          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3"
                          initial="hidden"
                          animate="show"
                          variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
                          }}
                        >
                          {service.features.map((feature, fIdx) => (
                            <motion.div
                              key={fIdx}
                              variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0 } }}
                              transition={{ duration: 0.35 }}
                              className="flex items-center gap-3 p-3.5 bg-white/5 rounded-xl border border-white/5 text-sm text-neutral-200 font-mono"
                              whileHover={{ borderColor: 'rgba(255,73,37,0.3)', backgroundColor: 'rgba(255,73,37,0.05)' }}
                            >
                              <CheckCircle className="w-4 h-4 text-[#FF4925] shrink-0" />
                              <span>{feature}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
