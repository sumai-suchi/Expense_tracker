import React, { useState } from 'react';
import { ArrowRight, Mail, Check, AlertCircle, Loader, Wallet, Heart } from 'lucide-react';

interface FormState {
  email: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const FinalCTA: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    email: '',
    status: 'idle',
    message: '',
  });
  const [focusedInput, setFocusedInput] = useState(false);

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      email: e.target.value,
      status: 'idle',
      message: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.email) {
      setFormState({
        ...formState,
        status: 'error',
        message: 'Please enter your email address.',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormState({
        ...formState,
        status: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    setFormState({ ...formState, status: 'loading' });

    // Simulate API call
    setTimeout(() => {
      setFormState({
        email: '',
        status: 'success',
        message: 'Check your email to get started!',
      });

      // Reset after 3 seconds
      setTimeout(() => {
        setFormState({
          email: '',
          status: 'idle',
          message: '',
        });
      }, 3000);
    }, 1500);
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {  label: 'GitHub', href: '#' },
    {   label: 'Twitter', href: '#' },
    {   label: 'LinkedIn', href: '#' },
    {   label: 'Instagram', href: '#' },
    {   label: 'Facebook', href: '#' },
  ];

  const footerLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ];

  return (
    <>
      {/* CTA SECTION */}
      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
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
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-teal-500/15 blur-3xl [animation-delay:2s] animate-pulse" />
          <div className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl [animation-delay:4s] animate-pulse" />

          {/* Animated Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-4xl">
            {/* Main CTA Card */}
            <div className="group relative mb-16">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/20 rounded-3xl blur-3xl opacity-60 group-hover:opacity-100 transition-all duration-500" />

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-3xl border border-emerald-400/40 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
                boxShadow: 'inset 0 0 40px rgba(16, 185, 129, 0.1), 0 0 40px rgba(16, 185, 129, 0.2)',
              }} />

              {/* Card */}
              <div className="relative p-12 md:p-16 lg:p-20 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900/80 to-slate-950/60 backdrop-blur-xl overflow-hidden">
                
                {/* Animated Background Gradient */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full blur-3xl -z-10" />

                {/* Content */}
                <div className="relative z-10 space-y-8 text-center">
                  {/* Icon */}
                  <div className="inline-block">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 text-white shadow-2xl shadow-emerald-500/30">
                      <Wallet className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Heading */}
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
                    <span className="block text-white mb-2">Ready to Transform</span>
                    <span className="relative inline-block">
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 blur-2xl opacity-50" />
                      <span className="relative bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                        Your Finances?
                      </span>
                    </span>
                  </h2>

                  {/* Subheading */}
                  <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    Join over 50,000 users who've taken control of their money. Start free today, no credit card required.
                  </p>

                  {/* Email Form */}
                  <form onSubmit={handleSubmit} className="mt-12 space-y-4">
                    <div className="relative group/input">
                      {/* Input Glow */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl blur opacity-0 group-hover/input:opacity-20 group-focus-within/input:opacity-30 transition-all duration-300" />

                      {/* Input Container */}
                      <div className="relative flex items-center gap-2 p-1 rounded-xl bg-gradient-to-r from-slate-900/90 to-slate-950/90 border border-slate-700/50 group-hover/input:border-emerald-500/30 group-focus-within/input:border-emerald-400/50 transition-all duration-300">
                        <Mail className="w-5 h-5 text-slate-400 ml-4 flex-shrink-0" />
                        
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={formState.email}
                          onChange={handleEmailChange}
                          onFocus={() => setFocusedInput(true)}
                          onBlur={() => setFocusedInput(false)}
                          disabled={formState.status === 'loading' || formState.status === 'success'}
                          className="flex-1 px-4 py-3 bg-transparent text-white placeholder-slate-500 focus:outline-none disabled:opacity-50"
                        />

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={formState.status === 'loading' || formState.status === 'success'}
                          className="group/btn relative mr-1 px-6 py-2.5 rounded-lg font-bold text-sm text-slate-950 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-teal-300 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 blur-lg" />
                          
                          <div className="relative flex items-center gap-2">
                            {formState.status === 'loading' && (
                              <Loader className="w-4 h-4 animate-spin" />
                            )}
                            {formState.status === 'success' && (
                              <Check className="w-4 h-4" />
                            )}
                            {formState.status !== 'loading' && formState.status !== 'success' && (
                              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            )}
                            <span className="hidden sm:inline">
                              {formState.status === 'loading' ? 'Creating...' : 
                               formState.status === 'success' ? 'Success!' : 
                               'Create Account'}
                            </span>
                          </div>
                        </button>
                      </div>

                      {/* Status Messages */}
                      {formState.status === 'error' && (
                        <div className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 animate-in">
                          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                          <span className="text-sm text-red-400">{formState.message}</span>
                        </div>
                      )}

                      {formState.status === 'success' && (
                        <div className="mt-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 animate-in">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-sm text-emerald-400">{formState.message}</span>
                        </div>
                      )}
                    </div>

                    {/* Trust Statement */}
                    <p className="text-xs text-slate-400 mt-4">
                      🔒 Your email is safe with us. No spam, ever. Unsubscribe anytime.
                    </p>
                  </form>

                  {/* Benefits */}
                  <div className="pt-8 grid grid-cols-3 gap-6 md:gap-8 text-center">
                    {[
                      { label: 'Setup in', value: '2 mins' },
                      { label: 'No credit card', value: 'Required' },
                      { label: 'Access all', value: 'Features' },
                    ].map((benefit, idx) => (
                      <div key={idx} className="space-y-1">
                        <p className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                          {benefit.value}
                        </p>
                        <p className="text-xs md:text-sm text-slate-400">{benefit.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-16 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['👤', '👥', '👨'].map((avatar, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm border-2 border-slate-950">
                      {avatar}
                    </div>
                  ))}
                </div>
                <span>50,000+ users trust us</span>
              </div>
              
              <div className="w-1 h-1 rounded-full bg-slate-700" />

              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>

              <div className="w-1 h-1 rounded-full bg-slate-700" />

              <span>🔒 Bank-grade security</span>
            </div>
          </div>
        </div>

        {/* STYLES */}
        <style>{`
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

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-in {
            animation: slideIn 0.3s ease-out;
          }
        `}</style>
      </section>

      {/* FOOTER */}
      <footer className="relative bg-gradient-to-b from-slate-950 to-slate-950/80 border-t border-slate-800/50 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 group">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white group-hover:scale-105 transition-transform">
                  <Wallet className="h-5 w-5" />
                </div>
                <span className="text-lg font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  CentWise
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Transform your finances with intelligent spending insights, automated tracking, and AI-powered recommendations.
              </p>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Security', 'Roadmap'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2">
                {['About Us', 'Blog', 'Careers', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mb-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Copyright */}
            <div className="text-sm text-slate-400 text-center md:text-left">
              <p>© {currentYear} CentWise. All rights reserved.</p>
              <p className="mt-2 flex items-center justify-center md:justify-start gap-1">
                Made with <Heart className="w-4 h-4 fill-red-500 text-red-500" /> by the CentWise team
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
             
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2.5 rounded-lg border border-slate-700 hover:border-emerald-500/50 bg-slate-900/50 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all duration-300 group"
                  >
                    <span className="text-sm">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-8 pt-8 border-t border-slate-800/50 text-xs text-slate-500 text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All systems operational</span>
              <span>•</span>
              <a href="#" className="hover:text-emerald-400 transition-colors">Status Page</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

// Import Star icon if not available
const Star = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default FinalCTA;
