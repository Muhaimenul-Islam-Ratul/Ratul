import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowUpRight } from 'lucide-react';
import { staggerContainer, fadeUp } from '../animations';

export default function ProjectDetailModal({ project, onClose, onOpenContact }) {
  const backdropVariants = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { duration: 0.35 } },
    exit:   { opacity: 0, transition: { duration: 0.3, delay: 0.1 } }
  };
  const panelVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.94 },
    show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit:   { opacity: 0, y: 50, scale: 0.96, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/88 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-12 shadow-[0_0_100px_rgba(255,73,37,0.3)] max-h-[92vh] overflow-y-auto"
          >
            {/* Close */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/5 border border-white/10 text-white z-20"
              whileHover={{ backgroundColor: '#FF4925', scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Hero header */}
            <motion.div
              className="space-y-6 mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="font-anton text-4xl text-[#FF4925]">{project.index}</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-neutral-300">
                  {project.category}
                </span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h2
                  className="font-anton text-4xl sm:text-6xl md:text-7xl text-white uppercase leading-none"
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                >
                  {project.name}
                </motion.h2>
              </div>

              <motion.p variants={fadeUp} className="text-neutral-300 text-lg sm:text-xl font-light leading-relaxed max-w-3xl">
                {project.tagline}
              </motion.p>

              {/* Specs grid */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-white/[0.02] border border-white/10 rounded-2xl font-mono text-xs"
              >
                {[
                  { label: 'CLIENT', value: project.client },
                  { label: 'YEAR', value: project.year },
                  { label: 'ROLE', value: project.role },
                  { label: 'LIVE LINK', value: `${project.id}.studio`, accent: true }
                ].map((spec) => (
                  <motion.div
                    key={spec.label}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <span className="text-neutral-500 block mb-1">{spec.label}</span>
                    <span className={`font-bold flex items-center gap-1 ${spec.accent ? 'text-[#FF4925]' : 'text-white'}`}>
                      {spec.value} {spec.accent && <ExternalLink className="w-3 h-3" />}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Cover image with parallax reveal */}
            <motion.div
              className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-12"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.img
                src={project.coverImage}
                alt={project.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </motion.div>

            {/* Content: overview + challenge + solution */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 pb-12 border-b border-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="md:col-span-6 space-y-6">
                {[
                  { label: 'OVERVIEW', text: project.overview },
                  { label: 'THE CHALLENGE', text: project.challenge }
                ].map((item) => (
                  <div key={item.label}>
                    <span className="font-mono text-xs text-[#FF4925] uppercase tracking-wider block mb-2">{item.label}</span>
                    <p className="text-neutral-300 text-sm font-light leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="md:col-span-6 space-y-6">
                <div>
                  <span className="font-mono text-xs text-[#FF4925] uppercase tracking-wider block mb-2">THE SOLUTION</span>
                  <p className="text-neutral-300 text-sm font-light leading-relaxed">{project.solution}</p>
                </div>

                {/* Results */}
                <div>
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-3">KEY RESULTS ACHIEVED:</span>
                  <div className="grid grid-cols-3 gap-3">
                    {project.results.map((res, idx) => (
                      <motion.div
                        key={idx}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 + idx * 0.1, duration: 0.45 }}
                        whileHover={{ borderColor: 'rgba(255,73,37,0.4)', backgroundColor: 'rgba(255,73,37,0.06)', y: -4 }}
                      >
                        <span className="font-anton text-2xl sm:text-3xl text-[#FF4925] block">{res.stat}</span>
                        <span className="font-mono text-[10px] text-neutral-400 uppercase">{res.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Gallery */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {project.detailImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(255,73,37,0.3)' }}
                  transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                >
                  <motion.img
                    src={img}
                    alt={`${project.name} gallery ${idx}`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.07 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Footer actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <motion.button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-neutral-300"
                whileHover={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff', x: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                ← BACK TO PROJECTS
              </motion.button>
              <motion.button
                onClick={() => { onClose(); onOpenContact(); }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FF4925] text-white font-mono text-xs font-bold rounded-full shadow-[0_0_25px_rgba(255,73,37,0.5)] flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, backgroundColor: '#E03410', boxShadow: '0 0 45px rgba(255,73,37,0.75)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <span>BUILD A PROJECT LIKE THIS</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
