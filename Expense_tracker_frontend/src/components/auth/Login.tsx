import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Check, AlertCircle, Loader, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const Login: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    rememberMe: false,
    status: 'idle',
    message: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
      status: 'idle',
      message: '',
    });
  };

  const validateForm = (): boolean => {
    if (!formState.email.trim()) {
      setFormState({ ...formState, status: 'error', message: 'Email address is required.' });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormState({ ...formState, status: 'error', message: 'Please enter a valid email address.' });
      return false;
    }
    if (!formState.password) {
      setFormState({ ...formState, status: 'error', message: 'Password is required.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState({ ...formState, status: 'loading' });

    // Mock API authentication delay
    setTimeout(() => {
      setFormState({
        ...formState,
        status: 'success',
        message: 'Authentication successful! Redirecting...',
      });

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    }, 1500);
  };

  const isEmailValid = formState.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-16 relative overflow-hidden font-sans antialiased">
      
      {/* Dynamic Animated Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-teal-500/5 blur-[120px] animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-all duration-300">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              CentWise
            </span>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-400 font-light">
            Securely access your automated financial dashboard.
          </p>
        </div>

        {/* Glassmorphic Login Card */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
              <div className={`flex items-center gap-3 px-4 py-3.5 border-2 rounded-xl transition-all duration-200 ${
                focusedField === 'email'
                  ? 'border-emerald-500 bg-slate-900/80 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : isEmailValid
                  ? 'border-slate-800 bg-slate-950/40'
                  : 'border-slate-800/60 bg-slate-950/20'
              }`}>
                <Mail className={`w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none"
                />
                {isEmailValid && <Check className="w-4 h-4 text-emerald-400" />}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
                <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                  Forgot keycode?
                </a>
              </div>
              <div className={`flex items-center gap-3 px-4 py-3.5 border-2 rounded-xl transition-all duration-200 ${
                focusedField === 'password'
                  ? 'border-emerald-500 bg-slate-900/80 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : 'border-slate-800 bg-slate-950/40'
              }`}>
                <Lock className={`w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center gap-3 pt-1">
              <div className="relative flex items-center h-5">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  checked={formState.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500/30 focus:ring-offset-slate-950 cursor-pointer accent-emerald-500"
                />
              </div>
              <label htmlFor="rememberMe" className="text-xs text-slate-400 select-none cursor-pointer">
                Keep my security session active
              </label>
            </div>

            {/* Form Error Feedback */}
            {formState.status === 'error' && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium">{formState.message}</span>
              </div>
            )}

            {/* Form Success Feedback */}
            {formState.status === 'success' && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-fade-in">
                <Check className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium">{formState.message}</span>
              </div>
            )}

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={formState.status === 'loading' || formState.status === 'success'}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-500/10 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none active:scale-[0.98] mt-4"
            >
              {formState.status === 'loading' ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : formState.status === 'success' ? (
                <Check className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span className="text-sm tracking-wide">
                {formState.status === 'loading' ? 'Verifying Credentials...' :
                 formState.status === 'success' ? 'Access Granted' :
                 'Sign In'}
              </span>
            </button>
          </form>
        </div>

        {/* Dynamic Secondary Options Row */}
        <div className="text-center py-4 border-t border-slate-900">
          <p className="text-xs text-slate-400">
            New to the ecosystem?{' '}
            <Link to="/auth/register" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
              Initialize a new account
            </Link>
          </p>
        </div>

        {/* Global Security Trust Card */}
        <div className="p-3.5 rounded-xl bg-slate-900/20 border border-slate-900/60 flex items-center gap-3 justify-center">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <p className="text-[10px] text-slate-500 tracking-wide font-light">
            Secured Session: Multi-point network tracing active during transaction layers.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Login;