import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactModal({ isOpen, onClose }) {
  const [selectedServices, setSelectedServices] = useState(['Web Design & Dev']);
  const [selectedBudget, setSelectedBudget] = useState('$10k - $25k');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const servicesList = ['Branding & Identity', 'Web Design & Dev', 'Motion & 3D Visuals', 'Monthly Retainer'];
  const budgetList = ['$5k - $10k', '$10k - $25k', '$25k - $50k', '$50k+'];

  const toggleService = (s) =>
    setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    try { confetti({ particleCount: 120, spread: 80, origin: { y: 0.55 } }); } catch {}
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    show:   { opacity: 1, transition: { duration: 0.35 } },
    exit:   { opacity: 0, transition: { duration: 0.3, delay: 0.1 } }
  };
  const panelVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit:   { opacity: 0, y: 40, scale: 0.97, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#121212] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-[0_0_100px_rgba(255,73,37,0.35)] max-h-[90vh] overflow-y-auto"
          >
            {/* Close */}
            <motion.button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/10 text-white"
              whileHover={{ backgroundColor: '#FF4925', scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <span className="font-mono text-xs text-[#FF4925] tracking-widest uppercase flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4" /> START A PROJECT
                    </span>
                    <h2 className="font-anton text-3xl sm:text-4xl text-white uppercase">
                      LET'S BUILD SOMETHING EXTRAORDINARY
                    </h2>
                    <p className="text-neutral-400 text-xs font-light mt-1">
                      Fill out the project brief below and we'll reply within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Services */}
                    <div>
                      <label className="block font-mono text-xs text-neutral-400 uppercase mb-2">
                        WHAT SERVICES DO YOU NEED?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {servicesList.map((service, i) => {
                          const isSelected = selectedServices.includes(service);
                          return (
                            <motion.button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`px-4 py-2 rounded-full font-mono text-xs transition-colors ${
                                isSelected
                                  ? 'bg-[#FF4925] text-white border border-[#FF4925] font-bold'
                                  : 'bg-white/5 text-neutral-300 border border-white/10'
                              }`}
                              animate={isSelected ? { boxShadow: '0 0 18px rgba(255,73,37,0.55)' } : { boxShadow: '0 0 0px rgba(0,0,0,0)' }}
                              whileHover={{ scale: 1.06 }}
                              whileTap={{ scale: 0.94 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            >
                              {service}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block font-mono text-xs text-neutral-400 uppercase mb-2">
                        EXPECTED PROJECT BUDGET?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {budgetList.map(b => (
                          <motion.button
                            key={b}
                            type="button"
                            onClick={() => setSelectedBudget(b)}
                            className={`px-4 py-2 rounded-full font-mono text-xs transition-colors ${
                              selectedBudget === b
                                ? 'bg-white text-black font-bold'
                                : 'bg-white/5 text-neutral-300 border border-white/10'
                            }`}
                            animate={selectedBudget === b ? { boxShadow: '0 0 18px rgba(255,255,255,0.45)' } : { boxShadow: '0 0 0px rgba(0,0,0,0)' }}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          >
                            {b}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Text fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'YOUR NAME *', key: 'name', type: 'text', placeholder: 'John Doe' },
                        { label: 'EMAIL ADDRESS *', key: 'email', type: 'email', placeholder: 'john@company.com' }
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block font-mono text-xs text-neutral-400 uppercase mb-1">{f.label}</label>
                          <input
                            required
                            type={f.type}
                            placeholder={f.placeholder}
                            value={formData[f.key]}
                            onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF4925] transition-colors"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-neutral-400 uppercase mb-1">COMPANY / WEBSITE</label>
                      <input
                        type="text"
                        placeholder="company.com"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF4925] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-neutral-400 uppercase mb-1">PROJECT DETAILS & GOALS *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us about your project timeline, goals, and key deliverables..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF4925] transition-colors"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full py-4 bg-[#FF4925] text-white font-mono text-xs font-bold tracking-wider rounded-xl shadow-[0_0_30px_rgba(255,73,37,0.5)] flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.03, backgroundColor: '#E03410', boxShadow: '0 0 50px rgba(255,73,37,0.75)' }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    >
                      <span>SEND PROJECT BRIEF</span>
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="py-12 text-center space-y-6"
                >
                  <motion.div
                    className="w-20 h-20 bg-[#FF4925]/20 text-[#FF4925] rounded-full flex items-center justify-center mx-auto border border-[#FF4925]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h2 className="font-anton text-4xl text-white uppercase">PROJECT BRIEF RECEIVED!</h2>
                  <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-white font-bold">{formData.name}</span>. Our lead strategist will review your requirements and schedule a discovery call within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => { setIsSubmitted(false); onClose(); }}
                    className="px-8 py-3 bg-white text-black font-mono text-xs font-bold rounded-full"
                    whileHover={{ backgroundColor: '#FF4925', color: '#fff', scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  >
                    CLOSE WINDOW
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
