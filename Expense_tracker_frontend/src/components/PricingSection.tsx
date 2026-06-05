import React, { useState } from 'react';
import { Check, X, ArrowRight, Zap, Star, TrendingUp, Users, BarChart3, Lock, Infinity } from 'lucide-react';

interface PricingFeature {
  feature: string;
  free: boolean;
  pro: boolean;
  business: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  cta: string;
  highlighted: boolean;
  gradient: string;
  features: string[];
  delay: number;
}

const PricingCard: React.FC<{
  tier: PricingTier;
  isHovered: boolean;
  cardPos: { x: number; y: number };
}> = ({ tier, isHovered, cardPos }) => {
  return (
    <div
      className="group relative h-full"
      style={{
        animation: `slideUp 0.6s ease-out ${tier.delay}s backwards`,
      }}
    >
      {/* Cursor-Following Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none z-0"
          style={{
            background: `radial-gradient(600px at ${cardPos.x}px ${cardPos.y}px, rgba(16, 185, 129, 0.2) 0%, transparent 80%)`,
            transition: 'background 0.1s linear',
          }}
        />
      )}

      {/* Main Card */}
      <div
        className={`relative h-full rounded-3xl border overflow-hidden transition-all duration-500 flex flex-col ${
          tier.highlighted
            ? 'lg:scale-105 border-emerald-400/50 bg-gradient-to-br from-slate-900/80 to-slate-950/60 shadow-2xl shadow-emerald-500/20 lg:shadow-emerald-500/30'
            : 'border-slate-700/40 bg-gradient-to-br from-slate-900/60 to-slate-950/40 hover:border-slate-600/60 hover:shadow-2xl hover:shadow-slate-900/50'
        }`}
      >
        {/* Premium Badge */}
        {tier.highlighted && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400" />
        )}

        {/* Header */}
        <div className="relative z-10 p-8 pb-6 border-b border-slate-700/40">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-black text-white flex items-center gap-2">
                {tier.name}
                {tier.highlighted && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/40">
                    <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">Most Popular</span>
                  </div>
                )}
              </h3>
              <p className="text-slate-400 text-sm mt-2">{tier.description}</p>
            </div>
            <div className={`p-3 rounded-xl bg-gradient-to-br ${tier.gradient} text-white`}>
              {tier.icon}
            </div>
          </div>

          {/* Price */}
          <div className="pt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-white">${tier.price}</span>
              <span className="text-slate-400 text-sm">/{tier.period}</span>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="relative z-10 flex-grow p-8 space-y-4">
          {tier.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 transform transition-all duration-500"
              style={{
                opacity: isHovered ? 1 : 0.8,
                transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                transitionDelay: isHovered ? `${idx * 50}ms` : '0ms',
              }}
            >
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400">
                  <Check className="w-3 h-3 text-slate-950" />
                </div>
              </div>
              <span className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-200 transition-colors">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="relative z-10 p-8 pt-6 border-t border-slate-700/40">
          <button
            className={`group/btn relative w-full py-3 px-6 rounded-xl font-bold text-sm overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
              tier.highlighted
                ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 shadow-xl shadow-emerald-500/40 hover:shadow-emerald-500/60'
                : 'border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-200 hover:border-emerald-400/50'
            }`}
          >
            <span>{tier.cta}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PricingSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
    setShowCursor(true);
  };

  const handleMouseLeave = () => {
    setShowCursor(false);
    setHoveredTier(null);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setCardPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredTier(idx);
  };

  const handleCardMouseLeave = () => {
    setHoveredTier(null);
  };

  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: billingPeriod === 'monthly' ? "0" : "0",
      period: billingPeriod === 'monthly' ? "month" : "year",
      description: "Perfect for getting started with personal finance",
      icon: <Zap className="w-6 h-6" />,
      cta: "Get Started Free",
      highlighted: false,
      gradient: "from-blue-400 to-cyan-500",
      features: [
        "Manual expense tracking",
        "Basic budgeting tools",
        "Single account management",
        "Monthly spending reports",
        "Mobile app access",
        "Community support",
      ],
      delay: 0.1,
    },
    {
      name: "Professional",
      price: billingPeriod === 'monthly' ? "29" : "290",
      period: billingPeriod === 'monthly' ? "month" : "year",
      description: "Full automation and advanced insights for serious wealth builders",
      icon: <TrendingUp className="w-6 h-6" />,
      cta: "Start Free Trial",
      highlighted: true,
      gradient: "from-emerald-400 to-teal-500",
      features: [
        "Automatic bank syncing",
        "Unlimited account connections",
        "AI-powered spending insights",
        "Advanced analytics & charts",
        "Smart budget alerts",
        "Goal tracking & forecasting",
        "Priority email support",
        "Custom reports & exports",
        "Dark mode & themes",
      ],
      delay: 0.2,
    },
    {
      name: "Business",
      price: billingPeriod === 'monthly' ? "79" : "790",
      period: billingPeriod === 'monthly' ? "month" : "year",
      description: "Enterprise-grade features for businesses and teams",
      icon: <Users className="w-6 h-6" />,
      cta: "Contact Sales",
      highlighted: false,
      gradient: "from-purple-400 to-pink-500",
      features: [
        "Everything in Professional",
        "Team collaboration tools",
        "Multi-user accounts",
        "Role-based permissions",
        "Bulk import/export",
        "API access",
        "Dedicated account manager",
        "Priority 24/7 support",
        "Custom integrations",
      ],
      delay: 0.3,
    },
  ];

  const comparisonFeatures: PricingFeature[] = [
    { feature: "Expense Tracking", free: true, pro: true, business: true },
    { feature: "Bank Syncing", free: false, pro: true, business: true },
    { feature: "Account Connections", free: true, pro: true, business: true },
    { feature: "Advanced Analytics", free: false, pro: true, business: true },
    { feature: "Budget Alerts", free: false, pro: true, business: true },
    { feature: "Goal Tracking", free: false, pro: true, business: true },
    { feature: "Team Collaboration", free: false, pro: false, business: true },
    { feature: "API Access", free: false, pro: false, business: true },
    { feature: "Priority Support", free: false, pro: true, business: true },
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
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-xl">
            <Infinity className="w-4 h-4" />
            <span>Simple, Transparent Pricing</span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tighter">
            <span className="block text-white mb-4">Plans That Fit</span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 blur-3xl opacity-40" />
              <span className="relative bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                Your Needs
              </span>
            </span>
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Start free and scale as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
            <div className="relative">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-1 rounded-md font-semibold transition-all duration-300 ${
                    billingPeriod === 'yearly'
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Yearly
                </button>
                <span className="text-xs font-bold text-emerald-400 ml-2">Save 17%</span>
              </div>
            </div>
          </div>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 mb-20">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              onMouseMove={(e) => handleCardMouseMove(e, idx)}
              onMouseLeave={handleCardMouseLeave}
            >
              <PricingCard
                tier={tier}
                isHovered={hoveredTier === idx}
                cardPos={cardPos}
              />
            </div>
          ))}
        </div>

        {/* COMPARISON TABLE */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-white text-center mb-12">Feature Comparison</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/40">
                  <th className="text-left py-4 px-6 text-white font-bold">Feature</th>
                  <th className="text-center py-4 px-6 text-slate-300 font-bold">
                    <div className="text-sm">Starter</div>
                    <div className="text-xs text-slate-400 font-normal">Free</div>
                  </th>
                  <th className="text-center py-4 px-6">
                    <div className="inline-block">
                      <div className="text-sm text-white font-bold">Professional</div>
                      <div className="text-xs text-emerald-400 font-semibold">Most Popular</div>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6 text-slate-300 font-bold">
                    <div className="text-sm">Business</div>
                    <div className="text-xs text-slate-400 font-normal">Custom</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-700/20 hover:bg-slate-900/20 transition-colors duration-300"
                    style={{
                      animation: `slideUp 0.6s ease-out ${0.1 + idx * 0.05}s backwards`,
                    }}
                  >
                    <td className="py-4 px-6 text-slate-300 font-medium">{item.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {item.free ? (
                        <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.pro ? (
                        <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.business ? (
                        <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-white text-center mb-12">Frequently Asked Questions</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Can I change plans anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Is there a contract?",
                a: "No contracts. Cancel your subscription anytime from your account settings.",
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 30-day money-back guarantee if you're not satisfied. No questions asked.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
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

        {/* FINAL CTA */}
        <div className="text-center space-y-8 py-12">
          <h3 className="text-3xl font-black text-white">Ready to transform your finances?</h3>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Start with our free Starter plan. No credit card required. Upgrade whenever you're ready.
          </p>

          <div className="inline-block">
            <button className="group relative px-10 py-4 rounded-xl font-bold text-base text-slate-950 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
              <div className="relative flex items-center justify-center gap-2">
                Get Started Free Today
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          </div>
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

export default PricingSection;
