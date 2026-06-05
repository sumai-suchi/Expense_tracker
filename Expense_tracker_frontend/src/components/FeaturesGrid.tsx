import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, Bell, PieChart, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, features, gradient, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setCardPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCardPos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={{
        animation: `slideUp 0.6s ease-out ${delay}s backwards`,
      }}
    >
      {/* Cursor-Following Glow Effect */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            background: `radial-gradient(600px at ${cardPos.x}px ${cardPos.y}px, rgba(16, 185, 129, 0.15) 0%, transparent 80%)`,
            transition: 'background 0.1s linear',
          }}
        />
      )}

      {/* Animated Spotlight */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0 opacity-40"
          style={{
            background: `radial-gradient(300px at ${cardPos.x}px ${cardPos.y}px, rgba(34, 197, 94, 0.2) 0%, transparent 60%)`,
            transition: 'background 0.1s linear',
            filter: 'blur(20px)',
          }}
        />
      )}

      {/* Card Border Glow - Cursor Following */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-400/10 to-teal-400/5 opacity-60 pointer-events-none transition-all duration-300"
          style={{
            boxShadow: `0 0 40px rgba(16, 185, 129, 0.3), inset 0 0 40px rgba(16, 185, 129, 0.1)`,
          }}
        />
      )}

      {/* Main Card */}
      <div className="relative h-full p-8 rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-900/60 to-slate-950/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-slate-600/60 hover:shadow-2xl hover:shadow-slate-900/50 z-10">
        
        {/* Content */}
        <div className="relative z-20 h-full flex flex-col">
          
          {/* Icon Container with Animation */}
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl relative`}>
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 animate-pulse" style={{
              background: `linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)`
            }} />
            {icon}
          </div>

          {/* Title */}
          <h3 className={`text-2xl font-black mb-3 transition-all duration-500 ${
            isHovered 
              ? 'bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent' 
              : 'text-white'
          }`}>
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow transition-all duration-300 group-hover:text-slate-200">
            {description}
          </p>

          {/* Features List - Staggered Animation */}
          <div className="space-y-2.5 mb-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 transform transition-all duration-500"
                style={{
                  opacity: isHovered ? 1 : 0.5,
                  transform: isHovered ? 'translateX(0) opacity-100' : 'translateX(-12px) opacity-0',
                  transitionDelay: isHovered ? `${idx * 75}ms` : '0ms',
                }}
              >
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-all duration-300`} style={{
                  color: gradient === "from-emerald-400 to-teal-500" ? '#10b981' :
                          gradient === "from-teal-400 to-cyan-500" ? '#14b8a6' :
                          gradient === "from-cyan-400 to-blue-500" ? '#06b6d4' :
                          '#3b82f6'
                }} />
                <span className="text-xs text-slate-300 group-hover:text-slate-100 transition-colors">{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button className="group/btn flex items-center justify-between w-full px-4 py-2.5 rounded-lg border border-slate-700/50 bg-slate-900/30 hover:bg-slate-800/50 text-slate-300 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
            <span className="text-sm font-semibold">Learn More</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Floating Particles on Hover */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                left: cardPos.x + Math.random() * 40 - 20 + 'px',
                top: cardPos.y + Math.random() * 40 - 20 + 'px',
                background: gradient.includes('emerald') ? '#10b981' :
                             gradient.includes('teal') && !gradient.includes('cyan') ? '#14b8a6' :
                             gradient.includes('cyan') ? '#06b6d4' :
                             '#3b82f6',
                opacity: Math.random() * 0.6 + 0.2,
                animation: `float-particle 1.5s ease-out forwards`,
                zIndex: 15,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default function FeaturesGrid(): React.JSX.Element {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
    setShowCursor(true);
  };

  const handleMouseLeave = () => {
    setShowCursor(false);
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Bank Sync Magic",
      description: "Connect your bank securely and watch your transactions flow in automatically. No more manual entries.",
      features: ["Real-time sync", "256-bit encryption", "Multi-account support", "Instant categorization"],
      gradient: "from-emerald-400 to-teal-500",
      delay: 0.1,
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Smart Alerts",
      description: "Get intelligent notifications before you overspend. Stay in control with customizable budget thresholds.",
      features: ["Spending alerts", "Unusual activity detection", "Custom notifications", "Weekly summaries"],
      gradient: "from-teal-400 to-cyan-500",
      delay: 0.2,
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Visual Analytics",
      description: "Transform raw data into beautiful, interactive charts. Understand your finances at a glance.",
      features: ["Interactive dashboards", "Spending trends", "Category insights", "Goal tracking"],
      gradient: "from-cyan-400 to-blue-500",
      delay: 0.3,
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "AI Insights",
      description: "Get personalized recommendations powered by machine learning. Increase savings, optimize spending.",
      features: ["Smart recommendations", "Predictive analytics", "Financial goals", "Savings optimization"],
      gradient: "from-blue-400 to-purple-500",
      delay: 0.4,
    },
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* CUSTOM CURSOR */}
      {showCursor && (
        <>
          {/* Main Cursor Circle */}
          <div
            className="fixed w-8 h-8 rounded-full border-2 border-emerald-400/60 pointer-events-none z-50 mix-blend-screen"
            style={{
              left: mousePos.x - 16 + 'px',
              top: mousePos.y - 16 + 'px',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
              transition: 'all 0.1s ease-out',
            }}
          />
          
          {/* Outer Tracking Circle */}
          <div
            className="fixed w-12 h-12 rounded-full border border-emerald-400/30 pointer-events-none z-50 mix-blend-screen"
            style={{
              left: mousePos.x - 24 + 'px',
              top: mousePos.y - 24 + 'px',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />

          {/* Trailing Dots */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="fixed w-2 h-2 rounded-full bg-emerald-400 pointer-events-none z-40"
              style={{
                left: mousePos.x - 4 + 'px',
                top: mousePos.y - 4 + 'px',
                opacity: (5 - i) / 10,
                transform: `translate(${Math.cos(i * Math.PI / 2.5) * (i + 1) * 8}px, ${Math.sin(i * Math.PI / 2.5) * (i + 1) * 8}px)`,
                transition: `all 0.15s ease-out`,
              }}
            />
          ))}
        </>
      )}

      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        {/* Dynamic gradient orbs */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl [animation-delay:2s] animate-pulse" />
        <div className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl [animation-delay:4s] animate-pulse" />

        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="text-center mb-20 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-xl shadow-lg shadow-emerald-500/10">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </div>
            <span>Powerful Features</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tighter">
            <span className="block text-white mb-4">Everything You Need</span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 blur-3xl opacity-40" />
              <span className="relative bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                To Master Money
              </span>
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover the core features that make CentWise the most intelligent financial companion for modern professionals.
          </p>
        </div>

        {/* FEATURES GRID - BENTO BOX LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              features={feature.features}
              gradient={feature.gradient}
              delay={feature.delay}
            />
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="mt-24 text-center space-y-8">
          <div className="inline-block">
            <button className="group relative px-8 py-4 rounded-xl font-bold text-base text-slate-950 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
              <div className="relative flex items-center justify-center gap-2">
                Explore All Features
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              <div className="absolute inset-0 shadow-xl shadow-emerald-500/50" />
            </button>
          </div>

          <p className="text-slate-400 max-w-xl mx-auto">
            Join thousands of users who have transformed their financial lives with CentWise.
          </p>
        </div>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-particle {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
