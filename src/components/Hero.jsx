import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* ════════════════════════════════════════
   Logo data — exact Framer CDN images + widths
════════════════════════════════════════ */
const LOGOS = [
  { src: 'https://framerusercontent.com/images/fG5uqOgl43qhhiPH56hF84UrTs.png', w: 116, h: 30, label: 'Logo 1' },
  { src: 'https://framerusercontent.com/images/zePNmwKsJJlIjKuawASK80nPtk.png', w: 142, h: 27, label: 'Logo 2' },
  { src: 'https://framerusercontent.com/images/Za3YaKBZ4ieum1B0ieifAFdPik.png', w: 142, h: 31, label: 'Logo 3' },
  { src: 'https://framerusercontent.com/images/VdZYGP1aARcAIODj5sWnjn1vDac.png', w: 148, h: 27, label: 'Logo 4' },
  { src: 'https://framerusercontent.com/images/cKWxePeq3jR2Saj0Xn8To9npdU.png', w: 110, h: 27, label: 'Logo 5' },
];

/* ════════════════════════════════════════
   BlurText — char-by-char opacity + blur reveal
   Matches Framer: display:inline-block, opacity, filter:blur, transform
════════════════════════════════════════ */
function BlurText({ text, baseDelay = 0, color = '#ffffff' }) {
  const chars = Array.from(text);
  return (
    <>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            color,
            willChange: 'transform',
          }}
          initial={{ opacity: 0, filter: 'blur(6px)', y: 8 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.4,
            delay: baseDelay + i * 0.025,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </>
  );
}

/* ════════════════════════════════════════
   WordReveal — word-by-word slide-up
   Matches Framer: display:inline-block, opacity, transform
════════════════════════════════════════ */
function WordReveal({ text, baseDelay = 0, color = '#ffffff', fontWeight }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span
            style={{ display: 'inline-block', color, fontWeight, willChange: 'transform' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: baseDelay + i * 0.09,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </React.Fragment>
      ))}
    </>
  );
}

/* ════════════════════════════════════════
   Logo Marquee — matches Framer's mask-image + translateX scroll
════════════════════════════════════════ */
function LogoMarquee() {
  // Triple-clone for seamless loop
  const items = [...LOGOS, ...LOGOS, ...LOGOS];
  return (
    <section
      style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '10px 0',
        maskImage:
          'linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%)',
      }}
    >
      <ul
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 50,
          padding: 0,
          margin: 0,
          listStyle: 'none',
          animation: 'framer-marquee 24s linear infinite',
          willChange: 'transform',
          flexShrink: 0,
        }}
      >
        {items.map((logo, idx) => (
          <li key={idx} aria-hidden={idx >= LOGOS.length} style={{ flexShrink: 0 }}>
            <div
              style={{
                position: 'relative',
                width: logo.w,
                height: logo.h,
                flexShrink: 0,
              }}
            >
              <img
                src={logo.src}
                alt={logo.label}
                loading="eager"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                  opacity: 0.7,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ════════════════════════════════════════
   FlipButton — exact Framer flip animation
   framer-1kn6thz-container > button.framer-bgdx60 > a.framer-rgb9mn
   Inner: BG scale-in on hover + vertical flip of label rows
════════════════════════════════════════ */
function FlipButton({ onClick }) {
  const [hovered, setHovered] = useState(false);

  const Arrow = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M2 12L12 2M12 2H4M12 2V10"
        stroke="rgb(255,73,37)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '0 22px',
    height: 46,
    whiteSpace: 'nowrap',
    color: 'rgb(255, 73, 37)',
    fontFamily: "'Geist', 'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    position: 'relative',
    zIndex: 1,
  };

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        /* Outer shell — red pill */
        background: 'rgb(255, 73, 37)',
        borderRadius: 1000,
        border: 'none',
        padding: 0,
        cursor: 'none',
        position: 'relative',
        display: 'inline-flex',
      }}
    >
      {/* Content ring — dark pill inside */}
      <div
        style={{
          background: 'rgb(34, 15, 13)',
          borderRadius: 1000,
          padding: 3,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}
      >
        {/* BG fill scale-in on hover */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgb(255, 73, 37)',
            borderRadius: 1000,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Flip window */}
        <div
          style={{
            overflow: 'hidden',
            height: 46,
            position: 'relative',
          }}
        >
          {/* Start + End rows stacked, flip translateY on hover */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column' }}
            animate={{ y: hovered ? '-50%' : '0%' }}
            transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Start row */}
            <div style={labelStyle}>
              <span>START A PROJECT</span>
              <Arrow />
            </div>
            {/* End row (clone) */}
            <div style={labelStyle}>
              <span>START A PROJECT</span>
              <Arrow />
            </div>
          </motion.div>
        </div>
      </div>
    </button>
  );
}

