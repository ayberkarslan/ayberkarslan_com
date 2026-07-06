"use client";

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center selection:bg-transparent">
      
      {/* Bulletproof SVG Grid Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          </pattern>
          <radialGradient id="maskGradient" cx="50%" cy="50%" r="50%">
            <stop offset="20%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="gridMask">
            <rect width="100%" height="100%" fill="url(#maskGradient)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" mask="url(#gridMask)" />
      </svg>

      <div className="relative z-10 flex items-center justify-center">
        
        {/* Solid black base to completely block the grid from showing through */}
        <h1
          className="absolute text-[18rem] md:text-[24rem] font-black leading-none select-none tracking-tighter"
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
            color: "#000000",
          }}
        >
          A
        </h1>

        {/* 
          The 'A'. 
          Pure metallic rendering without any green spots.
          Simulates a horizon reflection (light top, dark middle, medium bottom).
          Animates opacity to simulate a slow, elegant ambient light pulse.
        */}
        <motion.h1
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[18rem] md:text-[24rem] font-black leading-none select-none tracking-tighter drop-shadow-2xl"
          style={{
            backgroundImage: "linear-gradient(180deg, #ffffff 0%, #888888 48%, #111111 52%, #444444 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.1)",
          }}
        >
          A
        </motion.h1>
      </div>
    </main>
  );
}
