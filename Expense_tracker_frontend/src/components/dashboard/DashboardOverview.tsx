import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Calendar,
  AlertTriangle,
  ArrowRight,
  PieChart,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// High-fidelity structural mock databases
const mainStats = [
  {
    id: 'vault',
    label: 'Liquid Vault Balance',
    value: '$14,258.90',
    change: '+12.4%',
    isPositive: true,
    glowColor: 'group-hover:bg-cyan-500/10',
    borderColor: 'border-cyan-500/10'
  },
  {
    id: 'inflow',
    label: 'Monthly Cash Inflow',
    value: '$5,840.00',
    change: '+8.2%',
    isPositive: true,
    glowColor: 'group-hover:bg-emerald-500/10',
    borderColor: 'border-emerald-500/10'
  },
  {
    id: 'outflow',
    label: 'Total Spend Outflow',
    value: '$2,112.45',
    change: '-4.1%',
    isPositive: false,
    glowColor: 'group-hover:bg-rose-500/10',
    borderColor: 'border-rose-500/10'
  }
];

const budgetThresholds = [
  { id: 1, category: 'Food & Dining', spent: 420.50, limit: 600, color: 'bg-cyan-500', glow: 'shadow-[0_0_12px_rgba(34,211,238,0.4)]' },
  { id: 2, category: 'Transport & Fuel', spent: 180.00, limit: 200, color: 'bg-amber-500', glow: 'shadow-[0_0_12px_rgba(245,158,11,0.4)]' },
  { id: 3, category: 'Utilities & Bills', spent: 890.00, limit: 1000, color: 'bg-emerald-500', glow: 'shadow-[0_0_12px_rgba(16,185,129,0.4)]' },
  { id: 4, category: 'Entertainment', spent: 210.30, limit: 250, color: 'bg-purple-500', glow: 'shadow-[0_0_12px_rgba(168,85,247,0.4)]' },
];

const transactionStream = [
  { id: 'tx-99', title: 'Adobe Creative Cloud', category: 'Utilities/Bills', amount: -54.99, type: 'expense', time: '14:22 PM' },
  { id: 'tx-98', title: 'Stripe Payout Ref #309', category: 'Salary/Pay', amount: 1450.00, type: 'income', time: '09:15 AM' },
  { id: 'tx-97', title: 'Whole Foods Market', category: 'Food & Dining', amount: -112.40, type: 'expense', time: 'Yesterday' },
  { id: 'tx-96', title: 'Shell Gas Station', category: 'Transport', amount: -45.00, type: 'expense', time: '2 days ago' },
];

const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#030712] text-slate-100 p-4 sm:p-8 lg:p-10 relative overflow-x-hidden font-sans antialiased">
      
      {/* Dynamic Structural Ambient Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <div className="absolute top-[5%] right-[-5%] h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[140px]" />
        <div className="absolute bottom-[10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-rose-500/5 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#091124_1px,transparent_1px),linear-gradient(to_bottom,#091124_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* --- SECTION 1: Strategic Hub Header --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-900/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Ledger Core Engine v4.26</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white mt-1">Workspace Overview</h1>
          </div>

          {/* Quick Transaction Log Redirection Module */}
          <button 
            onClick={() => navigate('/dashboard/quickLogExpense')}
            className="group px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-[0_4px_25px_rgba(34,211,238,0.15)] hover:shadow-[0_4px_30px_rgba(34,211,238,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Initialize Quick Log</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* --- SECTION 2: Premium Metrics Ribbon Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {mainStats.map((stat) => (
            <div 
              key={stat.id}
              className={`p-6 rounded-2xl bg-[#061024]/20 border ${stat.borderColor} backdrop-blur-xl relative overflow-hidden group transition-all duration-300 hover:border-slate-800`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none ${stat.glowColor}`} />
              
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">{stat.label}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  stat.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black tracking-tight text-white">{stat.value}</span>
                <span className="text-xs text-slate-600 font-mono">USD</span>
              </div>
            </div>
          ))}
        </div>

        {/* --- SECTION 3: Dual Pillar Analytical Bento Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT CONTAINER LAYER: Budget Visualized Array Thresholds (Spans 7 Columns) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#061024]/20 border border-slate-900/80 backdrop-blur-xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black tracking-wide text-white">Active Budget Thresholds</h3>
                <p className="text-xs text-slate-500 mt-0.5">Live monitoring arrays tracking category caps.</p>
              </div>
              <PieChart className="w-4 h-4 text-slate-700" />
            </div>

            <div className="space-y-5">
              {budgetThresholds.map((budget) => {
                const percent = Math.min((budget.spent / budget.limit) * 100, 100);
                const isCritical = percent >= 90;

                return (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300 font-bold">{budget.category}</span>
                      <div className="space-x-1.5 font-mono">
                        <span className="text-white font-bold">${budget.spent.toFixed(2)}</span>
                        <span className="text-slate-600">/</span>
                        <span className="text-slate-500">${budget.limit}</span>
                      </div>
                    </div>

                    {/* Progress Slider Track Line */}
                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 relative">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out relative ${budget.color} ${budget.glow}`}
                        style={{ width: `${percent}%` }}
                      >
                        {isCritical && (
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-[progress-stripe_1s_linear_infinite]" />
                        )}
                      </div>
                    </div>

                    {/* Meta Condition Logic Alert Flag */}
                    {isCritical && (
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-mono font-bold pt-0.5">
                        <AlertTriangle className="w-3 h-3" />
                        <span>CRITICAL RANGE RESIDUAL ACCESSIBILITY OVERRUN WARNING</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT CONTAINER LAYER: Live Transaction Stream Ledger (Spans 5 Columns) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#061024]/20 border border-slate-900/80 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-md font-black tracking-wide text-white">Live Operations Log</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Chronological system transactional pipeline.</p>
                </div>
                <Activity className="w-4 h-4 text-slate-700" />
              </div>

              {/* Streaming Stack Wrapper */}
              <div className="space-y-2.5">
                {transactionStream.map((tx) => (
                  <div 
                    key={tx.id}
                    className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-slate-900 rounded-xl hover:border-slate-800 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-lg border ${
                        tx.type === 'income' 
                          ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' 
                          : 'bg-rose-500/5 border-rose-500/10 text-rose-400'
                      }`}>
                        {tx.type === 'income' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownLeft className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-200 truncate group-hover:text-white transition-colors">{tx.title}</p>
                        <p className="text-[10px] text-slate-600 font-mono mt-0.5">{tx.category} • {tx.time}</p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className={`text-xs font-black font-mono tracking-tight ${
                        tx.type === 'income' ? 'text-emerald-400' : 'text-slate-300'
                      }`}>
                        {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro Access Audit Trail Link */}
            <button className="w-full mt-5 py-2.5 bg-slate-950 hover:bg-slate-900/60 border border-slate-900 hover:border-slate-800 text-slate-400 hover:text-white rounded-xl text-[10px] font-mono uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer">
              <span>Inspect Full Ledger Data Stack</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;