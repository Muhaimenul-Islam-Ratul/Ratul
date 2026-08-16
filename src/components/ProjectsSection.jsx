import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../data/mockData';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal, staggerContainer, fadeUp, slideLeft } from '../animations';

export default function ProjectsSection({ onSelectProject }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const { ref, isInView } = useScrollReveal(0.1);
  const activeProject = PROJECTS_DATA[activeProjectIndex];

  return (
    <section id="works" ref={ref} className="py-24 bg-[#0A0A0A] border-b border-white/10 relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">

        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-white/10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          <motion.div variants={slideLeft}>
            <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase block mb-2">(SELECTED WORKS)</span>
            <h2 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide">
              LATEST WORK <span className="text-[#FF4925] font-mono text-2xl md:text-4xl align-top">(04)</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-neutral-400 font-mono text-xs max-w-xs">
            A curated showcase of recent digital products, branding systems, and web architecture.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left sticky panel */}
          <motion.div
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-8 bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md card-shine"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Index counter — animates on tab change */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeProject.index}
                  className="font-anton text-7xl text-[#FF4925]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {activeProject.index}
                </motion.span>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeProject.category}
                  className="font-mono text-xs px-3 py-1 bg-white/5 rounded-full text-neutral-400 border border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeProject.category}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Project tabs */}
            <div className="space-y-2">
              {PROJECTS_DATA.map((project, idx) => {
                const isActive = idx === activeProjectIndex;
                return (
                  <motion.button
                    key={project.id}
                    onClick={() => setActiveProjectIndex(idx)}
                    className={`w-full text-left py-3 px-4 rounded-xl font-mono text-sm sm:text-base flex items-center justify-between transition-colors duration-300 ${
                      isActive ? 'bg-[#FF4925] text-white font-bold' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                    whileHover={{ x: isActive ? 0 : 6 }}
                    whileTap={{ scale: 0.97 }}
                    animate={isActive ? { boxShadow: '0 0 28px rgba(255,73,37,0.45)' } : { boxShadow: '0 0 0px rgba(0,0,0,0)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <span>{project.shortTitle}</span>
                    <span className="text-xs opacity-75">{project.year}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Active project info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                className="pt-4 border-t border-white/10 space-y-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div>
                  <h3 className="font-anton text-3xl text-white mb-2">{activeProject.name}</h3>
                  <p className="text-neutral-300 text-sm font-light leading-relaxed">{activeProject.tagline}</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-2">
                  <div>CLIENT: <span className="text-white">{activeProject.client}</span></div>
                  <div>ROLE: <span className="text-white">{activeProject.role}</span></div>
                </div>
                <motion.button
                  onClick={() => onSelectProject(activeProject)}
                  className="w-full mt-4 py-3.5 bg-white text-black font-mono text-xs font-bold tracking-wider rounded-xl flex items-center justify-center gap-2 group"
                  whileHover={{ backgroundColor: '#FF4925', color: '#fff', scale: 1.02, boxShadow: '0 0 28px rgba(255,73,37,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <span>VIEW CASE STUDY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: project cards */}
          <motion.div
            className="lg:col-span-7 space-y-10"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ delayChildren: 0.4, staggerChildren: 0.15 }}
          >
            {PROJECTS_DATA.map((project, idx) => {
              const isActive = idx === activeProjectIndex;
              return (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  onClick={() => { setActiveProjectIndex(idx); onSelectProject(project); }}
                  className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer card-shine ${
                    isActive ? 'border-[#FF4925]/60' : 'border-white/10 opacity-80 hover:opacity-100'
                  }`}
                  animate={isActive ? { boxShadow: '0 0 50px rgba(255,73,37,0.3)', scale: 1.01 } : { boxShadow: '0 0 0px rgba(0,0,0,0)', scale: 1 }}
                  whileHover={{ y: -6, borderColor: 'rgba(255,73,37,0.4)' }}
                  transition={{ type: 'spring', stiffness: 250, damping: 22 }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <motion.img
                      src={project.coverImage}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 bg-black/70 backdrop-blur-md rounded-full font-mono text-xs text-white border border-white/10">
                        {project.index} {project.name}
                      </span>
                      <motion.span
                        className="p-2 bg-black/70 backdrop-blur-md rounded-full text-white"
                        whileHover={{ backgroundColor: '#FF4925', rotate: 45 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="font-mono text-xs text-[#FF4925] uppercase tracking-wider block mb-1">{project.category}</span>
                      <h4 className="font-anton text-3xl sm:text-4xl text-white uppercase">{project.name}</h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            onClick={() => onSelectProject(PROJECTS_DATA[0])}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-mono text-xs font-bold text-white"
            whileHover={{ borderColor: '#FF4925', backgroundColor: '#FF4925', color: '#fff', scale: 1.04, boxShadow: '0 0 30px rgba(255,73,37,0.4)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <span>EXPLORE ALL CASE STUDIES</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
