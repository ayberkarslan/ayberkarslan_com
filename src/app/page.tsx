"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FileBox, Cpu, TerminalSquare, Command, X } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const apps = [
    { 
      id: 'staxfile',
      name: 'STAXFile', 
      desc: 'Gizli dosya paylaşım ağı.', 
      icon: FileBox, 
      url: 'https://staxfile.ayberkarslan.com' 
    },
    { 
      id: 'esp',
      name: 'ESP32-CORE', 
      desc: 'Donanım telemetri sunucusu.', 
      icon: Cpu, 
      url: '#' 
    },
    { 
      id: 'terminal',
      name: 'TERMINAL', 
      desc: 'Sistem logları ve erişim.', 
      icon: TerminalSquare, 
      url: '#' 
    },
  ];

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black flex flex-col items-center justify-center selection:bg-transparent font-sans">
      
      {/* Bulletproof SVG Grid Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          </pattern>
          <radialGradient id="maskGradient" cx="50%" cy="50%" r="50%">
            <stop offset="10%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="gridMask">
            <rect width="100%" height="100%" fill="url(#maskGradient)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" mask="url(#gridMask)" />
      </svg>

      {/* Top Left Apple-style Typography */}
      <div className="absolute top-6 left-8 z-50">
        <h2 
          className="text-xs tracking-[0.2em] text-white/50 uppercase select-none" 
          style={{ fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Helvetica Neue', sans-serif", fontWeight: 500 }}
        >
          MUHAMMET AYBERK ARSLAN
        </h2>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        
        {/* Animated Custom Logo */}
        <motion.div
          animate={{
            y: isMenuOpen ? -150 : 0,
            scale: isMenuOpen ? 0.35 : 1,
            opacity: isMenuOpen ? 0.7 : 1,
          }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96 will-change-transform"
        >
          {/* Logo Breathing Animation */}
          <motion.div
            animate={{
              opacity: [0.4, 1, 0.4],
              filter: ["drop-shadow(0 0 5px rgba(255,255,255,0.1))", "drop-shadow(0 0 25px rgba(255,255,255,0.6))", "drop-shadow(0 0 5px rgba(255,255,255,0.1))"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-full relative will-change-transform"
          >
            <Image 
              src="/logo.png" 
              alt="Ayberk Arslan Logo" 
              fill
              className="object-contain select-none pointer-events-none"
              draggable={false}
              priority
            />
          </motion.div>
        </motion.div>

        {/* Premium Dashboard Menu Grid */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="absolute top-[50%] flex flex-col items-center gap-10 w-full px-6 will-change-transform"
            >
              <div className="text-center space-y-4">
                <p className="text-white/80 text-sm md:text-base tracking-[0.3em] uppercase font-light" style={{ fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', sans-serif" }}>
                  Muhammet Ayberk ARSLAN
                </p>
              </div>

              {/* Pure Glassmorphic App Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
                {apps.map((app) => (
                  <motion.a
                    key={app.id}
                    href={app.url}
                    whileHover={{ scale: 1.03, y: -5, backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex flex-col items-center justify-center p-8 bg-transparent backdrop-blur-2xl border border-white/10 rounded-3xl cursor-pointer group transition-all duration-500 shadow-xl"
                  >
                    <div className="relative mb-6 p-4 rounded-2xl border border-white/10 bg-transparent group-hover:border-white/30 transition-colors duration-500">
                      <app.icon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    
                    <h4 className="relative text-xs font-bold tracking-[0.2em] text-white/80 mb-3 uppercase transition-colors duration-500 group-hover:text-white">
                      {app.name}
                    </h4>
                    
                    <p className="relative text-[10px] text-white/40 text-center tracking-widest leading-relaxed transition-colors duration-500 group-hover:text-white/70" style={{ fontFamily: "monospace" }}>
                      {app.desc}
                    </p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Floating Apple-style Command Button */}
      <div className="absolute bottom-10 z-50 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-3 px-6 py-3.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 will-change-transform"
        >
          {isMenuOpen ? (
            <>
              <X className="w-4 h-4" />
              <span className="text-xs tracking-[0.15em] font-medium" style={{ fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', sans-serif" }}>KAPAT</span>
            </>
          ) : (
            <>
              <Command className="w-4 h-4" />
              <span className="text-xs tracking-[0.15em] font-medium" style={{ fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', sans-serif" }}>SİSTEMLER</span>
            </>
          )}
        </motion.button>
      </div>

    </main>
  );
}
