import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Clock, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenContact, activeSection, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeString, setTimeString] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      }).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);

    return () => { clearInterval(interval); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'WORKS', href: '#works' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PRICING', href: '#pricing' },
    { label: 'JOURNAL', href: '#journal' },
  ];

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    onNavigate(href);
  };

  const menuVariants = {
    closed: { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
    open:   { clipPath: 'inset(0% 0% 0% 0%)',   transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 30 },
    open: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } })
  };

  return (
    <>
      {/* Sticky header — darkens on scroll */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-colors duration-300"
        animate={{ backgroundColor: scrolled ? 'rgba(10,10,10,0.96)' : 'rgba(10,10,10,0.7)', backdropFilter: 'blur(18px)' }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">

          {/* Logo — Nakula wordmark image from Framer CDN */}
          <motion.button
            onClick={() => handleNavClick('#home')}
            className="focus:outline-none"
            whileHover={{ scale: 1.04, filter: 'brightness(1.15)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <img
              src="https://framerusercontent.com/images/fByRJnifHpxJBPPalEfESi6BrE.png"
              alt="Nakula"
              style={{
                height: 36,
                width: 'auto',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </motion.button>

          {/* Status & Live Clock */}
          <div className="hidden lg:flex items-center gap-6 text-xs text-neutral-400 font-mono bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for project / FEB 2026</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5 text-white">
              <Clock className="w-3.5 h-3.5 text-[#FF4925]" />
              <motion.span key={timeString} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                {timeString || '10:06 AM'} (GMT+7)
              </motion.span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {/* LET'S TALK CTA */}
            <motion.button
              onClick={onOpenContact}
              className="btn-glow-pulse relative inline-flex items-center justify-center px-4 md:px-6 py-2.5 text-xs md:text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-[#FF4925] to-[#E03410] rounded-full overflow-hidden"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <span className="flex items-center gap-1.5 font-mono">
                LET'S TALK <ArrowUpRight className="w-4 h-4" />
              </span>
            </motion.button>

            {/* Hamburger */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen
                  ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5 text-[#FF4925]" />
                    </motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-5 h-5" />
                    </motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen overlay menu — clip-path wipe */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-12"
          >
            <div className="pt-24 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">

              {/* Nav Links */}
              <nav className="lg:col-span-8 flex flex-col gap-1 md:gap-2">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    custom={idx}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="group flex items-center justify-between text-4xl sm:text-6xl md:text-7xl font-anton text-neutral-400 hover:text-white transition-all duration-300 py-1 border-b border-white/5 hover:border-[#FF4925]/50"
                    whileHover={{ x: 16 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-sm md:text-lg text-[#FF4925] opacity-0 group-hover:opacity-100 transition-opacity">0{idx + 1}.</span>
                      {link.label}
                    </span>
                    <ArrowUpRight className="w-8 h-8 text-[#FF4925] opacity-0 group-hover:opacity-100 transition-all" />
                  </motion.a>
                ))}
              </nav>

              {/* Right info box */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ delay: 0.25, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="lg:col-span-4 bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FF4925] mb-4">
                    <Sparkles className="w-4 h-4" /> GET IN TOUCH
                  </div>
                  <h3 className="font-anton text-2xl text-white mb-2">HAVE A PROJECT IN MIND?</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed mb-6 font-light">
                    We craft bespoke digital experiences, brand identities, and high-converting web apps.
                  </p>
                  <motion.button
                    onClick={() => { setIsMenuOpen(false); onOpenContact(); }}
                    className="w-full py-3 bg-[#FF4925] text-white font-mono text-xs tracking-wider rounded-xl flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.03, backgroundColor: '#E03410' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    START A CONVERSATION <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="border-t border-white/10 pt-6 space-y-3 font-mono text-xs text-neutral-400">
                  <div><span className="text-white/40 block mb-1">EMAIL</span>
                    <a href="mailto:hello@nakulastudio.com" className="text-white hover-underline hover:text-[#FF4925] transition-colors">hello@nakulastudio.com</a>
                  </div>
                  <div><span className="text-white/40 block mb-1">LOCATION</span>
                    <span className="text-neutral-300">San Francisco, CA &amp; Global</span>
                  </div>
                  <div><span className="text-white/40 block mb-1">SOCIALS</span>
                    <div className="flex gap-4 text-white">
                      {['TWITTER','INSTAGRAM','DRIBBBLE','LINKEDIN'].map(s => (
                        <a key={s} href={`#${s.toLowerCase()}`} className="hover-underline hover:text-[#FF4925] transition-colors">{s}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="max-w-[1400px] mx-auto w-full pt-6 border-t border-white/10 flex justify-between items-center text-xs text-neutral-500 font-mono">
              <span>© 2026 NAKULA DESIGN STUDIO</span>
              <span>ALL RIGHTS RESERVED</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
