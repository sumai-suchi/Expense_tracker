import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  PieChart, 
  Target, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Wallet,
  Plus,
  Compass,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

interface SidebarProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCollapseChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const handleToggleCollapse = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    if (onCollapseChange) onCollapseChange(nextState);
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Expenses', path: '/dashboard/expenses', icon: TrendingUp },
    { name: 'Analytics', path: '/dashboard/analytics', icon: PieChart },
    { name: 'Goals', path: '/dashboard/goals', icon: Target },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Bar (Sticky Top Header for Mobile screens only) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#040812]/90 border-b border-slate-900 backdrop-blur-md z-50 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Wallet className="w-5 h-5" />
          </div>
          <span className="text-md font-bold tracking-tight text-white">CentWise</span>
        </div>
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Control Blade Sidebar Container */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 transform md:transform-none transition-all duration-300 ease-out flex flex-col justify-between font-sans antialiased
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-24' : 'md:w-[270px]'}
          bg-gradient-to-b from-[#040914]/95 via-[#02050c]/98 to-[#010307]/95
          md:pt-0 pt-16
        `}
      >
        {/* Subtle Inner Vertical Cyber Pipeline Neon Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent pointer-events-none" />

        {/* --- Top Branding & Engine Section --- */}
        <div>
          {/* Header Branding Frame */}
          <div className="p-6 flex items-center justify-between relative">
            <div className={`flex items-center gap-3.5 ${isCollapsed ? 'md:mx-auto' : ''}`}>
              <div className="relative group">
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-30 blur-md group-hover:opacity-60 transition duration-300" />
                <div className="relative p-2.5 rounded-xl bg-[#060f22] border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
              </div>
              
              {!isCollapsed && (
                <div className="flex flex-col animate-fade-in">
                  <span className="text-lg font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    CentWise
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono uppercase tracking-widest mt-0.5">
                    Engine Active
                  </span>
                </div>
              )}
            </div>

            {/* Collapse Trigger Pin */}
            {!isCollapsed && (
              <button 
                onClick={handleToggleCollapse}
                className="hidden md:flex p-1.5 rounded-lg text-slate-600 hover:text-cyan-400 bg-slate-950/40 hover:bg-slate-900/50 border border-slate-900 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Action Interactive Card Module */}
          <div className="px-4 py-2">
            {isCollapsed ? (
              <button className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center justify-center group relative cursor-pointer hover:scale-105 transition-transform">
                <Plus className="w-5 h-5 stroke-[2.5]" />
                <div className="absolute left-28 px-3 py-1.5 rounded-lg bg-[#050b14] border border-slate-800 text-xs font-bold text-cyan-400 tracking-wide opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl pointer-events-none">
                  New Record
                </div>
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-[#061024]/40 border border-cyan-500/10 backdrop-blur-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
                <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-2">Transaction Layer</p>
               <NavLink to="/dashboard/quickLogExpense">
                 <button className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase shadow-[0_4px_20px_rgba(6,182,212,0.15)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
               >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Log Expense</span>
                </button>
               </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* --- Navigation Workspace System --- */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-none">
          {!isCollapsed && (
            <div className="flex items-center gap-2 px-3 mb-3">
              <Compass className="w-3 h-3 text-slate-600" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-slate-600">Workspace</span>
            </div>
          )}

          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 relative group ${
                  isActive 
                    ? 'text-white bg-gradient-to-r from-[#0c1833] to-[#060f22] border border-cyan-500/15 shadow-[0_4px_20px_rgba(0,0,0,0.4)]' 
                    : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900/20 border border-transparent'
                }`}
              >
                {/* Floating Radial Back-Glow for Active Item */}
                {isActive && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)] animate-pulse" />
                )}

                <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                  isActive ? 'text-cyan-400 scale-105' : 'text-slate-600 group-hover:text-slate-400'
                }`} />

                {!isCollapsed && (
                  <span className="truncate tracking-wide font-medium">{item.name}</span>
                )}

                {/* Collapsed Tooltip Engine */}
                {isCollapsed && (
                  <div className="absolute left-28 px-3 py-1.5 rounded-lg bg-[#050b14] border border-slate-800 text-xs font-semibold text-white tracking-wide opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl pointer-events-none">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* --- Bottom Session Panel --- */}
        <div className="p-4 border-t border-slate-900/60 bg-[#02050c]/60 backdrop-blur-md">
          <div className={`flex items-center gap-3 p-2 rounded-xl bg-[#040812]/50 border border-slate-900/80 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                  alt="Account Avatar" 
                  className="w-8 h-8 rounded-xl object-cover filter brightness-95 contrast-105 border border-cyan-500/20"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#040812]" />
              </div>
              
              {!isCollapsed && (
                <div className="min-w-0 animate-fade-in">
                  <p className="text-xs font-bold text-white truncate leading-tight">Jane Doe</p>
                  <p className="text-[10px] text-slate-500 font-mono truncate mt-0.5">Verified Node</p>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button className="p-2 text-slate-600 hover:text-rose-400 hover:bg-rose-500/5 rounded-lg transition-all cursor-pointer">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Expand Trigger for Collapsed Desktop State */}
          {isCollapsed && (
            <button 
              onClick={handleToggleCollapse}
              className="hidden md:flex mt-4 mx-auto p-2 rounded-xl bg-slate-900/40 text-slate-600 hover:text-cyan-400 border border-slate-900 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Dark Backdrop overlay for mobile viewport */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
        />
      )}
    </>
  );
};

export default Sidebar;