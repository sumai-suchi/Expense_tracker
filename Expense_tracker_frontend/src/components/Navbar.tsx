import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router';
import { 
  Wallet, 
  Menu, 
  X, 
  LayoutDashboard, 
  ReceiptText, 
  PieChart, 
  PlusCircle, 
  User,
  ChevronDown,
  Settings,
  Bell,
  LogOut
} from 'lucide-react';

interface NavLinkRenderProps {
  isActive: boolean;
  isPending: boolean;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkStyles = ({ isActive }: NavLinkRenderProps): string => 
    `relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
      isActive 
        ? 'text-emerald-300 bg-emerald-500/10' 
        : 'text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/5'
    }`;

  const mobileLinkStyles = ({ isActive }: NavLinkRenderProps): string => 
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
      isActive 
        ? 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/40' 
        : 'text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10'
    }`;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'border-b border-emerald-500/20 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/40 shadow-emerald-500/5' 
          : 'border-b border-emerald-500/10 bg-gradient-to-b from-slate-900/80 to-slate-950/60 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO */}
          <Link to="/dashboard" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-xl blur-lg opacity-30 group-hover:opacity-60 transition-all duration-300" />
              <div className="relative rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 p-2 text-slate-950 shadow-lg shadow-emerald-500/40 group-hover:shadow-emerald-500/60 transition-all duration-300">
                <Wallet className="h-5 w-5 font-bold" />
              </div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors duration-300">
                CentWise
              </span>
              <span className="text-[9px] font-bold text-emerald-400/80">Smart Finances</span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLink to="/dashboard" end className={linkStyles}>
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/dashboard/expenses" className={linkStyles}>
              <ReceiptText className="h-4 w-4" />
              <span>Expenses</span>
            </NavLink>
            <NavLink to="/dashboard/analytics" className={linkStyles}>
              <PieChart className="h-4 w-4" />
              <span>Analytics</span>
            </NavLink>
          </div>

          {/* RIGHT SIDE ACTIONS - DESKTOP */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Notification Button */}
            <button className="relative p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300">
              <Bell className="h-5 w-5" />
              <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-slate-700/30" />

            {/* Quick Add Button */}
            <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-2 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-300 hover:scale-105 active:scale-95">
              <PlusCircle className="h-4 w-4" />
              <span>Add</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 transition-all duration-300"
              >
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950">
                  <User className="h-3.5 w-3.5 font-bold" />
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-emerald-500/20 bg-slate-950/95 shadow-2xl backdrop-blur-lg overflow-hidden animate-in">
                  <div className="px-4 py-3 border-b border-emerald-500/10 bg-gradient-to-r from-emerald-500/10 to-teal-500/5">
                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Account</p>
                  </div>
                  <Link 
                    to="/dashboard/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-200"
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link 
                    to="/dashboard/settings"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-200 border-t border-emerald-500/10"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <button 
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 border-t border-emerald-500/10 flex items-center gap-3"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="lg:hidden flex items-center gap-3">
            <button className="p-2 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 relative">
              <Bell className="h-5 w-5" />
              <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-400" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="lg:hidden border-t border-emerald-500/10 bg-gradient-to-b from-slate-900/80 to-slate-950/60 backdrop-blur-xl px-4 py-5 space-y-4 animate-slideDown">
          
          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-2">
            <NavLink 
              to="/dashboard" 
              end 
              onClick={() => setIsOpen(false)} 
              className={mobileLinkStyles}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink 
              to="/dashboard/expenses" 
              onClick={() => setIsOpen(false)} 
              className={mobileLinkStyles}
            >
              <ReceiptText className="h-5 w-5" />
              <span>Expenses</span>
            </NavLink>
            <NavLink 
              to="/dashboard/analytics" 
              onClick={() => setIsOpen(false)} 
              className={mobileLinkStyles}
            >
              <PieChart className="h-5 w-5" />
              <span>Analytics</span>
            </NavLink>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

          {/* Mobile Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/30 active:scale-95 transition-all duration-200">
              <PlusCircle className="h-5 w-5" />
              Add Transaction
            </button>
            <Link 
              to="/dashboard/profile" 
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 py-3 text-sm font-semibold text-slate-300 hover:text-emerald-300 transition-all duration-200"
            >
              <User className="h-5 w-5" />
              My Profile
            </Link>
            <Link 
              to="/dashboard/settings" 
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 py-3 text-sm font-semibold text-slate-300 hover:text-emerald-300 transition-all duration-200"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-in {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}
