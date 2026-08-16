import React from 'react';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '../data/mockData';

export default function LogoMarquee() {
  const marqueeItems = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="py-12 bg-[#0A0A0A] border-b border-white/10 overflow-hidden relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[1400px] mx-auto px-4 md:px-8 mb-6"
      >
        <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase block">
          TRUSTED BY INNOVATIVE BRANDS
        </span>
      </motion.div>

      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-12 md:gap-20">
          {marqueeItems.map((client, index) => (
            <motion.div
              key={`${client.name}-${index}`}
              className="flex items-center gap-3 text-neutral-400 group"
              whileHover={{ color: '#ffffff', scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[#FF4925] opacity-60"
                whileHover={{ opacity: 1, scale: 1.5 }}
                transition={{ type: 'spring', stiffness: 500 }}
              />
              <span className="font-anton text-2xl md:text-3xl tracking-widest uppercase">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
