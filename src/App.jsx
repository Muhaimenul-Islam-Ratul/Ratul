import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import ProcessSection from './components/ProcessSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import JournalSection from './components/JournalSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ProjectDetailModal from './components/ProjectDetailModal';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [curtainDone, setCurtainDone] = useState(false);

  // Custom cursor
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Remove curtain after animation
    const t = setTimeout(() => setCurtainDone(true), 1200);

    // Cursor tracking — starts off-screen, snaps to real position on first move
    const handleMove = (e) => {
      const x = e.clientX, y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = x + 'px';
        dotRef.current.style.top  = y + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = x + 'px';
        ringRef.current.style.top  = y + 'px';
      }
    };

    const handleEnter = () => ringRef.current?.classList.add('hovering');
    const handleLeave = () => ringRef.current?.classList.remove('hovering');

    window.addEventListener('mousemove', handleMove);

    // Add hover class on interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      clearTimeout(t);
      window.removeEventListener('mousemove', handleMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  const handleNavigate = (href) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FF4925] selection:text-white relative">
      {/* Page load curtain wipe */}
      {!curtainDone && <div className="page-curtain" />}

      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      {/* Custom cursor — starts off-screen until first mouse move */}
      <div ref={dotRef}  className="cursor-dot"  style={{ left: '-200px', top: '-200px' }} />
      <div ref={ringRef} className="cursor-ring" style={{ left: '-200px', top: '-200px' }} />

      {/* Fixed Top Navbar */}
      <Navbar
        onOpenContact={() => setIsContactOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Page Sections */}
      <main>
        <Hero onOpenContact={() => setIsContactOpen(true)} />
        <LogoMarquee />
        <AboutSection />
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
        <ServicesSection onOpenContact={() => setIsContactOpen(true)} />
        <ProcessSection />
        <PricingSection onOpenContact={() => setIsContactOpen(true)} />
        <TestimonialsSection />
        <JournalSection />
      </main>

      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onNavigate={handleNavigate}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setIsContactOpen(true)}
      />
    </div>
  );
}
