import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQS_DATA } from '../data/mockData';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../animations';

export default function FaqSection({ onOpenContact }) {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="faq" ref={ref} className="py-24 md:py-36 bg-[#0A0A0A] border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left info box */}
          <motion.div
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full inline-block">
              (FAQ)
            </span>
            <h2 className="font-anton text-4xl sm:text-5xl text-white uppercase tracking-wide">
              GOT SPECIFIC QUESTIONS?
            </h2>
            <p className="text-neutral-400 font-light text-sm leading-relaxed">
              We've compiled answers to the questions clients ask most often. Need more clarity?
            </p>
            <motion.button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FF4925] text-white font-mono text-xs font-bold rounded-xl tracking-wider"
              whileHover={{ scale: 1.05, backgroundColor: '#E03410', boxShadow: '0 0 25px rgba(255,73,37,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span>CONTACT US</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Right Accordion List */}
          <div className="lg:col-span-8 space-y-4">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`rounded-2xl border transition-all duration-300 card-shine overflow-hidden ${
                    isOpen ? 'bg-[#121212] border-[#FF4925]/50' : 'bg-white/[0.01] border-white/10 hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none group"
                  >
                    <span className="font-anton text-xl sm:text-2xl text-white group-hover:text-[#FF4925] transition-colors">
                      {faq.question}
                    </span>
                    <div className={`p-2.5 rounded-full border transition-colors shrink-0 ${
                      isOpen ? 'bg-[#FF4925] border-[#FF4925] text-white' : 'bg-white/5 border-white/10 text-white'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-white/10 text-neutral-300 text-sm font-light leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
