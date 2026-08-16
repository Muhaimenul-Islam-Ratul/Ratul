import React from 'react';
import { motion } from 'framer-motion';
import { JOURNAL_DATA } from '../data/mockData';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useScrollReveal, staggerContainer, fadeUp, scaleIn } from '../animations';

export default function JournalSection() {
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="journal" ref={ref} className="py-24 md:py-36 bg-[#0A0A0A] border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase block mb-2">(JOURNAL / INSIGHTS)</span>
            <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide">
              THOUGHTS & ARTICLES
            </h2>
          </div>
          <p className="font-mono text-xs text-neutral-400 max-w-xs">
            Deep dives into design systems, typography, Framer architecture, and digital product strategy.
          </p>
        </motion.div>

        {/* Article Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delayChildren: 0.25, staggerChildren: 0.14 }}
        >
          {JOURNAL_DATA.map((article) => (
            <motion.article
              key={article.id}
              variants={fadeUp}
              className="group cursor-pointer bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between card-shine"
              whileHover={{
                y: -10,
                borderColor: 'rgba(255,73,37,0.35)',
                boxShadow: '0 0 40px rgba(255,73,37,0.15)'
              }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <motion.img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
                {/* Overlay darkens on hover */}
                <motion.div
                  className="absolute inset-0 bg-black/30"
                  whileHover={{ opacity: 0.5 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full font-mono text-[10px] text-[#FF4925] border border-white/10 uppercase">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-anton text-2xl text-white group-hover:text-[#FF4925] transition-colors duration-300 mb-3 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6">
                    {article.snippet}
                  </p>
                </div>

                {/* Read link — underline swipes in */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 font-mono text-xs text-white group-hover:text-[#FF4925] transition-colors">
                  <span className="hover-underline">READ ARTICLE</span>
                  <motion.span
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