/* ════════════════════════════════════════
   HERO — faithful Framer structure replica
   DOM order mirrors Framer exactly:
     1. video container (absolute, full-screen)
     2. framer-1whmhg Bottom (absolute bottom, flex row)
        └── framer-134t04x Left (paragraph + logos)
        └── framer-hid1pa Right (button)
     3. framer-rawwrt H1 (absolute, top-right)
════════════════════════════════════════ */
export default function Hero({ onOpenContact }) {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  /* Paragraph split — white / rgb(85,85,85) */
  const lightText = 'We build brands, websites, and digital experiences';
  const darkText  = ' with intention, clarity and care.';

  return (
    <section
      id="home"
      /* framer-1v28xg2 */
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 600,
        background: '#000000',
        overflow: 'hidden',
      }}
    >
      {/* ── framer-1bxe6ik-container  (video, full section) ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          src="/hero-banner.mp4"
          preload="auto"
          muted
          loop
          playsInline
          autoPlay
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
            objectPosition: 'top center',
            backgroundColor: 'rgba(0,0,0,0)',
          }}
        />
      </div>

      {/* ── framer-1whmhg  Bottom bar ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 40px 36px',
          gap: 24,
        }}
      >
        {/* ── framer-134t04x  Left ── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
            maxWidth: 'min(460px, 42vw)',
          }}
        >
          {/* ── framer-1352ir2  Paragraph ── */}
          <p
            style={{
              margin: 0,
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: 'clamp(12px, 0.95vw, 15px)',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            <BlurText text={lightText} baseDelay={0.5}  color="#ffffff" />
            <BlurText text={darkText}  baseDelay={0.85} color="rgb(85, 85, 85)" />
          </p>

          {/* ── framer-f619q0  Logos ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            {/* framer-rkl1mn  "trusted by:" */}
            <p
              style={{
                margin: 0,
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 400,
                color: 'rgb(136, 136, 136)',
                letterSpacing: '0.02em',
              }}
            >
              trusted by:
            </p>
            {/* framer-vhmnju-container */}
            <LogoMarquee />
          </motion.div>
        </div>

        {/* ── framer-hid1pa  Right (button) ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ flexShrink: 0 }}
        >
          <FlipButton onClick={onOpenContact} />
        </motion.div>
      </div>

      {/* ── framer-rawwrt  H1 heading ── */}
      <div
        style={{
          position: 'absolute',
          top: 88,   /* below the 80px fixed navbar */
          right: 40,
          zIndex: 2,
          maxWidth: '35vw',
          textAlign: 'right',
          pointerEvents: 'none',
        }}
      >
        <h1
          style={{
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontSize: 'clamp(20px, 3vw, 56px)',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
            margin: 0,
          }}
        >
          {/* White — "Beyond Visuals." */}
          <WordReveal text="Beyond Visuals." baseDelay={0.1} color="#ffffff" fontWeight={400} />
          <br />
          {/* rgb(202,202,202) bold — "Built with Vision." */}
          <WordReveal text="Built with Vision." baseDelay={0.42} color="rgb(202, 202, 202)" fontWeight={700} />
        </h1>
      </div>

      {/* CSS keyframe for logo marquee */}
      <style>{`
        @keyframes framer-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3334%); }
        }
      `}</style>
    </section>
  );
}
