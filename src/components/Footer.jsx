import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import { useScrollReveal } from '../animations';

export default function Footer({ onOpenContact, onNavigate }) {
  const { ref, isInView } = useScrollReveal(0.05);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer ref={ref} className="bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden">
      
      {/* Giant Ticker Banner */}
      <div className="py-16 bg-[#FF4925] overflow-hidden select-none border-b border-white/10">
        <motion.div
          className="flex whitespace-nowrap gap-12 font-anton text-6xl sm:text-8xl md:text-9xl text-white uppercase tracking-wider cursor-pointer"
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          onClick={onOpenContact}
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-12">
              <span>GET IN TOUCH</span>
              <span className="text-black">•</span>
              <span className="text-black">LET'S TALK</span>
              <span>•</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-20">
        
        {/* Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-12 mb-16 border-b border-white/10 font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-white">Available for project — EARLY FEB 2025</span>
          </div>
          <div className="text-neutral-400">
            2:49 PM (GMT+7)
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Contact Info */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <span className="font-mono text-xs text-neutral-500 block mb-1">(email)</span>
              <a href="mailto:hello@nakula.com" className="font-anton text-2xl sm:text-3xl text-white hover:text-[#FF4925] transition-colors">
                hello@nakula.com
              </a>
            </div>

            <div>
              <span className="font-mono text-xs text-neutral-500 block mb-1">(phone)</span>
              <a href="tel:+12345678" className="font-mono text-sm text-neutral-300 hover:text-white transition-colors">
                +12 345678
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-neutral-500 block mb-4">(LINKS)</span>
            {[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Works', href: '#works' },
              { label: 'Services', href: '#services' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Blog', href: '#blog' },
              { label: 'Waitlist', href: '#pricing' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); onNavigate(link.href); }}
                className="block text-neutral-300 hover:text-[#FF4925] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Col 3: Social Links */}
          <div className="md:col-span-2 space-y-3 font-mono text-xs">
            <span className="text-neutral-500 block mb-4">(SOCIALS)</span>
            {[
              { label: 'X/Twitter', href: 'https://twitter.com' },
              { label: 'Instagram', href: 'https://instagram.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
              { label: 'Behance', href: 'https://behance.net' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-neutral-300 hover:text-[#FF4925] transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>

          {/* Col 4: Newsletter */}
          <div className="md:col-span-3 space-y-4">
            <p className="font-geist text-xs text-neutral-300 leading-relaxed">
              Sign up for our newsletter to get latest insights and updates
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-xl text-white placeholder-neutral-500 font-sans text-xs focus:outline-none focus:border-[#FF4925] transition-colors"
              />
              <motion.button
                type="submit"
                className="w-full py-3 bg-[#FF4925] text-white font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#E03410] transition-colors"
                whileTap={{ scale: 0.97 }}
              >
                <span>{subscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </form>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-500">
          <span>@2025 NAKULA. All Rights Reserved</span>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 hover:bg-[#FF4925] hover:text-white hover:border-[#FF4925] transition-all flex items-center gap-1"
            >
              <ArrowUp className="w-4 h-4" /> TOP
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
