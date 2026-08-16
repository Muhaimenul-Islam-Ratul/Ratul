import React from 'react';
import { motion } from 'framer-motion';
import { ARTICLES_DATA } from '../data/mockData';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal, staggerContainer, fadeUp } from '../animations';

export default function JournalSection() {
  const { ref, isInView } = useScrollReveal(0.1);

  return (
    <section id="blog" ref={ref} className="py-24 md:py-36 bg-[#0A0A0A] border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase block mb-2">(BLOG)</span>
            <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide">
              THOUGHTS & ARTICLES
            </h2>
          </div>
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full font-mono text-xs font-bold text-white"
            whileHover={{ borderColor: '#FF4925', backgroundColor: '#FF4925', scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>SEE ALL</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          transition={{ delayChildren: 0.2, staggerChildren: 0.12 }}
        >
          {ARTICLES_DATA.map((article) => (
            <motion.article
              key={article.id}
              variants={fadeUp}
              className="group cursor-pointer bg-[#121212] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between card-shine hover:border-[#FF4925]/50 transition-colors"
              whileHover={{ y: -8, boxShadow: '0 0 35px rgba(255,73,37,0.15)' }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full font-mono text-[10px] text-[#FF4925] border border-white/10 uppercase">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-neutral-400 block mb-3">{article.date}</span>
                  <h3 className="font-anton text-2xl text-white group-hover:text-[#FF4925] transition-colors duration-300 mb-3 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6">
                    {article.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-white group-hover:text-[#FF4925] transition-colors">
                  <span>READ ARTICLE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
