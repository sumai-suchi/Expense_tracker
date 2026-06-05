import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check, AlertCircle, Loader, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext';

interface FormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  bgColor: string;
}

const Register: React.FC = () => {

    const {register}=useAuth()



  const [formState, setFormState] = useState<FormState>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    status: 'idle',
    message: '',
  });



  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score < 2) return { score, label: 'Weak', color: 'text-rose-400', bgColor: 'bg-rose-500' };
    if (score < 4) return { score, label: 'Fair', color: 'text-amber-400', bgColor: 'bg-amber-500' };
    if (score < 5) return { score, label: 'Good', color: 'text-teal-400', bgColor: 'bg-teal-400' };
    return { score, label: 'Strong', color: 'text-emerald-400', bgColor: 'bg-emerald-400' };
  };

  const passwordStrength = calculatePasswordStrength(formState.password);

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
    if (!formState.fullName.trim()) {
      setFormState({ ...formState, status: 'error', message: 'Full name is required.' });
      return false;
    }
    if (!formState.email.trim()) {
      setFormState({ ...formState, status: 'error', message: 'Email is required.' });
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
    if (formState.password.length < 8) {
      setFormState({ ...formState, status: 'error', message: 'Password must be at least 8 characters.' });
      return false;
    }
    if (formState.password !== formState.confirmPassword) {
      setFormState({ ...formState, status: 'error', message: 'Passwords do not match.' });
      return false;
    }
    if (!formState.agreeToTerms) {
      setFormState({ ...formState, status: 'error', message: 'You must agree to the Terms of Service.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState({ ...formState, status: 'loading' });

    // Simulate API call

    console.log(formState);

     try{
        // const response = await fetch('http://localhost:5000/api/auth/register', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     name: formState.fullName,
        //     email: formState.email,
        //     password: formState.password,
        //   }),
        // });

        const response = await API.post('/auth/register', {
          name: formState.fullName,
          email: formState.email,
          password: formState.password,
        });

      console.log('API Response:', response);
       register(response.data.token, response.data.user);

        const data = response.data;

        if (data.user) {
          setFormState({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
            status: 'success',
            message: 'Account created successfully! Redirecting...',
          });

          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          setFormState({
            ...formState,
            status: 'error',
            message: data.message,
          });
        }
      } catch (error) {
        setFormState({
          ...formState,
          status: 'error',
          message: 'An error occurred while creating your account. Please try again.',
        });
      }
          }
   

   
 

  const isEmailValid = formState.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-24 relative overflow-hidden font-sans antialiased">
      
      {/* Dynamic Animated Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-teal-500/5 blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
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
            Create Your Account
          </h1>
          <p className="text-sm text-slate-400 font-light">
            Join thousands taking control of their finances effortlessly.
          </p>
        </div>

        {/* Glassmorphic Registration Card */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Full Name Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
              <div className={`flex items-center gap-3 px-4 py-3.5 border-2 rounded-xl transition-all duration-200 ${
                focusedField === 'fullName'
                  ? 'border-emerald-500 bg-slate-900/80 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : formState.fullName
                  ? 'border-slate-800 bg-slate-950/40'
                  : 'border-slate-800/60 bg-slate-950/20'
              }`}>
                <User className={`w-5 h-5 transition-colors ${focusedField === 'fullName' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none"
                />
                {formState.fullName && <Check className="w-4 h-4 text-emerald-400" />}
              </div>
            </div>

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
              {formState.email && !isEmailValid && (
                <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Please enter a valid email address.
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Password</label>
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
                  placeholder="Minimum 8 characters"
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

              {/* Enhanced Cyber Strength Meter */}
              {formState.password && (
                <div className="mt-3 p-3 rounded-xl bg-slate-950/60 border border-slate-900/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Security Index:</span>
                    <span className={`text-[11px] font-bold ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.bgColor} transition-all duration-500 rounded-full`}
                      style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                    />
                  </div>
                  <ul className="text-[11px] text-slate-500 space-y-1 pt-1 border-t border-slate-900/50">
                    {[
                      { text: '8+ Characters threshold', met: formState.password.length >= 8 },
                      { text: 'Case combination (Aa)', met: /[a-z]/.test(formState.password) && /[A-Z]/.test(formState.password) },
                      { text: 'Numerical matrix or symbol (1/#)', met: /[0-9]/.test(formState.password) || /[^a-zA-Z0-9]/.test(formState.password) },
                    ].map((req, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        {req.met ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-800 ml-1" />
                        )}
                        <span className={req.met ? 'text-slate-400' : 'text-slate-600'}>{req.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Confirm Password</label>
              <div className={`flex items-center gap-3 px-4 py-3.5 border-2 rounded-xl transition-all duration-200 ${
                focusedField === 'confirmPassword'
                  ? 'border-emerald-500 bg-slate-900/80 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                  : formState.confirmPassword && formState.password === formState.confirmPassword
                  ? 'border-slate-800 bg-slate-950/40'
                  : formState.confirmPassword
                  ? 'border-rose-900/50 bg-rose-950/10'
                  : 'border-slate-800/60 bg-slate-950/20'
              }`}>
                <Lock className={`w-5 h-5 transition-colors ${focusedField === 'confirmPassword' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Confirm security matrix"
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {formState.confirmPassword && (
                <p className={`text-[11px] mt-1.5 font-medium ${
                  formState.password === formState.confirmPassword ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {formState.password === formState.confirmPassword ? '✓ Keycodes match perfectly' : '✗ Keycodes mismatch'}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <div className="relative flex items-center h-5">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  id="agreeToTerms"
                  checked={formState.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500/30 focus:ring-offset-slate-950 cursor-pointer accent-emerald-500"
                />
              </div>
              <label htmlFor="agreeToTerms" className="text-xs text-slate-400 leading-normal select-none cursor-pointer">
                I authorize and agree to the{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300 font-semibold underline transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300 font-semibold underline transition-colors">
                  Privacy Core
                </a>.
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
                {formState.status === 'loading' ? 'Securing Identity...' :
                 formState.status === 'success' ? 'Initialization Success' :
                 'Create Free Account'}
              </span>
            </button>
          </form>
        </div>

        {/* Dynamic Secondary Options Row */}
        <div className="text-center py-4 border-t border-slate-900">
          <p className="text-xs text-slate-400">
            Already registered?{' '}
            <Link to="/auth/login" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
              Sign in to platform
            </Link>
          </p>
        </div>

        


       
      </div>
    </div>
  );
};

export default Register;