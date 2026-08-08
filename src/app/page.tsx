"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FileBox, Cpu, TerminalSquare, GitBranch, Star, Users, Code2, BookOpen, LineChart, LayoutGrid } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'systems' | 'github'>('systems');
  const [githubData, setGithubData] = useState<any>(null);
  const [isLoadingGithub, setIsLoadingGithub] = useState(false);

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
          .slice(0, 3)
          .map(l => l[0]);

        setGithubData({ user, stars, languages });
      }).catch(err => {
        console.error("Github fetch error:", err);
      }).finally(() => {
        setIsLoadingGithub(false);
      });
    }
  }, [githubData, isLoadingGithub]);

  const apps = [
    { 
      id: 'staxfile',
      name: 'STAXFile', 
      icon: FileBox, 
      url: 'https://staxfile.ayberkarslan.com' 
    },
    { 
      id: 'esp',
      name: 'ESP32-CORE', 
      icon: Cpu, 
      url: '#' 
    },
    { 
      id: 'terminal',
      name: 'TERMINAL', 
      icon: TerminalSquare, 
      url: '#' 
    },
    { 
      id: 'yrtool-graph',
      name: 'YRTools Graph', 
      icon: LineChart, 
      url: 'https://yrtgraph.ayberkarslan.com' 
    },
  ];

  return (
    <main 
      className="flex h-screen w-full bg-black text-white/90 overflow-hidden selection:bg-white/20"
      style={{ fontFamily: "'-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Helvetica Neue', sans-serif" }}
    >
      
      {/* SIDEBAR */}
      <aside className="relative z-10 w-72 border-r border-white/[0.08] bg-black flex flex-col justify-between p-8 h-full">
        <div className="flex flex-col gap-10">
          
          {/* Profile Section */}
          <div className="flex flex-col gap-6">
            <div className="w-14 h-14 rounded-lg overflow-hidden relative bg-white/5">
              {githubData?.user?.avatar_url ? (
                <img src={githubData.user.avatar_url} alt="Ayberk Arslan" className="w-full h-full object-cover grayscale opacity-90" />
              ) : (
                <div className="w-full h-full animate-pulse bg-white/5"></div>
              )}
            </div>
            <div>
              <h1 className="text-[13px] font-semibold tracking-[0.1em] text-white">MUHAMMET AYBERK ARSLAN</h1>
              <div className="text-[11px] text-white/40 mt-3 leading-relaxed tracking-wider flex flex-col gap-1" style={{ fontFamily: "monospace" }}>
                <span>embedded systems</span>
                <span>avionics</span>
                <span>professional linux larper</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab('systems')}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-[13px] font-medium tracking-wide transition-all duration-200 ${activeTab === 'systems' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <LayoutGrid className="w-4 h-4 opacity-70" />
              Sistemler
            </button>
            
            <button 
              onClick={() => setActiveTab('github')}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-[13px] font-medium tracking-wide transition-all duration-200 ${activeTab === 'github' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <GitBranch className="w-4 h-4 opacity-70" />
              GitHub
            </button>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <section className="relative z-10 flex-1 flex flex-col h-full bg-black">
        <header className="w-full px-12 py-10 sticky top-0 z-20 bg-black">
          <h2 className="text-xl tracking-tight text-white font-medium">
            {activeTab === 'systems' ? 'Sistemler' : 'GitHub'}
          </h2>
        </header>

        <div className="px-12 pb-10 max-w-6xl w-full">
          <AnimatePresence mode="wait">
            
            {/* SYSTEMS TAB */}
            {activeTab === 'systems' && (
              <motion.div
                key="systems"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {apps.map((app) => (
                  <a
                    key={app.id}
                    href={app.url}
                    className="group relative flex items-center gap-4 p-5 bg-black border border-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <div className="text-white/40 group-hover:text-white transition-colors duration-300">
                      <app.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[13px] font-medium tracking-wide text-white/70 group-hover:text-white transition-colors duration-300">
                      {app.name}
                    </h3>
                  </a>
                ))}
              </motion.div>
            )}

            {/* GITHUB TAB */}
            {activeTab === 'github' && (
              <motion.div
                key="github"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-8"
              >
                {isLoadingGithub || !githubData ? (
                  <div className="flex items-center gap-3 text-white/40 text-[11px] font-mono uppercase tracking-widest">
                    <div className="w-3 h-3 border border-white/20 border-t-white/80 rounded-full animate-spin" />
                    Veriler çekiliyor...
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <StatCard icon={BookOpen} label="Public Repos" value={githubData.user.public_repos} />
                      <StatCard icon={Star} label="Total Stars" value={githubData.stars} />
                      <StatCard icon={Users} label="Followers" value={githubData.user.followers} />
                      <StatCard icon={Code2} label="Top Stack" value={githubData.languages.join(' / ') || 'N/A'} isText />
                    </div>

                    <a 
                      href={githubData.user.html_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-white/40 hover:text-white transition-colors"
                    >
                      Profile Git <GitBranch className="w-3 h-3" />
                    </a>
                  </>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

    </main>
  );
}

const StatCard = ({ icon: Icon, label, value, isText = false }: { icon: any, label: string, value: string | number, isText?: boolean }) => (
  <div className="flex flex-col p-5 bg-black border border-white/10 hover:border-white/20 transition-colors duration-300">
    <div className="flex items-center gap-3 mb-6">
      <Icon className="w-4 h-4 text-white/30" strokeWidth={1.5} />
      <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-mono">{label}</span>
    </div>
    <span className={`text-white/90 ${isText ? 'text-sm font-mono' : 'text-2xl font-light'} tracking-tight`}>
      {value}
    </span>
  </div>
);
