import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowUp, Send, Sparkles } from 'lucide-react';
import { useScrollReveal, staggerContainer, fadeUp } from '../animations';

export default function Footer({ onOpenContact, onNavigate }) {
  const { ref, isInView } = useScrollReveal(0.05);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer ref={ref} className="bg-[#0A0A0A] border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#FF4925]/12 rounded-full blur-[200px] pointer-events-none animate-glow" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

        {/* Pre-footer CTA banner */}
        <motion.div
          className="bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl p-8 sm:p-16 mb-20 text-center relative overflow-hidden card-shine"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.span
              className="font-mono text-xs text-[#FF4925] tracking-widest uppercase flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles className="w-4 h-4" /> LET'S COLLABORATE
            </motion.span>

            <div className="overflow-hidden">
              <motion.h2
                className="font-anton text-4xl sm:text-6xl md:text-7xl text-white uppercase leading-none"
                initial={{ y: '100%' }}
                animate={isInView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              >
                HAVE AN IDEA? LET'S BUILD IT TOGETHER.
              </motion.h2>
            </div>

            <motion.p
              className="text-neutral-400 font-light text-base sm:text-lg"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              We are currently booking projects for Q1/Q2 2026. Send us your inquiry today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="pt-4"
            >
              <motion.button
                onClick={onOpenContact}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF4925] text-white font-mono text-xs font-bold tracking-wider rounded-full shadow-[0_0_35px_rgba(255,73,37,0.5)]"
                whileHover={{ scale: 1.07, backgroundColor: '#E03410', boxShadow: '0 0 55px rgba(255,73,37,0.75)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <span>GET IN TOUCH NOW</span>
                <ArrowUpRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer grid columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delayChildren: 0.5, staggerChildren: 0.1 }}
        >
          {/* Brand info */}
          <motion.div variants={fadeUp} className="md:col-span-5 space-y-4">
            <motion.span
              className="font-anton text-3xl text-white tracking-wider block"
              whileHover={{ color: '#FF4925' }}
              transition={{ duration: 0.2 }}
            >
              NAKULA <span className="text-[#FF4925]">®</span>
            </motion.span>
            <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-sm">
              Nakula is a high-end design studio specializing in brand identity, custom web architecture, 3D motion graphics, and digital product strategy.
            </p>
            <div className="pt-2 font-mono text-xs text-neutral-400 space-y-1">
              <div>EMAIL: <a href="mailto:hello@nakulastudio.com" className="text-white hover-underline hover:text-[#FF4925] transition-colors">hello@nakulastudio.com</a></div>
              <div>LOCATION: San Francisco, CA &amp; Worldwide</div>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={fadeUp} className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-neutral-500 uppercase tracking-wider block mb-4">NAVIGATION</span>
            {[
              { label: 'HOME', href: '#home' },
              { label: 'ABOUT', href: '#about' },
              { label: 'SELECTED WORKS', href: '#works' },
              { label: 'SERVICES', href: '#services' },
              { label: 'PRICING', href: '#pricing' },
              { label: 'JOURNAL', href: '#journal' },
            ].map(link => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); onNavigate(link.href); }}
                className="block text-neutral-300 hover-underline"
                whileHover={{ x: 6, color: '#FF4925' }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={fadeUp} className="md:col-span-4 space-y-4">
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider block mb-2">SUBSCRIBE TO INSIGHTS</span>
            <p className="text-neutral-400 text-xs font-light">
              Receive monthly articles on design trends, Framer tips, and agency workflows.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 font-sans text-xs focus:outline-none focus:border-[#FF4925] transition-colors"
              />
              <motion.button
                type="submit"
                className="p-3 bg-[#FF4925] text-white rounded-xl"
                whileHover={{ scale: 1.1, backgroundColor: '#E03410', boxShadow: '0 0 20px rgba(255,73,37,0.5)' }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* Huge NAKULA watermark */}
        <motion.div
          className="py-12 text-center border-b border-white/10 select-none overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.h1
            className="font-anton text-7xl sm:text-[140px] md:text-[200px] lg:text-[260px] leading-none text-white/[0.06] uppercase tracking-widest"
            whileHover={{ color: 'rgba(255,73,37,0.15)' }}
            transition={{ duration: 0.8 }}
          >
            NAKULA
          </motion.h1>
        </motion.div>

        {/* Credits bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <span>© 2026 NAKULA DESIGN STUDIO. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors hover-underline">PRIVACY POLICY</a>
            <a href="#terms" className="hover:text-white transition-colors hover-underline">TERMS OF SERVICE</a>
            <motion.button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 flex items-center gap-1"
              whileHover={{ backgroundColor: '#FF4925', color: '#fff', scale: 1.1, borderColor: '#FF4925' }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" /> TOP
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}
