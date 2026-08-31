"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  FileBox, 
  Cpu, 
  Star, 
  Users, 
  Code2, 
  BookOpen, 
  LineChart, 
  ArrowUpRight, 
  Radio,
  LayoutGrid,
  Activity,
  Layers,
  Terminal as TerminalIcon,
  Sparkles,
  X,
  Mail,
  Shield,
  Compass,
  Monitor,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward
} from 'lucide-react';
import Image from 'next/image';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Home() {
  const [activeMode, setActiveMode] = useState<'home' | 'systems' | 'telemetry' | 'terminal' | 'stack'>('home');
  const [githubData, setGithubData] = useState<any>(null);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);

  // Background Audio Player
  const playlist = ['/sarki.mp3', '/sarki1.mp3', '/sarki2.mp3', '/sarki3.mp3', '/sarki4.mp3', '/sarki5.mp3', '/sarki6.mp3', '/sarki7.mp3'];
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(playlist[currentTrackIndex]);
    audioRef.current.onended = () => {
      handleNextTrack();
    };
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = playlist[nextIndex];
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  };

  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    { 
      command: 'neofetch', 
      output: (
        <div className="text-white/80 font-mono text-[11px] leading-relaxed">
          <span className="text-[#0bde0e] font-semibold">ayberk@systems</span>:~$ systemctl status engineer.service<br />
          <span className="text-white/40">●</span> Host: Muhammet Ayberk Arslan<br />
          <span className="text-white/40">●</span> Title: Professional Linux Larper<br />
          <span className="text-white/40">●</span> Domains: Embedded Systems, STM32, ESP32, Avionics, Linux, UI/UX<br />
          <span className="text-white/40">●</span> Status: All Nodes Nominal (100% Online)<br />
          <span className="text-[#0bde0e]">Kullanılabilir komutlar: help, systems, skills, contact, clear, exit</span>
        </div>
      )
    }
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener (1: Merkez, 2: Sistemler, 3: Telemetry, 4: Terminal, 5: Stack, Esc: Merkez)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === terminalInputRef.current) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Escape' || e.key === '1') setActiveMode('home');
      if (e.key === '2') setActiveMode('systems');
      if (e.key === '3') window.open('https://staxfile.ayberkarslan.com', '_blank');
      if (e.key === '4') setActiveMode('terminal');
      if (e.key === '5') setActiveMode('stack');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch GitHub live data
  useEffect(() => {
    if (!githubData && !isLoadingGithub) {
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
          .slice(0, 4)
          .map(l => l[0]);

        setGithubData({ user, stars, languages, reposCount: user?.public_repos || repos.length || 0 });
      }).catch(err => {
        console.error("Github fetch error:", err);
      }).finally(() => {
        setIsLoadingGithub(false);
      });
    }
  }, [githubData, isLoadingGithub]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = terminalInput.trim().toLowerCase();
    if (!trimmed) return;

    let output: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        output = (
          <div className="flex flex-col gap-1 text-white/70">
            <p><span className="text-[#0bde0e] font-semibold">systems</span> - Canlı projeleri ve subdomainleri listele</p>
            <p><span className="text-[#0bde0e] font-semibold">skills</span> - Gömülü, aviyonik, linux ve web yetenek matrisi</p>
            <p><span className="text-[#0bde0e] font-semibold">contact</span> - İletişim bilgileri ve e-posta</p>
            <p><span className="text-[#0bde0e] font-semibold">exit</span> - Merkeze dön (Home deck)</p>
            <p><span className="text-[#0bde0e] font-semibold">clear</span> - Terminal geçmişini temizle</p>
          </div>
        );
        break;
      case 'systems':
        output = (
          <div className="flex flex-col gap-1 text-white/80">
            <p>1. <span className="text-[#0bde0e]">STAXFile</span>: staxfile.ayberkarslan.com (P2P Şifreli Dosya Ağı)</p>
            <p>2. <span className="text-[#0bde0e]">YRTools Graph</span>: yrtgraph.ayberkarslan.com (Aviyonik Telemetri)</p>
            <p>3. <span className="text-[#0bde0e]">YRTools ESP32</span>: yrtgraphesp32.ayberkarslan.com (Donanım Telemetri Streamer)</p>
            <p>4. <span className="text-[#0bde0e]">ESP32 Core</span>: IoT Sensör Mesh & Telemetri Yönetimi</p>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="flex flex-col gap-1 text-white/80">
            <p><span className="text-[#0bde0e]">Gömülü & Aviyonik:</span> C, C++, ESP32 (ESP-IDF), STM32, FreeRTOS, CAN Bus, SPI, I2C, UART, Uçuş Sensörleri (IMU)</p>
            <p><span className="text-blue-400">Sistem & Linux:</span> Linux Kernel, Arch / Debian Linux, Bash Scripting, Docker, Cloudflare Edge, CI/CD</p>
            <p><span className="text-purple-400">Arayüz & Web:</span> Next.js, React 19, TypeScript, Tailwind CSS, WebSockets, WebRTC DataChannels, WebGL</p>
          </div>
        );
        break;
      case 'contact':
        output = (
          <p className="text-white/80">
            E-Posta: <a href="mailto:ayberkarslan0@gmail.com" className="text-[#0bde0e] underline">ayberkarslan0@gmail.com</a> | GitHub: github.com/ayberkarslan
          </p>
        );
        break;
      case 'exit':
        setActiveMode('home');
        setTerminalInput('');
        return;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output = <span className="text-red-400">komut bulunamadı: {trimmed}. Komut listesi için &apos;help&apos; yazın.</span>;
    }

    setTerminalHistory(prev => [...prev, { command: terminalInput, output }]);
    setTerminalInput('');
    setTimeout(() => {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const systems = [
    {
      id: 'staxfile',
      title: 'STAXFile',
      subtitle: 'P2P Encrypted File Mesh',
      desc: 'Sıfır bulut depolama alanı kullanan, tarayıcıdan tarayıcıya WebRTC & WebSockets şifreli doğrudan dosya transfer ağı.',
      url: 'https://staxfile.ayberkarslan.com',
      badge: 'Live Subdomain',
      icon: FileBox,
      tags: ['WebRTC', 'Next.js', 'AES-GCM', 'TypeScript']
    },
    {
      id: 'yrtool-graph',
      title: 'YRTools Graph',
      subtitle: 'Avionics Telemetry Hub',
      desc: 'Uçuş enstrümantasyonu ve jiroskop/ivmeölçer sensörleri için yüksek frekanslı gerçek zamanlı telemetri görselleştirici.',
      url: 'https://yrtgraph.ayberkarslan.com',
      badge: 'Realtime WebGL',
      icon: LineChart,
      tags: ['Canvas/WebGL', 'WebSockets', 'Telemetry', 'React']
    },
    {
      id: 'yrtool-graph-esp32',
      title: 'YRTools ESP32 Streamer',
      subtitle: 'Hardware Flight Node',
      desc: 'ESP32 WiFi/BLE donanımından doğrudan ham telemetri matrisleri alan optimize edilmiş donanım arayüzü.',
      url: 'https://yrtgraphesp32.ayberkarslan.com',
      badge: 'Hardware Node',
      icon: Cpu,
      tags: ['ESP-IDF', 'C++', 'FreeRTOS', 'IoT']
    },
    {
      id: 'esp-core',
      title: 'ESP32 Telemetry Core',
      subtitle: 'IoT Sensor Mesh Controller',
      desc: 'Düşük güç tüketimli dağıtık IoT ağ yönetim protokolü, sensör ağı ve asenkron telemetri yönlendirici.',
      url: '#',
      badge: 'Embedded Core',
      icon: Radio,
      tags: ['FreeRTOS', 'MQTT', 'UART/CAN', 'ESP32']
    },
  ];

  return (
    <main 
      className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-white/20 select-none flex flex-col justify-between p-6 sm:p-10 font-sans"
      style={{ fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Helvetica Neue', sans-serif" }}
    >
      
      {/* Background SVG Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </pattern>
            <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <mask id="gridMask">
              <rect width="100%" height="100%" fill="url(#ambientGlow)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" mask="url(#gridMask)" />
        </svg>
      </div>

      {/* TOP HUD BAR */}
      <header className="relative z-30 flex items-center justify-between w-full">
        
        {/* Profile / Identity */}
        <div 
          onClick={() => setActiveMode('home')}
          className="group cursor-pointer flex items-center gap-3.5"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white/5 p-1 group-hover:border-white/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <div className="flex flex-col">
            <span className="text-xs tracking-[0.2em] font-semibold text-white/90 group-hover:text-white uppercase transition-colors">
              MUHAMMET AYBERK ARSLAN
            </span>
            <span className="text-[10px] font-mono text-white/40 tracking-wider lowercase">
              professional linux larper
            </span>
          </div>
        </div>

        {/* Top Right: Completely clean */}
        <div />

      </header>


      {/* CENTER STAGE / DYNAMIC VIEWPORT (Interactive HUD) */}
      <div className="relative z-20 flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-auto px-2">
        
        <AnimatePresence mode="wait">
          
          {/* 1. HOME / PURE HERO VIEW */}
          {activeMode === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center gap-8 max-w-3xl"
            >
              {/* Signature Breathing Logo */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
                <motion.div
                  animate={{
                    opacity: [0.35, 0.95, 0.35],
                    filter: [
                      "drop-shadow(0 0 10px rgba(255,255,255,0.05))",
                      "drop-shadow(0 0 35px rgba(255,255,255,0.35))",
                      "drop-shadow(0 0 10px rgba(255,255,255,0.05))"
                    ],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src="/logo.png" 
                    alt="Ayberk Arslan Logo" 
                    fill 
                    className="object-contain pointer-events-none select-none"
                    priority
                  />
                </motion.div>
              </div>

              {/* Title & Concise Descriptor */}
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white/95 leading-tight">
                  MUHAMMET AYBERK ARSLAN
                </h1>
                <p className="text-xs sm:text-sm font-mono text-white/40 tracking-[0.2em] uppercase max-w-xl mx-auto">
                  Gömülü Sistemler • Aviyonik Telemetri • Linux • Arayüz & Dağıtık Mimariler
                </p>
              </div>

              {/* Keyboard Telemetry Hint */}
              <div className="text-[11px] font-mono text-white/30 tracking-widest uppercase pt-2">
                [ <span className="text-white/60">1</span> Merkez • <span className="text-white/60">2</span> Sistemler • <span className="text-white/60">3</span> STAXFile • <span className="text-white/60">4</span> Shell • <span className="text-white/60">5</span> Yetenekler ]
              </div>
            </motion.div>
          )}

          {/* 2. SYSTEMS VIEW (BENTO CARDS) */}
          {activeMode === 'systems' && (
            <motion.div
              key="systems"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#0bde0e]">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white tracking-wide">Aktif Sistemler & Node&apos;lar</h2>
                    <p className="text-[11px] font-mono text-white/40">Subdomainlere ve canlı projelere doğrudan erişim</p>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveMode('home')}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
                {systems.map((sys) => {
                  const Icon = sys.icon;
                  return (
                    <a
                      key={sys.id}
                      href={sys.url}
                      target={sys.url !== '#' ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-black/60 hover:bg-white/[0.04] border border-white/10 hover:border-[#0bde0e]/40 backdrop-blur-2xl transition-all duration-300 shadow-xl"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-[#0bde0e]/30 text-white/80 group-hover:text-[#0bde0e] transition-colors">
                            <Icon className="w-5 h-5" strokeWidth={1.5} />
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#0bde0e] tracking-wider">
                            {sys.badge}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-semibold text-white group-hover:text-[#0bde0e] transition-colors">
                            {sys.title}
                          </h3>
                          <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#0bde0e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>

                        <p className="text-[11px] font-mono text-white/40 mb-3">{sys.subtitle}</p>
                        <p className="text-xs text-white/60 font-light leading-relaxed mb-4">{sys.desc}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                        {sys.tags.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[10px] font-mono text-white/50">
                            {t}
                          </span>
                        ))}
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* 3. TELEMETRY / GITHUB HUD VIEW */}
          {activeMode === 'telemetry' && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#0bde0e]">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white tracking-wide">Canlı Geliştirici Telemetrisi</h2>
                    <p className="text-[11px] font-mono text-white/40">GitHub API üzerinden anlık çekilen açık kaynak metrikleri</p>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveMode('home')}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Profile Card */}
                <div className="flex flex-col items-center text-center justify-between p-6 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-2xl">
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/20 mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      {githubData?.user?.avatar_url ? (
                        <img src={githubData.user.avatar_url} alt="Ayberk" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-white/5 animate-pulse" />
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-white">{githubData?.user?.name || 'Muhammet Ayberk Arslan'}</h3>
                    <span className="text-[11px] font-mono text-[#0bde0e] mt-0.5">@{githubData?.user?.login || 'ayberkarslan'}</span>
                    <p className="text-xs text-white/50 font-mono mt-3 leading-relaxed">
                      {githubData?.user?.bio || 'Professional Linux Larper • Embedded firmware & flight telemetry.'}
                    </p>
                  </div>

                  <a 
                    href="https://github.com/ayberkarslan" 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-6 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#0bde0e]/40 text-xs font-mono tracking-wider text-white transition-all text-center"
                  >
                    GitHub Profiline Git →
                  </a>
                </div>

                {/* Metrics Grid */}
                <div className="md:col-span-2 grid grid-cols-2 gap-3">
                  
                  <div className="flex flex-col justify-center p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-2xl">
                    <div className="flex items-center gap-2 mb-3 text-white/40">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">Public Repos</span>
                    </div>
                    <span className="text-3xl font-light text-white">{githubData ? githubData.reposCount : '—'}</span>
                    <span className="text-[10px] font-mono text-white/30 mt-1">Açık kaynak depolar</span>
                  </div>

                  <div className="flex flex-col justify-center p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-2xl">
                    <div className="flex items-center gap-2 mb-3 text-white/40">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">GitHub Stars</span>
                    </div>
                    <span className="text-3xl font-light text-white">{githubData ? githubData.stars : '—'}</span>
                    <span className="text-[10px] font-mono text-white/30 mt-1">Topluluk yıldızları</span>
                  </div>

                  <div className="flex flex-col justify-center p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-2xl">
                    <div className="flex items-center gap-2 mb-3 text-white/40">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">Followers</span>
                    </div>
                    <span className="text-3xl font-light text-white">{githubData?.user?.followers ?? '—'}</span>
                    <span className="text-[10px] font-mono text-white/30 mt-1">Takipçi kitlesi</span>
                  </div>

                  <div className="flex flex-col justify-center p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-2xl">
                    <div className="flex items-center gap-2 mb-3 text-white/40">
                      <Code2 className="w-4 h-4 text-purple-400" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">Top Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {githubData?.languages && githubData.languages.length > 0 ? (
                        githubData.languages.map((l: string) => (
                          <span key={l} className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/80">
                            {l}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs font-mono text-white/60">C++ / TS / Python</span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-white/30 mt-2">En aktif diller</span>
                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* 4. INTERACTIVE TERMINAL VIEW (ULTRA DARK & CYBER GREEN) */}
          {activeMode === 'terminal' && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col gap-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-black border border-[#0bde0e]/30 text-[#0bde0e] shadow-[0_0_15px_rgba(11,222,14,0.15)]">
                    <TerminalIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white tracking-wide">İnteraktif Sistem Shell</h2>
                    <p className="text-[11px] font-mono text-white/40">Komut yazmak için terminale tıklayın • &apos;help&apos; komut listesi</p>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveMode('home')}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Click-to-focus Terminal Container */}
              <div 
                onClick={() => terminalInputRef.current?.focus()}
                className="cursor-text rounded-2xl bg-[#030303] border border-white/15 hover:border-[#0bde0e]/40 transition-colors shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-2.5 bg-black/80 border-b border-white/10 font-mono text-[11px] text-white/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0bde0e]" style={{ boxShadow: "0 0 8px #0bde0e" }} />
                    <span className="ml-2 text-white/40">ayberk@shell: ~ (zsh)</span>
                  </div>
                  <span className="text-[#0bde0e] text-[10px] font-mono tracking-wider">● ACTIVE TTY</span>
                </div>

                <div className="p-5 font-mono text-xs text-white/90 flex flex-col gap-3.5 h-64 overflow-y-auto selection:bg-[#0bde0e]/30 selection:text-white">
                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-[#0bde0e]">
                        <span>ayberk@systems:~$</span>
                        <span className="text-white font-medium">{item.command}</span>
                      </div>
                      <div className="pl-3 border-l border-white/10 text-white/70">
                        {item.output}
                      </div>
                    </div>
                  ))}
                  <div ref={terminalEndRef} />

                  <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 mt-auto pt-2 border-t border-white/5">
                    <span className="text-[#0bde0e] shrink-0 font-semibold">ayberk@systems:~$</span>
                    <input 
                      ref={terminalInputRef}
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="komut yazmak için tıklayın (help, systems, skills, contact, exit)..."
                      className="w-full bg-transparent outline-none text-white font-mono placeholder:text-white/20 text-xs"
                      autoFocus={false}
                    />
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. COMPREHENSIVE SKILL & TECH MATRIX */}
          {activeMode === 'stack' && (
            <motion.div
              key="stack"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col gap-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#0bde0e]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white tracking-wide">Yetenek & Teknoloji Cephaneliği</h2>
                    <p className="text-[11px] font-mono text-white/40">Gömülü sistemler, aviyonik, donanım sürücüleri, linux ve modern arayüz mimarisi</p>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveMode('home')}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto pr-1">
                
                {/* 1. Embedded Systems */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-2xl flex flex-col gap-3 hover:border-[#0bde0e]/30 transition-colors">
                  <div className="flex items-center gap-2 text-[#0bde0e] font-semibold text-xs uppercase tracking-wider font-mono">
                    <Cpu className="w-4 h-4" />
                    <span>Gömülü Sistemler</span>
                  </div>
                  <p className="text-[11px] text-white/50 font-light leading-relaxed">
                    Mikrodenetleyiciler için gerçek zamanlı işletim sistemleri, bare-metal yazılımlar ve donanım sürücüleri.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                    {['ESP32', 'STM32', 'ESP-IDF', 'FreeRTOS', 'C / C++', 'Bare-Metal', 'Driver Dev'].map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[10px] font-mono text-white/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Avionics & Hardware Protocols */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-2xl flex flex-col gap-3 hover:border-amber-400/30 transition-colors">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider font-mono">
                    <Compass className="w-4 h-4" />
                    <span>Aviyonik & Donanım</span>
                  </div>
                  <p className="text-[11px] text-white/50 font-light leading-relaxed">
                    Uçuş telemetrisi, IMU jiroskop/ivmeölçer sensörleri ve endüstriyel veri hatları.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                    {['Uçuş Telemetrisi', 'IMU / Gyro', 'CAN Bus', 'SPI / I2C', 'UART / RS485', 'Wireless Packet'].map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[10px] font-mono text-white/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Linux & Systems DevOps */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-2xl flex flex-col gap-3 hover:border-blue-400/30 transition-colors">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-wider font-mono">
                    <Shield className="w-4 h-4" />
                    <span>Linux & Sistem</span>
                  </div>
                  <p className="text-[11px] text-white/50 font-light leading-relaxed">
                    Linux çekirdeği, shell scripting, dağıtık sunucu altyapıları ve bulut kenarı dağıtımı.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                    {['Arch Linux', 'Debian', 'Bash / Shell', 'Docker', 'Cloudflare Pages', 'Git CI/CD'].map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[10px] font-mono text-white/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. UI & Modern Web Architecture */}
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-2xl flex flex-col gap-3 hover:border-purple-400/30 transition-colors">
                  <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wider font-mono">
                    <Monitor className="w-4 h-4" />
                    <span>Arayüz & Web</span>
                  </div>
                  <p className="text-[11px] text-white/50 font-light leading-relaxed">
                    Modern reaktif web arayüzleri, WebSockets canlı akışları ve WebRTC P2P doğrudan veri transferi.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                    {['Next.js (App)', 'React 19', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'WebRTC Mesh', 'WebGL Canvas'].map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-[10px] font-mono text-white/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>


      {/* FOOTER BAR (MATHEMATICALLY CENTERED DOCK + QUIET UTILITIES) */}
      <footer className="relative z-30 flex items-center justify-between w-full pointer-events-none">
        
        {/* Left: Quiet, Non-Distracting Minimal Icons */}
        <div className="pointer-events-auto flex items-center gap-4 text-white/30 text-xs font-mono">
          <a 
            href="https://github.com/ayberkarslan" 
            target="_blank" 
            rel="noreferrer" 
            title="GitHub Profil"
            className="hover:text-white transition-colors p-1"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a 
            href="mailto:ayberkarslan0@gmail.com" 
            title="E-Posta Gönder"
            className="hover:text-white transition-colors p-1"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Center: FIXED & MATHEMATICALLY CENTERED COMMAND DOCK */}
        <div className="pointer-events-auto fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50">
          <nav className="flex items-center gap-1.5 p-1.5 rounded-full bg-black/80 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
            
            <button
              onClick={() => setActiveMode('home')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-200 ${
                activeMode === 'home' 
                  ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>MERKEZ [1]</span>
            </button>

            <button
              onClick={() => setActiveMode('systems')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-200 ${
                activeMode === 'systems' 
                  ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>SİSTEMLER [2]</span>
            </button>

            <a
              href="https://staxfile.ayberkarslan.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium tracking-wider text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <FileBox className="w-3.5 h-3.5" />
              <span>STAXFILE [3]</span>
            </a>

            <button
              onClick={() => setActiveMode('terminal')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-200 ${
                activeMode === 'terminal' 
                  ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>SHELL [4]</span>
            </button>

            <button
              onClick={() => setActiveMode('stack')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium tracking-wider transition-all duration-200 ${
                activeMode === 'stack' 
                  ? 'bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>YETENEKLER [5]</span>
            </button>

          </nav>
        </div>

        {/* Right: Functional Cyber Audio Player (Plays Local Playlist) */}
        <div className="pointer-events-auto flex items-center gap-2 text-white/30 text-xs font-mono">
          <div className="flex items-center gap-2 p-1 px-2.5 rounded-full bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
            <button 
              onClick={togglePlay}
              title={isPlaying ? "Müziği Durdur" : "Müziği Başlat"}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              {isPlaying ? (
                <>
                  <div className="flex items-center gap-0.5 h-2.5">
                    <span className="w-0.5 h-2.5 bg-[#0bde0e] animate-pulse"></span>
                    <span className="w-0.5 h-1.5 bg-[#0bde0e] animate-ping"></span>
                    <span className="w-0.5 h-2 bg-[#0bde0e] animate-pulse"></span>
                  </div>
                  <span className="text-[10px] text-white/60 tracking-wider">TRACK {currentTrackIndex + 1}</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 opacity-60" />
                  <span className="text-[10px] text-white/40 tracking-wider hidden sm:inline">AUDIO</span>
                </>
              )}
            </button>

            {isPlaying && (
              <button 
                onClick={handleNextTrack} 
                title="Sonraki Parça" 
                className="hover:text-white transition-colors pl-1 border-l border-white/10"
              >
                <SkipForward className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

      </footer>

    </main>
  );
}
