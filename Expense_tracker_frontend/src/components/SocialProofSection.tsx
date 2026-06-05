import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote, TrendingUp, Heart } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  avatarGradient: string;
  content: string;
  rating: number;
  metric: string;
  metricValue: string;
  gradient: string;
  delay: number;
}

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  isHovered: boolean;
  cardPos: { x: number; y: number };
  isMobile: boolean;
}> = ({ testimonial, isHovered, cardPos, isMobile }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="group relative h-full"
      style={{
        animation: `slideUp 0.6s ease-out ${testimonial.delay}s backwards`,
      }}
    >
      {/* Cursor-Following Glow */}
      {isHovered && !isMobile && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          style={{
            background: `radial-gradient(600px at ${cardPos.x}px ${cardPos.y}px, rgba(16, 185, 129, 0.15) 0%, transparent 80%)`,
            transition: 'background 0.1s linear',
          }}
        />
      )}

      {/* Main Card */}
      <div className="relative h-full p-6 md:p-8 rounded-2xl border border-slate-700/40 bg-gradient-to-br from-slate-900/60 to-slate-950/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-slate-600/60 hover:shadow-2xl hover:shadow-slate-900/50 flex flex-col">
        
        {/* Quote Icon */}
        <div className="mb-4 text-slate-700/30 group-hover:text-emerald-400/30 transition-colors duration-300">
          <Quote className="w-8 h-8" />
        </div>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-slate-300 text-sm md:text-base leading-relaxed flex-grow mb-6 group-hover:text-slate-200 transition-colors">
          "{testimonial.content}"
        </p>

        {/* Metric Highlight */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Result</span>
          </div>
          <p className="text-lg font-bold text-white">{testimonial.metricValue}</p>
          <p className="text-xs text-slate-400 mt-1">{testimonial.metric}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-700/30 mb-6" />

        {/* Author Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarGradient} flex items-center justify-center text-white font-bold text-sm shadow-lg transition-all duration-300 group-hover:scale-110`}>
              {testimonial.avatar}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white text-sm truncate">{testimonial.name}</p>
              <p className="text-xs text-slate-400 truncate">{testimonial.role}</p>
              {testimonial.company && (
                <p className="text-xs text-slate-500">{testimonial.company}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className="p-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                liked ? 'fill-red-500 text-red-500 scale-110' : 'text-slate-400'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const SocialProofSection: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!autoScroll) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoScroll]);

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

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Mitchell',
      role: 'Marketing Manager',
      company: 'TechStart Inc.',
      avatar: 'SM',
      avatarGradient: 'from-emerald-400 to-teal-500',
      content: 'I saved $400 in my first month without even trying. CentWise automatically showed me where my money was bleeding, and now I\'m on track to save $5000 this year.',
      rating: 5,
      metric: 'Monthly savings',
      metricValue: '$400+',
      gradient: 'from-emerald-400 to-teal-500',
      delay: 0.1,
    },
    {
      id: '2',
      name: 'James Chen',
      role: 'Software Engineer',
      company: 'CloudWorks',
      avatar: 'JC',
      avatarGradient: 'from-blue-400 to-cyan-500',
      content: 'Finally, a finance app that doesn\'t look like an Excel sheet. The interface is so beautiful and intuitive that I actually enjoy checking my spending now. It\'s become part of my morning routine.',
      rating: 5,
      metric: 'Daily engagement',
      metricValue: '100%',
      gradient: 'from-blue-400 to-cyan-500',
      delay: 0.2,
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      role: 'Freelance Designer',
      avatar: 'ER',
      avatarGradient: 'from-pink-400 to-rose-500',
      content: 'The automatic bank syncing saved me hours every month. No more manual tracking, no more spreadsheets. I can focus on growing my business instead of managing receipts.',
      rating: 5,
      metric: 'Time saved monthly',
      metricValue: '8+ hours',
      gradient: 'from-pink-400 to-rose-500',
      delay: 0.3,
    },
    {
      id: '4',
      name: 'Michael Park',
      role: 'Financial Advisor',
      company: 'Wealth Partners',
      avatar: 'MP',
      avatarGradient: 'from-purple-400 to-violet-500',
      content: 'I recommend CentWise to all my clients. The AI insights are spot-on and help them make smarter decisions. It\'s like having a personal financial coach in your pocket.',
      rating: 5,
      metric: 'Client satisfaction',
      metricValue: '98%',
      gradient: 'from-purple-400 to-violet-500',
      delay: 0.4,
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      role: 'Entrepreneur',
      company: 'The Brew Co.',
      avatar: 'LT',
      avatarGradient: 'from-amber-400 to-orange-500',
      content: 'The budget alerts have been a game-changer for my business finances. I never overshoot my monthly targets anymore, and my stress levels have dropped significantly.',
      rating: 5,
      metric: 'Budget accuracy',
      metricValue: '+95%',
      gradient: 'from-amber-400 to-orange-500',
      delay: 0.5,
    },
    {
      id: '6',
      name: 'David Kumar',
      role: 'Product Manager',
      company: 'InnovateLabs',
      avatar: 'DK',
      avatarGradient: 'from-teal-400 to-cyan-500',
      content: 'What impressed me most is the security. Knowing that my bank data is encrypted and CentWise can only view (never move) my money gives me complete peace of mind.',
      rating: 5,
      metric: 'Trust score',
      metricValue: '10/10',
      gradient: 'from-teal-400 to-cyan-500',
      delay: 0.6,
    },
  ];

  const carouselTestimonials = testimonials.slice(
    currentSlide,
    currentSlide + (isMobile ? 1 : 3)
  );

  const stats = [
    { label: 'Happy Users', value: '50,000+', gradient: 'from-emerald-400 to-teal-500' },
    { label: 'Money Saved', value: '$25M+', gradient: 'from-teal-400 to-cyan-500' },
    { label: 'Avg. Monthly Savings', value: '$450+', gradient: 'from-cyan-400 to-blue-500' },
    { label: 'Customer Rating', value: '4.9/5', gradient: 'from-blue-400 to-purple-500' },
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
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-xl">
            <Heart className="w-4 h-4" />
            <span>Loved by Users</span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.1] tracking-tighter">
            <span className="block text-white mb-4">What Users Are Saying</span>
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 blur-3xl opacity-40" />
              <span className="relative bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                Real Results, Real Stories
              </span>
            </span>
          </h2>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Thousands of users have transformed their finances with CentWise. Read their stories.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-slate-700/40 bg-slate-900/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300 text-center"
              style={{
                animation: `slideUp 0.6s ease-out ${0.1 + idx * 0.1}s backwards`,
              }}
            >
              <p className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-slate-400 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* TESTIMONIALS CAROUSEL */}
        <div className="relative mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 min-h-[450px] md:min-h-[420px]">
            {carouselTestimonials.map((testimonial, idx) => (
              <div
                key={testimonial.id}
                onMouseMove={(e) => handleCardMouseMove(e, testimonials.indexOf(testimonial))}
                onMouseLeave={handleCardMouseLeave}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isHovered={hoveredCard === testimonials.indexOf(testimonial)}
                  cardPos={cardPos}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => {
                setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                setAutoScroll(false);
              }}
              className="group p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 transition-all duration-300 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {[...Array(Math.ceil(testimonials.length / (isMobile ? 1 : 3)))].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSlide(idx * (isMobile ? 1 : 3));
                    setAutoScroll(false);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === Math.floor(currentSlide / (isMobile ? 1 : 3))
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 w-8'
                      : 'bg-slate-700 w-2'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setCurrentSlide((prev) => (prev + 1) % testimonials.length);
                setAutoScroll(false);
              }}
              className="group p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 transition-all duration-300 active:scale-95"
            >
              <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Auto-scroll Resume Button */}
          {!autoScroll && (
            <div className="text-center mt-4">
              <button
                onClick={() => setAutoScroll(true)}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                Resume auto-scroll
              </button>
            </div>
          )}
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

export default SocialProofSection;
