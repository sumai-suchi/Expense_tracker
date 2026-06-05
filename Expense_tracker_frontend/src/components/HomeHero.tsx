import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, TrendingUp, ArrowUpRight, DollarSign, Wallet, Sparkles, ShieldCheck, Zap, BarChart3, PieChart } from 'lucide-react';

export default function Hero(): React.JSX.Element {
  const [xy, setXy] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setMousePos({ x: clientX, y: clientY });
    
    const moveX = (clientX - width / 2) / 40;
    const moveY = (clientY - height / 2) / 40;
    setXy({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setXy({ x: 0, y: 0 });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center py-16 lg:py-20"
    >
      
      {/* ANIMATED GRADIENT ORBS BACKGROUND */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {/* Animated Aurora Glows */}
        <div className="absolute top-0 left-1/4 h-[800px] w-[800px] rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-transparent blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[700px] w-[700px] rounded-full bg-gradient-to-r from-cyan-500/15 via-emerald-500/10 to-transparent blur-[120px] [animation-delay:2s] animate-pulse" />
        <div className="absolute top-1/2 -right-96 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-transparent blur-[100px] [animation-delay:4s] animate-pulse" />
        
        {/* Interactive Cyberpunk Grid */}
        <div 
          style={{
            transform: `translate(${xy.x * 0.25}px, ${xy.y * 0.25}px)`,
            transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-30" 
        />

        {/* Floating Light Orbs */}
        <div className="absolute top-20 right-1/3 h-48 w-48 rounded-full bg-emerald-400/5 blur-3xl animate-float" />
        <div className="absolute bottom-32 left-1/4 h-64 w-64 rounded-full bg-teal-400/5 blur-3xl [animation-delay:3s] animate-float" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SECTION: CONTENT */}
          <div className="space-y-8 text-center lg:text-left">
            
            {/* BADGE WITH PULSE */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-gradient-to-r from-emerald-500/15 to-teal-500/10 px-4 py-2 text-xs font-semibold text-emerald-300 backdrop-blur-xl shadow-lg shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-500/60 hover:shadow-emerald-500/20 group w-fit mx-auto lg:mx-0">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </div>
              <span>New AI-Powered Insights Engine</span>
            </div>

            {/* MAIN HEADING WITH GRADIENT */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.15]">
                <span className="inline-block">Take Control</span>
                <br />
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 blur-2xl opacity-40" />
                  <span className="relative bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                    Of Your Wealth
                  </span>
                </span>
              </h1>
            </div>

            {/* SUBHEADING */}
            <p className="text-lg sm:text-xl text-slate-300 font-light leading-relaxed max-w-xl">
              Experience the future of personal finance. Real-time analytics, intelligent budgeting, and automated insights that adapt to your lifestyle.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <button className="group relative w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-slate-950 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                <div className="relative flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <div className="absolute inset-0 shadow-xl shadow-emerald-500/50" />
              </button>

              <button className="group w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-700 bg-slate-900/40 backdrop-blur-lg text-slate-200 font-semibold text-base transition-all duration-300 hover:border-emerald-500/50 hover:bg-slate-800/60 hover:text-emerald-300 active:scale-95 flex items-center justify-center gap-2">
                <Play className="h-4 w-4 fill-current" />
                Watch Demo
              </button>
            </div>

            {/* TRUST INDICATORS */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6 text-sm text-slate-400">
              <div className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <span>Bank-Grade Security</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-700" />
              <div className="flex items-center gap-2 hover:text-teal-400 transition-colors">
                <Wallet className="h-5 w-5 text-teal-400 flex-shrink-0" />
                <span>50K+ Users Trust Us</span>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: INTERACTIVE UI SHOWCASE */}
          <div 
            style={{
              transform: `translate(${xy.x * 0.5}px, ${xy.y * 0.5}px)`,
              transition: 'transform 0.15s ease-out'
            }}
            className="relative w-full h-full flex items-center justify-center lg:justify-end"
            onMouseEnter={() => setIsHoveringCard(true)}
            onMouseLeave={() => setIsHoveringCard(false)}
          >
            <div className="relative w-full max-w-md">
              
              {/* FLOATING STAT CARDS */}
              {/* Top Left Card */}
              <div className="absolute -left-6 -top-12 w-48 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-950/40 p-5 backdrop-blur-xl shadow-2xl animate-float text-center group transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/20 z-20">
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-2">Portfolio Growth</p>
                <h3 className="text-2xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">+28.5%</h3>
                <div className="w-full h-1 bg-slate-800 rounded-full mt-3 overflow-hidden">
                  <div className="h-full w-[85%] bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Bottom Right Card */}
              <div className="absolute -right-8 bottom-16 w-56 rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-950/40 to-slate-950/40 p-5 backdrop-blur-xl shadow-2xl animate-float-delayed text-center group transition-all duration-300 hover:border-teal-500/50 hover:shadow-teal-500/20 z-20" style={{ animationDelay: '0.3s' }}>
                <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-2">Monthly Savings</p>
                <h3 className="text-2xl font-black bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">$2,450</h3>
                <p className="text-[11px] text-emerald-400 mt-2 font-semibold">↑ 15% from last month</p>
              </div>

              {/* MAIN DASHBOARD CARD */}
              <div className="relative rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/60 via-slate-950/60 to-slate-900/60 p-8 backdrop-blur-2xl shadow-2xl shadow-black/50 transition-all duration-500 hover:border-slate-600/50 hover:shadow-emerald-500/10 group z-10">
                
                {/* Window Chrome */}
                <div className="flex items-center justify-between border-b border-slate-800/50 pb-5 mb-7">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/70 group-hover:bg-red-500 transition-colors" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/70 group-hover:bg-amber-500 transition-colors" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/70 group-hover:bg-emerald-500 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <div className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">Live Sync</span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="space-y-8">
                  
                  {/* Header Stats */}
                  <div className="space-y-2">
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-500">Total Balance</p>
                    <h2 className="text-4xl font-black tracking-tight text-white">$12,547.89</h2>
                  </div>

                  {/* Animated Progress Ring */}
                  <div className="flex items-center justify-center py-4">
                    <div className="relative h-40 w-40">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-slate-800/50"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeDasharray="212"
                          strokeDashoffset="30"
                          strokeLinecap="round"
                          className="transition-all duration-1000 animate-pulse group-hover:stroke-dashoffset-[20]"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#06b6d4" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-[11px] font-mono uppercase text-slate-500">Score</span>
                        <span className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">92</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 transition-all duration-300 hover:bg-slate-900/60 hover:border-emerald-500/30 group/item">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-300">Investments</span>
                      </div>
                      <span className="text-sm font-bold text-emerald-400">$5,200</span>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 transition-all duration-300 hover:bg-slate-900/60 hover:border-teal-500/30 group/item">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-teal-500/20 text-teal-400">
                          <PieChart className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-300">Expenses</span>
                      </div>
                      <span className="text-sm font-bold text-teal-400">$3,140</span>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 transition-all duration-300 hover:bg-slate-900/60 hover:border-cyan-500/30 group/item">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                          <BarChart3 className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-semibold text-slate-300">Savings Goals</span>
                      </div>
                      <span className="text-sm font-bold text-cyan-400">$4,208</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIVITY FEED CARD */}
              <div className="absolute -right-12 top-32 w-64 rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-5 backdrop-blur-xl shadow-2xl animate-float-delayed z-20 hidden lg:block" style={{ animationDelay: '0.1s' }}>
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Recent Activity</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 group/activity">
                    <div className="p-2 rounded-lg bg-green-500/10 text-green-400 flex-shrink-0 group-hover/activity:bg-green-500/20 transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-200">Salary Deposit</p>
                      <p className="text-[10px] text-slate-500">Today</p>
                    </div>
                    <span className="text-xs font-bold text-green-400 flex-shrink-0">+$4,200</span>
                  </div>

                  <div className="flex items-start gap-3 group/activity">
                    <div className="p-2 rounded-lg bg-red-500/10 text-red-400 flex-shrink-0 group-hover/activity:bg-red-500/20 transition-colors">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-200">Grocery</p>
                      <p className="text-[10px] text-slate-500">Yesterday</p>
                    </div>
                    <span className="text-xs font-bold text-red-400 flex-shrink-0">-$87.50</span>
                  </div>

                  <div className="flex items-start gap-3 group/activity">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0 group-hover/activity:bg-blue-500/20 transition-colors">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-200">Utility Bill</p>
                      <p className="text-[10px] text-slate-500">2 days ago</p>
                    </div>
                    <span className="text-xs font-bold text-blue-400 flex-shrink-0">-$120.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GLOBAL STYLES FOR ANIMATIONS */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(0px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-24px) translateX(0px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }

        .group:hover .group-hover\:stroke-dashoffset-\[20\] {
          stroke-dashoffset: 20;
        }
      `}</style>
    </section>
  );
}
