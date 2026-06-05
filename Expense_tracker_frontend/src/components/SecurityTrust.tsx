import React, { useState } from 'react';
import { Shield, Lock, CheckCircle2, Eye, AlertCircle, ArrowRight, Zap, Key, Server } from 'lucide-react';

interface SecurityFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  gradient: string;
  delay: number;
}

const SecurityCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  gradient: string;
  delay: number;
  isHovered: boolean;
  cardPos: { x: number; y: number };
}> = ({ icon, title, description, details, gradient, delay, isHovered, cardPos }) => {
  return (
    <div
      style={{
        animation: `slideUp 0.6s ease-out ${delay}s backwards`,
      }}
      className="group relative h-full"
    >
      {/* Cursor-Following Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            background: `radial-gradient(600px at ${cardPos.x}px ${cardPos.y}px, rgba(16, 185, 129, 0.2) 0%, transparent 80%)`,
            transition: 'background 0.1s linear',
          }}
        />
      )}

      {/* Card Border Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-2xl border border-emerald-400/40 opacity-60 pointer-events-none"
          style={{
            boxShadow: `0 0 40px rgba(16, 185, 129, 0.3), inset 0 0 40px rgba(16, 185, 129, 0.1)`,
          }}
        />
      )}

      {/* Main Card */}
      <div className="relative h-full p-8 rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-900/60 to-slate-950/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-slate-600/60 hover:shadow-2xl z-10">
        
        {/* Content */}
        <div className="relative z-20 h-full flex flex-col">
          
          {/* Icon Container */}
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-6 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl`}>
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

          {/* Details List */}
          <div className="space-y-2.5">
            {details.map((detail, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 transform transition-all duration-500"
                style={{
                  opacity: isHovered ? 1 : 0.6,
                  transform: isHovered ? 'translateX(0) opacity-100' : 'translateX(-12px) opacity-0',
                  transitionDelay: isHovered ? `${idx * 75}ms` : '0ms',
                }}
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-400" />
                <span className="text-xs text-slate-300 group-hover:text-slate-100 transition-colors">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SecurityBadge: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  delay: number;
}> = ({ icon, title, subtitle, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      style={{
        animation: `slideUp 0.6s ease-out ${delay}s backwards`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Background */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-300`} />

      {/* Badge */}
      <div className="relative p-6 rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-slate-950/40 backdrop-blur-xl hover:border-emerald-400/50 transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
        <div className={`p-3 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white mb-3 transition-all duration-300 ${isHovered ? 'scale-110 shadow-lg shadow-emerald-500/50' : ''}`}>
          {icon}
        </div>
        <h4 className="font-bold text-white mb-1 text-sm">{title}</h4>
        <p className="text-xs text-slate-300">{subtitle}</p>
      </div>
    </div>
  );
};

