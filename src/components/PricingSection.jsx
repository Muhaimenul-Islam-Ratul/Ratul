import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRICING_PACKAGES } from '../data/mockData';
import { Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { useScrollReveal, staggerContainer, scaleIn } from '../animations';

export default function PricingSection({ onOpenContact }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="pricing" ref={ref} className="py-24 md:py-36 bg-[#0A0A0A] border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full inline-block">
            (PRICING)
          </span>
          <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide">
            SIMPLE, TRANSPARENT PRICING
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg">
            From launch to scale, we’ve got you covered at every stage.
          </p>

          {/* Billing Toggle */}
          <div className="pt-6 flex items-center justify-center gap-4 font-mono text-xs">
            <span className={`transition-colors ${!isAnnual ? 'text-white font-bold' : 'text-neutral-400'}`}>
              Monthly
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 rounded-full bg-white/10 p-1 border border-white/20 focus:outline-none"
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-[#FF4925]"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>

            <div className="flex items-center gap-2">
              <span className={`transition-colors ${isAnnual ? 'text-white font-bold' : 'text-neutral-400'}`}>
                Annual
              </span>
              <span className="px-2 py-0.5 bg-[#FF4925]/20 text-[#FF4925] rounded-full text-[10px] border border-[#FF4925]/40 font-semibold">
                -20%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delayChildren: 0.2, staggerChildren: 0.12 }}
        >
          {PRICING_PACKAGES.map((pkg) => {
            const hasPrice = pkg.monthlyPrice !== null;
            const price = isAnnual ? pkg.annualPrice : pkg.monthlyPrice;

            return (
              <motion.div
                key={pkg.id}
                variants={scaleIn}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between card-shine ${
                  pkg.popular
                    ? 'bg-[#121212] border-2 border-[#FF4925] shadow-[0_0_50px_rgba(255,73,37,0.25)]'
                    : 'bg-[#121212] border border-white/10 hover:border-white/30'
                }`}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FF4925] text-white font-mono text-[10px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(255,73,37,0.6)] flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> (POPULAR)
                  </div>
                )}

                <div>
                  <h3 className="font-anton text-3xl text-white mb-2">{pkg.title}</h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6 min-h-[32px]">
                    {pkg.subtitle}
                  </p>

                  <div className="mb-8 pb-6 border-b border-white/10">
                    {hasPrice ? (
                      <div className="flex items-baseline gap-1">
                        <span className="font-anton text-5xl sm:text-6xl text-white">
                          ${price.toLocaleString()}
                        </span>
                        <span className="font-mono text-xs text-neutral-400">/mo</span>
                      </div>
                    ) : (
                      <div className="font-anton text-4xl sm:text-5xl text-white py-2">
                        Bespoke
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3 text-xs text-neutral-200 font-mono">
                        <div className="w-4 h-4 rounded-full bg-[#FF4925]/20 text-[#FF4925] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={onOpenContact}
                  className={`w-full py-4 rounded-2xl font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-colors ${
                    pkg.popular
                      ? 'bg-[#FF4925] text-white hover:bg-[#E03410]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{pkg.buttonText}</span>
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
