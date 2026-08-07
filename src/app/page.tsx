"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FileBox, Cpu, TerminalSquare, Command, X, GitBranch, Star, Users, Code2, BookOpen, LineChart } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [activeView, setActiveView] = useState<'home' | 'menu' | 'github'>('home');
  const [githubData, setGithubData] = useState<any>(null);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);

  // Fetch GitHub data when github view opens
  useEffect(() => {
    if (activeView === 'github' && !githubData && !isLoadingGithub) {
      setIsLoadingGithub(true);
      Promise.all([
        fetch('https://api.github.com/users/ayberkarslan').then(r => r.json()),
        fetch('https://api.github.com/users/ayberkarslan/repos?per_page=100').then(r => r.json())
      ]).then(([user, repos]) => {
        let stars = 0;
        let languageMap: Record<string, number> = {};
        
        if (Array.isArray(repos)) {
          repos.forEach(repo => {
            stars += repo.stargazers_count || 0;
            if (repo.language) {
              languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
            }
          });
        }
        
        const languages = Object.entries(languageMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(l => l[0]);

        setGithubData({ user, stars, languages });
      }).catch(err => {
        console.error("Github fetch error:", err);
      }).finally(() => {
        setIsLoadingGithub(false);
      });
    }
  }, [activeView, githubData, isLoadingGithub]);

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
    { 
      id: 'yrtool-graph',
      name: 'YRTools Graph', 
      desc: 'Roket telemetri analiz grafiği.', 
      icon: LineChart, 
      url: 'https://yrtools.ayberkarslan.com' 
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

      {/* Perfectly Centered Dynamic Dashboards & Logo Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pb-16 px-6">
        
        {/* Animated Custom Logo (Background Watermark Mode) */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ zIndex: 0 }}
          initial={false}
          animate={{
            opacity: activeView === 'home' ? 1 : 0.1,
          }}
          transition={{ 
            duration: activeView === 'home' ? 0.9 : 0.2, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        >
          <div className="w-64 h-64 md:w-96 md:h-96 relative">
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
                className="object-contain select-none"
                draggable={false}
                priority
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="relative w-full max-w-5xl" style={{ zIndex: 10 }}>
          <AnimatePresence mode="wait">
            
            {/* 1. SİSTEMLER MENU */}
          {activeView === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-10 w-full max-w-4xl will-change-transform"
            >
              <div className="text-center space-y-4">
                <p className="text-white/80 text-sm md:text-base tracking-[0.3em] uppercase font-light" style={{ fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', sans-serif" }}>
                  SİSTEM MENÜSÜ
                </p>
              </div>

              {/* Pure Glassmorphic App Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
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

          {/* 2. GITHUB STATS MENU */}
          {activeView === 'github' && (
            <motion.div
              key="github"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-10 w-full px-6 max-w-5xl will-change-transform"
            >
              {isLoadingGithub || !githubData ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                  <p className="text-white/50 text-xs tracking-[0.2em] font-mono animate-pulse">SİSTEMLER OKUNUYOR...</p>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-6 w-full items-stretch">
                  
                  {/* Profile Card */}
                  <div className="flex-1 flex flex-col items-center justify-center p-8 bg-transparent backdrop-blur-2xl border border-white/10 rounded-3xl shadow-xl">
                     <img src={githubData.user.avatar_url} alt="Profile" className="w-24 h-24 rounded-full border border-white/20 mb-6 shadow-[0_0_20px_rgba(255,255,255,0.1)]" />
                     <h3 className="text-white font-medium tracking-[0.15em] text-sm mb-2 uppercase" style={{ fontFamily: "'-apple-system', 'SF Pro Display'" }}>{githubData.user.name || 'Ayberk Arslan'}</h3>
                     <p className="text-white/40 text-[10px] font-mono text-center mb-8 leading-relaxed max-w-[200px]">{githubData.user.bio || 'Full-stack developer & hardware enthusiast.'}</p>
                     
                     <a href={githubData.user.html_url} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-[10px] text-white tracking-[0.2em] transition-all duration-300">
                       <GitBranch className="w-3.5 h-3.5"/> GITHUB'DA AÇ
                     </a>
                  </div>

                  {/* Stats Grid */}
                  <div className="flex-[2] grid grid-cols-2 gap-4">
                    <StatCard icon={BookOpen} label="Public Repos" value={githubData.user.public_repos} />
                    <StatCard icon={Star} label="Total Stars" value={githubData.stars} />
                    <StatCard icon={Users} label="Followers" value={githubData.user.followers} />
                    <StatCard icon={Code2} label="Top Stack" value={githubData.languages.join(' / ') || 'N/A'} isText />
                  </div>

                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>

        </div>
      </div>

      {/* Floating Apple-style Command Buttons */}
      <div className="absolute bottom-10 z-50 flex items-center justify-center h-16">
        
        <AnimatePresence mode="wait">
          {activeView === 'home' ? (
            <motion.div
              key="home-actions"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-4 items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView('menu')}
                className="flex items-center gap-3 px-6 py-3.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-300 will-change-transform"
              >
                <Command className="w-4 h-4" />
                <span className="text-xs tracking-[0.15em] font-medium" style={{ fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', sans-serif" }}>SİSTEMLER</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView('github')}
                className="flex items-center gap-3 px-6 py-3.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-300 will-change-transform"
              >
                <GitBranch className="w-4 h-4" />
                <span className="text-xs tracking-[0.15em] font-medium" style={{ fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', sans-serif" }}>GITHUB</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              key="btn-kapat"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView('home')}
              className="flex items-center gap-3 px-6 py-3.5 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-white shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-300 will-change-transform"
            >
              <X className="w-4 h-4" />
              <span className="text-xs tracking-[0.15em] font-medium" style={{ fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', sans-serif" }}>KAPAT</span>
            </motion.button>
          )}
        </AnimatePresence>
        
      </div>

    </main>
  );
}

const StatCard = ({ icon: Icon, label, value, isText = false }: { icon: any, label: string, value: string | number, isText?: boolean }) => (
  <div className="flex flex-col justify-center p-6 bg-transparent backdrop-blur-2xl border border-white/10 rounded-3xl shadow-xl hover:border-white/20 hover:bg-white/[0.02] transition-all duration-500 group">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-transparent rounded-xl border border-white/10 group-hover:border-white/30 transition-colors duration-500">
        <Icon className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-500" />
      </div>
      <span className="text-white/40 text-[10px] tracking-widest uppercase font-mono">{label}</span>
    </div>
    <span 
      className={`text-white ${isText ? 'text-sm font-mono' : 'text-3xl font-light'} tracking-wider group-hover:text-white/90 transition-colors duration-500`} 
      style={{ fontFamily: isText ? 'monospace' : "'-apple-system', 'SF Pro Display'" }}
    >
      {value}
    </span>
  </div>
);
