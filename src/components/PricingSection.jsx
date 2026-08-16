import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRICING_DATA } from '../data/mockData';
import { Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { useScrollReveal, staggerContainer, fadeUp, scaleIn } from '../animations';

export default function PricingSection({ onOpenContact }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="pricing" ref={ref} className="py-24 md:py-36 bg-[#0A0A0A] border-b border-white/10 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF4925]/10 rounded-full blur-[160px] pointer-events-none animate-glow" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full inline-block">
            (PRICING & MEMBERSHIP)
          </span>
          <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide">
            TRANSPARENT PRICING.<br />NO HIDDEN SURPRISES.
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg">
            Choose a fixed project scope or flexible monthly retainer. Pause or cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="pt-6 flex items-center justify-center gap-4 font-mono text-xs">
            <motion.span
              animate={{ opacity: !isAnnual ? 1 : 0.4 }}
              className="text-white font-bold"
            >
              MONTHLY BILLING
            </motion.span>

            <motion.button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 rounded-full bg-white/10 p-1 border border-white/20 focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-6 h-6 rounded-full bg-[#FF4925] shadow-[0_0_12px_rgba(255,73,37,0.7)]"
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>

            <div className="flex items-center gap-2">
              <motion.span animate={{ opacity: isAnnual ? 1 : 0.4 }} className="text-white font-bold">
                ANNUAL BILLING
              </motion.span>
              <motion.span
                className="px-2 py-0.5 bg-[#FF4925]/20 text-[#FF4925] rounded-full text-[10px] border border-[#FF4925]/40 font-semibold"
                animate={isAnnual ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                SAVE 20%
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delayChildren: 0.3, staggerChildren: 0.13 }}
        >
          {PRICING_DATA.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <motion.div
                key={plan.name}
                variants={scaleIn}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between card-shine ${
                  plan.popular
                    ? 'bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-2 border-[#FF4925] z-10'
                    : 'bg-white/[0.02] border border-white/10'
                }`}
                animate={plan.popular ? { boxShadow: '0 0 60px rgba(255,73,37,0.35)', scale: 1.02 } : {}}
                whileHover={{
                  y: -8,
                  boxShadow: plan.popular
                    ? '0 0 80px rgba(255,73,37,0.5)'
                    : '0 0 40px rgba(255,73,37,0.2)',
                  borderColor: 'rgba(255,73,37,0.6)'
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF4925] text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(255,73,37,0.6)] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> MOST POPULAR RETAINER
                  </div>
                )}

                <div>
                  <h3 className="font-anton text-3xl text-white mb-2">{plan.name}</h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6 min-h-[36px]">{plan.tagline}</p>

                  {/* Price — animates when toggle switches */}
                  <div className="mb-8 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-2 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={price}
                          className="font-anton text-5xl sm:text-6xl text-white"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                          ${price.toLocaleString()}
                        </motion.span>
                      </AnimatePresence>
                      <span className="font-mono text-xs text-neutral-400">
                        / month {isAnnual ? '(billed annually)' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3.5 mb-8">
                    <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider block mb-2">WHAT'S INCLUDED:</span>
                    {plan.features.map((feature, fIdx) => (
                      <motion.div
                        key={fIdx}
                        className="flex items-center gap-3 text-xs text-neutral-200 font-mono"
                        initial={{ opacity: 0, x: -12 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + fIdx * 0.05, duration: 0.35 }}
                      >
                        <div className="w-4 h-4 rounded-full bg-[#FF4925]/20 text-[#FF4925] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={onOpenContact}
                  className={`w-full py-4 rounded-2xl font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 ${
                    plan.popular ? 'bg-[#FF4925] text-white' : 'bg-white/10 text-white'
                  }`}
                  whileHover={{
                    scale: 1.04,
                    backgroundColor: plan.popular ? '#E03410' : '#ffffff',
                    color: plan.popular ? '#fff' : '#000',
                    boxShadow: '0 0 28px rgba(255,73,37,0.5)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <span>{plan.cta}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
