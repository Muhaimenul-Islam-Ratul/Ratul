import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA } from '../data/mockData';
import { Plus, Minus, CheckCircle, ArrowUpRight } from 'lucide-react';
import { useScrollReveal, staggerContainer, fadeUp, slideLeft } from '../animations';

export default function ServicesSection({ onOpenContact }) {
  const [expandedIndex, setExpandedIndex] = useState(0);
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
              WHAT WE DO
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-4 flex justify-start lg:justify-end">
            <p className="font-mono text-xs text-neutral-400 max-w-xs">
              Crafting identities, products, and motion systems that elevate brands.
            </p>
          </motion.div>
        </motion.div>

        {/* Accordion List */}
        <motion.div
          className="space-y-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delayChildren: 0.2, staggerChildren: 0.1 }}
        >
          {SERVICES_DATA.map((service, idx) => {
            const isOpen = expandedIndex === idx;
            return (
              <motion.div
                key={service.num}
                variants={fadeUp}
                className={`rounded-3xl border overflow-hidden transition-all duration-300 card-shine ${
                  isOpen ? 'bg-[#121212] border-[#FF4925]/60' : 'bg-white/[0.01] border-white/10'
                }`}
                animate={isOpen ? { boxShadow: '0 0 35px rgba(255,73,37,0.18)' } : { boxShadow: '0 0 0px rgba(0,0,0,0)' }}
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : idx)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus:outline-none group"
                >
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className="font-anton text-3xl sm:text-5xl text-[#FF4925]">
                      {service.num}
                    </span>
                    <h3 className="font-anton text-2xl sm:text-4xl text-white group-hover:text-[#FF4925] transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  <div className={`p-3 rounded-full border transition-all duration-300 ${
                    isOpen ? 'bg-[#FF4925] border-[#FF4925] text-white' : 'bg-white/5 border-white/10 text-white group-hover:border-[#FF4925]'
                  }`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expandable Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-6 space-y-6">
                          <p className="text-neutral-300 text-lg sm:text-xl font-light leading-relaxed">
                            {service.desc}
                          </p>
                          <motion.button
                            onClick={onOpenContact}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF4925] text-white font-mono text-xs tracking-wider rounded-xl font-bold"
                            whileHover={{ scale: 1.04, backgroundColor: '#E03410', boxShadow: '0 0 20px rgba(255,73,37,0.5)' }}
                            whileTap={{ scale: 0.97 }}
                          >
                            BOOK THIS SERVICE <ArrowUpRight className="w-4 h-4" />
                          </motion.button>
                        </div>

                        <div className="lg:col-span-6 grid grid-cols-2 gap-3">
                          {service.tags.map((tag, tIdx) => (
                            <div
                              key={tIdx}
                              className="flex items-center gap-2.5 p-3.5 bg-white/5 rounded-xl border border-white/5 text-xs text-neutral-200 font-mono"
                            >
                              <CheckCircle className="w-4 h-4 text-[#FF4925] shrink-0" />
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
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