const SecurityTrust: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
    setShowCursor(true);
  };

  const handleMouseLeave = () => {
    setShowCursor(false);
    setHoveredCard(null);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setCardPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCard(idx);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  const securityFeatures: SecurityFeature[] = [
    {
      icon: <Lock className="w-7 h-7" />,
      title: "Bank-Grade Encryption",
      description: "Your financial data is protected with AES-256 encryption, the same military-grade standard used by banks.",
      details: ["256-bit AES encryption", "TLS 1.3 in transit", "End-to-end security", "Zero-knowledge architecture"],
      gradient: "from-emerald-400 to-teal-500",
      delay: 0.1,
    },
    {
      icon: <Eye className="w-7 h-7" />,
      title: "Read-Only Access",
      description: "CentWise can only view your transactions. We have zero ability to move, transfer, or modify your funds.",
      details: ["View-only permissions", "No write access", "Cannot initiate transfers", "Approved by financial auditors"],
      gradient: "from-teal-400 to-cyan-500",
      delay: 0.2,
    },
    {
      icon: <Server className="w-7 h-7" />,
      title: "Secure Infrastructure",
      description: "Built on AWS with ISO 27001 compliance, redundancy, and continuous security monitoring.",
      details: ["AWS cloud infrastructure", "99.99% uptime SLA", "Daily security audits", "Automated threat detection"],
      gradient: "from-cyan-400 to-blue-500",
      delay: 0.3,
    },
  ];

  const badges = [
    { icon: <Shield className="w-5 h-5" />, title: "SOC 2 Type II", subtitle: "Certified Secure", delay: 0.1 },
    { icon: <Key className="w-5 h-5" />, title: "GDPR Compliant", subtitle: "Data Privacy", delay: 0.2 },
    { icon: <AlertCircle className="w-5 h-5" />, title: "PCI-DSS Level 1", subtitle: "Payment Security", delay: 0.3 },
    { icon: <CheckCircle2 className="w-5 h-5" />, title: "ISO 27001", subtitle: "Information Security", delay: 0.4 },
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
          {/* Main Cursor Ring */}
          <div
            className="fixed w-10 h-10 rounded-full border-2 border-emerald-400/70 pointer-events-none z-50 mix-blend-screen"
            style={{
              left: mousePos.x - 20 + 'px',
              top: mousePos.y - 20 + 'px',
              boxShadow: '0 0 30px rgba(16, 185, 129, 0.6), inset 0 0 20px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.08s ease-out',
            }}
          />

          {/* Outer Pulsing Ring */}
          <div
            className="fixed w-16 h-16 rounded-full border border-emerald-400/40 pointer-events-none z-50 mix-blend-screen"
            style={{
              left: mousePos.x - 32 + 'px',
              top: mousePos.y - 32 + 'px',
              boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)',
              animation: 'pulse-ring 1.5s ease-in-out infinite',
            }}
          />

          {/* Rotating Outer Ring */}
          <div
            className="fixed w-20 h-20 rounded-full border border-transparent pointer-events-none z-50"
            style={{
              left: mousePos.x - 40 + 'px',
              top: mousePos.y - 40 + 'px',
              borderTopColor: 'rgba(16, 185, 129, 0.5)',
              borderRightColor: 'rgba(16, 185, 129, 0.3)',
              animation: 'spin 2s linear infinite',
            }}
          />

          {/* Trailing Particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="fixed rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 pointer-events-none z-40"
              style={{
                width: (6 - i) + 'px',
                height: (6 - i) + 'px',
                left: mousePos.x - (6 - i) / 2 + 'px',
                top: mousePos.y - (6 - i) / 2 + 'px',
                opacity: (6 - i) / 12,
                transform: `translate(${Math.cos(i * Math.PI / 3) * (i + 1) * 12}px, ${Math.sin(i * Math.PI / 3) * (i + 1) * 12}px)`,
                transition: 'all 0.15s ease-out',
                boxShadow: `0 0 ${8 + i * 2}px rgba(16, 185, 129, 0.4)`,
              }}
            />
          ))}

          {/* Center Dot */}
          <div
            className="fixed w-2 h-2 rounded-full bg-emerald-300 pointer-events-none z-50"
            style={{
              left: mousePos.x - 4 + 'px',
              top: mousePos.y - 4 + 'px',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.8)',
            }}
          />
        </>
      )}

      {/* ANIMATED BACKGROUND */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl [animation-delay:2s] animate-pulse" />
        <div className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl [animation-delay:4s] animate-pulse" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-xl">
            <Shield className="w-4 h-4" />
            <span>Your Trust Is Our Priority</span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tighter">
            <span className="block text-white mb-4">Bank-Level Security</span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 blur-3xl opacity-40" />
              <span className="relative bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                For Your Peace of Mind
              </span>
            </span>
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Your financial data is encrypted with military-grade security. We can only view your transactions—never move or access your funds.
          </p>
        </div>

        {/* SECURITY FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {securityFeatures.map((feature, idx) => (
            <div
              key={idx}
              onMouseMove={(e) => handleCardMouseMove(e, idx)}
              onMouseLeave={handleCardMouseLeave}
            >
              <SecurityCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                details={feature.details}
                gradient={feature.gradient}
                delay={feature.delay}
                isHovered={hoveredCard === idx}
                cardPos={cardPos}
              />
            </div>
          ))}
        </div>

        {/* SECURITY BADGES */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-12">Industry Certifications & Compliance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {badges.map((badge, idx) => (
              <SecurityBadge
                key={idx}
                icon={badge.icon}
                title={badge.title}
                subtitle={badge.subtitle}
                delay={badge.delay}
              />
            ))}
          </div>
        </div>

        {/* SECURITY GUARANTEE SECTION */}
        <div className="relative mb-20">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/10 rounded-2xl blur-2xl" />

          {/* Card */}
          <div className="relative p-8 md:p-12 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 to-slate-950/50 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left - Icon */}
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                  <Shield className="w-10 h-10" />
                </div>
              </div>

              {/* Center - Text */}
              <div className="md:col-span-2">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                  Our Security Commitment
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  We are SOC 2 Type II certified, GDPR compliant, and undergo regular third-party security audits. Your data is never sold, shared, or used for any purpose other than improving your financial experience.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">All data encrypted at rest and in transit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Two-factor authentication available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Automatic logout and session management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ STYLE SECTION */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white text-center mb-12">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Can CentWise access my bank account and move money?",
                a: "No. We only have read-only access to view your transactions. We cannot move, transfer, or modify any funds. This is enforced at the API level.",
              },
              {
                q: "How is my data encrypted?",
                a: "We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. This is the same encryption standard used by banks and government agencies.",
              },
              {
                q: "Is my data shared with third parties?",
                a: "Never. Your financial data is never sold or shared with advertisers, data brokers, or any third party. We're 100% GDPR compliant.",
              },
              {
                q: "What happens if CentWise is breached?",
                a: "We maintain comprehensive cybersecurity insurance and have incident response procedures. Your encrypted data would remain secure even in a breach.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-700/40 bg-slate-900/50 backdrop-blur-sm hover:border-slate-600/50 hover:bg-slate-900/70 transition-all duration-300"
                style={{
                  animation: `slideUp 0.6s ease-out ${0.1 + idx * 0.1}s backwards`,
                }}
              >
                <h4 className="font-bold text-white mb-2 flex items-start gap-2">
                  <span className="text-emerald-400 font-black">Q:</span>
                  {item.q}
                </h4>
                <p className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-teal-400 font-black flex-shrink-0">A:</span>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-8">
          <div className="inline-block">
            <button className="group relative px-10 py-4 rounded-xl font-bold text-base text-slate-950 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
              <div className="relative flex items-center justify-center gap-2">
                Start Using CentWise Securely
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          </div>

          <p className="text-slate-400 max-w-xl mx-auto">
            Join thousands of users who trust CentWise with their financial management.
          </p>
        </div>
      </div>

      {/* STYLES */}
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

        @keyframes pulse-ring {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default SecurityTrust;
